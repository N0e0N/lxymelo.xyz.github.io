# 人物背影图标制作记录

- 模式：内置 image_gen 图像编辑（背景移除，透明输出）。
- 原始透明图片：`public/icons/melo-cutout.png`。
- 网站图标：`public/icons/favicon-32.png`、`favicon-64.png`、`favicon-192.png`、`favicon-512.png`。
- 兼容图标：`public/favicon.ico`（16/32/48/64 像素）和 `public/apple-touch-icon.png`（180 像素）。
- 图像编辑后仅做透明边界裁切、等比例缩小、居中与格式转换，用于图标交付。

最终使用的提示词：

> Remove the background from this photo. Keep the fully clothed person in the pink jacket, seen from behind, exactly as photographed. Remove all ocean and stone. Preserve the hair, jacket, and hands. Center this photographic cutout on a square transparent canvas with a little padding. No other changes. This is an image-editing background-removal task for a website icon.
