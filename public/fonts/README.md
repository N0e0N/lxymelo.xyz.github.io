# Songti fallback for Android / WeChat

Self-hosted subsets of **Noto Serif SC**, an open-source Songti / Ming serif family.

- Source: https://github.com/google/fonts/tree/main/ofl/notoserifsc
- License: SIL Open Font License 1.1; see `OFL-NotoSerifSC.txt`.
- `songti-latin.woff2`: navigation and Latin characters, including the LXY mask.
- `songti-ui.woff2`: homepage UI and project names.
- `songti-content.woff2`: remaining Chinese characters used in the source.

Regenerate after adding Chinese copy with `python3 scripts/prepare-songti-fonts.py`.
The CSS uses Unicode ranges to request the article subset only when needed.
