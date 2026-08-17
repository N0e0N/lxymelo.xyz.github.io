#!/usr/bin/env python3
"""Bake a seamless cloud, grain, and glitch background video."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import numpy as np


WIDTH = 1280
HEIGHT = 720
FPS = 30
SPEED_FACTOR = 2.0
FADE_SECONDS = 3.0


def duration_of(source: Path) -> float:
    result = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "json", str(source),
    ])
    return float(json.loads(result)["format"]["duration"])


def read_frame(stream, size: int) -> bytes:
    chunks: list[bytes] = []
    remaining = size
    while remaining:
        chunk = stream.read(remaining)
        if not chunk:
            break
        chunks.append(chunk)
        remaining -= len(chunk)
    return b"".join(chunks)


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: render_background.py INPUT OUTPUT", file=sys.stderr)
        return 2

    source = Path(sys.argv[1]).resolve()
    output = Path(sys.argv[2]).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    slowed_duration = duration_of(source) * SPEED_FACTOR
    seam_start = slowed_duration - FADE_SECONDS
    main_start = FADE_SECONDS
    filter_graph = (
        f"[0:v]fps={FPS},scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=increase,"
        f"crop={WIDTH}:{HEIGHT},setpts={SPEED_FACTOR}*PTS,split=3[main0][tail0][head0];"
        f"[main0]trim=start={main_start}:end={seam_start},setpts=PTS-STARTPTS[main];"
        f"[tail0]trim=start={seam_start}:end={slowed_duration},setpts=PTS-STARTPTS[tail];"
        f"[head0]trim=start=0:end={FADE_SECONDS},setpts=PTS-STARTPTS[head];"
        f"[tail][head]xfade=transition=fade:duration={FADE_SECONDS}:offset=0[seam];"
        f"[main][seam]concat=n=2:v=1:a=0[out]"
    )

    decoder = subprocess.Popen([
        "ffmpeg", "-v", "error", "-i", str(source), "-filter_complex", filter_graph,
        "-map", "[out]", "-an", "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1",
    ], stdout=subprocess.PIPE)
    encoder = subprocess.Popen([
        "ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "pipe:0", "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", "25", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(output),
    ], stdin=subprocess.PIPE)

    assert decoder.stdout is not None
    assert encoder.stdin is not None
    frame_size = WIDTH * HEIGHT * 3
    rng = np.random.default_rng(9505)
    frame_index = 0
    grain = np.zeros((HEIGHT, WIDTH, 1), dtype=np.int16)

    while True:
        raw = read_frame(decoder.stdout, frame_size)
        if len(raw) != frame_size:
            break
        frame = np.frombuffer(raw, dtype=np.uint8).reshape((HEIGHT, WIDTH, 3)).astype(np.int16)

        if frame_index % 2 == 0:
            small = rng.normal(0, 8.5, ((HEIGHT + 2) // 3, (WIDTH + 2) // 3, 1)).astype(np.int16)
            grain = np.repeat(np.repeat(small, 3, axis=0), 3, axis=1)[:HEIGHT, :WIDTH]
        frame += grain
        frame[::3] -= 3

        frame = frame.astype(np.float32)

        glitch_phase = frame_index % 83
        if glitch_phase < 3:
            band_height = 18 + glitch_phase * 7
            band_y = (frame_index * 37) % (HEIGHT - band_height)
            band = np.roll(frame[band_y:band_y + band_height], 7 - glitch_phase * 5, axis=1)
            red = np.roll(band[:, :, 0], 3, axis=1)
            blue = np.roll(band[:, :, 2], -3, axis=1)
            band[:, :, 0] = red
            band[:, :, 2] = blue
            frame[band_y:band_y + band_height] = band

        final = np.clip(frame, 0, 255).astype(np.uint8)
        encoder.stdin.write(final.tobytes())
        frame_index += 1

    encoder.stdin.close()
    decoder.wait()
    encoder_status = encoder.wait()
    if decoder.returncode != 0 or encoder_status != 0:
        return 1
    print(f"rendered {frame_index} frames to {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
