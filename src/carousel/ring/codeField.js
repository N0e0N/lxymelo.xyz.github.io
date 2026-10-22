// A decorative code field driven by the SAME ellipses as the room's light.
// No extra animation loop, network assets, or WebGL pass is needed.
const LINES = [
  'const idea = await imagine({ design, music, AI });',
  'function create(scene) { return build(scene); }',
  'const light = mix(colorA, colorB, overlap);',
  'for (const thought of ideas) { make(thought); }',
  'vec3 glow = palette(time + position.x);',
  'if (curiosity > 0.0) explore(possibilities);',
  'const future = prototype({ human, machine });',
  'return { research, interaction, play };',
  'float field = smoothstep(0.1, 0.8, energy);',
  'design.connect(technology).then(create);',
];
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]<>/;:+=.*_()';
const noise = (n) => {
  const value = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// Each cell changes independently, roughly three times per second. Some
// cycles restore the source code so the field still has readable fragments.
export function codeGlyphAt(cell, time, reducedMotion = false) {
  if (reducedMotion) return cell.glyph;
  const rate = 2.4 + noise(cell.seed + 17) * 1.2;
  const cycle = Math.floor(time * rate + noise(cell.seed + 5));
  const value = noise(cycle * 13.7 + cell.seed * 0.19);
  return value < 0.22 ? cell.glyph : GLYPHS[Math.floor(noise(cycle * 29.3 + cell.seed) * GLYPHS.length)];
}

// Requiring a second light keeps isolated halos free of decorative text.
export function sampleHaloOverlap(x, y, halos) {
  let first = 0;
  let second = 0;
  for (const halo of halos) {
    const dx = (x - halo.x) / halo.rx;
    const dy = (y - halo.y) / halo.ry;
    const distance = dx * dx + dy * dy;
    if (distance > 1.5) continue;
    const strength = Math.exp(-3.6 * distance);
    if (strength > first) { second = first; first = strength; }
    else if (strength > second) second = strength;
  }
  const overlap = first * second;
  const edge = Math.max(0, Math.min(1, (overlap - 0.055) / 0.42));
  return edge * edge * (3 - 2 * edge);
}

const SONGTI = '"Portfolio Songti", "Songti SC", "SimSun", "STSong", "Noto Serif SC", serif';

export function fitMonogram(context, { x, y, radius }) {
  context.font = `700 100px ${SONGTI}`;
  const metrics = context.measureText('LXY');
  const ascent = metrics.actualBoundingBoxAscent || 72;
  const descent = metrics.actualBoundingBoxDescent || 0;
  const bearing = metrics.actualBoundingBoxLeft || 0;
  const glyphWidth = bearing + (metrics.actualBoundingBoxRight || metrics.width);
  const scale = Math.min(radius * 1.74 / glyphWidth, radius * 0.92 / (ascent + descent));
  return {
    left: x - glyphWidth * scale / 2,
    top: y - (ascent + descent) * scale / 2,
    width: glyphWidth * scale,
    height: (ascent + descent) * scale,
    fontSize: 100 * scale,
    bearing: bearing * scale,
    ascent: ascent * scale,
  };
}

export function createCodeField(canvas) {
  const context = canvas?.getContext('2d', { alpha: true });
  if (!context) return { draw() {}, invalidate() {}, dispose() {} };
  let width = 0;
  let height = 0;
  let lastFrame = -Infinity;
  let lastOpacity = -1;
  let staticPainted = false;
  let geometryKey = '';
  let cells = [];
  let mask = null;
  let maskContext = null;
  let maskBounds = null;
  let font = 10;

  const resize = (w, h) => {
    width = w;
    height = h;
    const dpr = Math.min(window.devicePixelRatio || 1, w <= 640 ? 1.25 : 1.5);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    geometryKey = '';
    staticPainted = false;
  };

  const composeLetters = (aperture) => {
    const key = [aperture.x, aperture.y, aperture.radius].map(n => Math.round(n * 2)).join(':');
    if (key === geometryKey) return;
    geometryKey = key;
    // Cache a tightly cropped mask in the actual local Songti font.
    // It is used only for compositing, so no solid letter is ever displayed.
    if (!mask) {
      mask = document.createElement('canvas');
      maskContext = mask.getContext('2d');
    }
    if (!maskContext) return;
    maskBounds = fitMonogram(maskContext, aperture);
    const padding = 2;
    const dpr = 1.5;
    mask.width = Math.ceil((maskBounds.width + padding * 2) * dpr);
    mask.height = Math.ceil((maskBounds.height + padding * 2) * dpr);
    maskContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    maskContext.font = `700 ${maskBounds.fontSize}px ${SONGTI}`;
    maskContext.textBaseline = 'alphabetic';
    maskContext.fillStyle = '#fff';
    maskContext.fillText('LXY', padding + maskBounds.bearing, padding + maskBounds.ascent);
    maskBounds = { ...maskBounds, left: maskBounds.left - padding, top: maskBounds.top - padding,
      width: mask.width / dpr, height: mask.height / dpr };
    const left = maskBounds.left;
    const right = left + maskBounds.width;
    const top = maskBounds.top;
    const bottom = top + maskBounds.height;
    font = Math.max(7, Math.min(11, (right - left) / 48));
    const stepX = font * 0.86;
    const stepY = font * 1.45;
    cells = [];
    for (let row = 0, y = top + stepY / 2; y < bottom; row++, y += stepY) {
      const line = LINES[row % LINES.length];
      for (let column = 0, x = left + stepX / 2; x < right; column++, x += stepX) {
        const seed = row * 197 + column * 37;
        const glyph = line[(column + row * 11) % line.length];
        if (glyph === ' ' || noise(seed + 7) < 0.06) continue;
        cells.push({ x, y, seed, glyph });
      }
    }
    staticPainted = false;
  };

  return {
    draw({ time, halos, aperture, width: w, height: h, opacity, reducedMotion = false }) {
      const alpha = Math.round(opacity * 100) / 100;
      if (alpha !== lastOpacity) {
        canvas.style.opacity = String(alpha);
        lastOpacity = alpha;
      }
      if (alpha <= 0.01 || document.hidden || !aperture || aperture.radius <= 0) return;
      if (w !== width || h !== height) resize(w, h);
      if (time - lastFrame < (w <= 640 ? 1 / 8 : 1 / 12)) return;
      composeLetters(aperture);
      if (reducedMotion && staticPainted) return;
      lastFrame = time;
      context.clearRect(0, 0, width, height);
      context.save();
      if (!maskBounds || !maskContext) { context.restore(); return; }
      context.beginPath();
      context.rect(maskBounds.left, maskBounds.top, maskBounds.width, maskBounds.height);
      context.clip();
      context.font = `${font}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      context.textBaseline = 'middle';
      context.textAlign = 'center';
      for (const cell of cells) {
        const strength = sampleHaloOverlap(cell.x, cell.y, halos);
        if (strength < 0.025) continue;
        const phase = reducedMotion ? 0.6 : Math.sin(time * 2.1 + cell.seed * 0.7) * 0.5 + 0.5;
        const pulse = 0.18 + 0.82 * phase * phase;
        const ink = strength * pulse;
        if (ink < 0.035) continue;
        const glyph = codeGlyphAt(cell, time, reducedMotion);
        context.fillStyle = `rgba(0, 0, 0, ${ink * 0.95})`;
        context.fillText(glyph, cell.x, cell.y);
        if (ink > 0.6) {
          context.fillStyle = `rgba(0, 0, 0, ${(ink - 0.6) * 1.1})`;
          context.fillText(glyph, cell.x, cell.y - 0.5);
        }
      }
      context.globalCompositeOperation = 'destination-in';
      context.drawImage(mask, maskBounds.left, maskBounds.top, maskBounds.width, maskBounds.height);
      context.restore();
      staticPainted = reducedMotion;
    },
    invalidate() { geometryKey = ''; staticPainted = false; },
    dispose() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.height = 0;
      cells = [];
      if (mask) mask.width = mask.height = 0;
      mask = maskContext = maskBounds = null;
    },
  };
}
