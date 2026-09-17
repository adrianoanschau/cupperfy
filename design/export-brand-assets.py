#!/usr/bin/env python3
"""Export header lockup + favicons from design/logo-base.png."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(__file__).resolve().parent / "logo-base.png"
DESIGN = Path(__file__).resolve().parent
PUBLIC_BRAND = ROOT / "apps/web/public/brand"
APP_DIR = ROOT / "apps/web/src/app"

INK = (26, 21, 18)


def keep_largest_blob(im: Image.Image, threshold: int = 24) -> Image.Image:
    arr = np.array(im)
    mask = arr[:, :, 3] > threshold
    dilated = mask.copy()
    for _ in range(4):
        nxt = dilated.copy()
        nxt[1:, :] |= dilated[:-1, :]
        nxt[:-1, :] |= dilated[1:, :]
        nxt[:, 1:] |= dilated[:, :-1]
        nxt[:, :-1] |= dilated[:, 1:]
        nxt[1:, 1:] |= dilated[:-1, :-1]
        nxt[1:, :-1] |= dilated[:-1, 1:]
        nxt[:-1, 1:] |= dilated[1:, :-1]
        nxt[:-1, :-1] |= dilated[1:, 1:]
        dilated = nxt

    height, width = dilated.shape
    labels = np.zeros((height, width), dtype=np.int32)
    sizes: dict[int, int] = {}
    current = 0

    for y in range(height):
        for x in range(width):
            if not dilated[y, x] or labels[y, x]:
                continue
            current += 1
            queue = deque([(x, y)])
            labels[y, x] = current
            count = 0
            while queue:
                cx, cy = queue.popleft()
                count += 1
                for nx, ny in (
                    (cx - 1, cy),
                    (cx + 1, cy),
                    (cx, cy - 1),
                    (cx, cy + 1),
                    (cx - 1, cy - 1),
                    (cx + 1, cy - 1),
                    (cx - 1, cy + 1),
                    (cx + 1, cy + 1),
                ):
                    if 0 <= nx < width and 0 <= ny < height and dilated[ny, nx] and labels[ny, nx] == 0:
                        labels[ny, nx] = current
                        queue.append((nx, ny))
            sizes[current] = count

    if not sizes:
        return im

    keep = max(sizes, key=sizes.get)
    alpha = np.where((labels == keep) & mask, arr[:, :, 3], 0).astype(np.uint8)
    rgb = arr[:, :, :3].copy()
    rgb[alpha == 0] = 0
    return Image.fromarray(np.dstack([rgb, alpha]), "RGBA")


def trim(im: Image.Image, pad: int = 8, threshold: int = 18) -> Image.Image:
    alpha = np.array(im.split()[-1])
    ys, xs = np.where(alpha > threshold)
    if len(xs) == 0:
        return im
    left, right = int(xs.min()), int(xs.max())
    top, bottom = int(ys.min()), int(ys.max())
    cropped = im.crop((left, top, right + 1, bottom + 1))
    if pad <= 0:
        return cropped
    canvas = Image.new("RGBA", (cropped.width + pad * 2, cropped.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(cropped, (pad, pad))
    return canvas


def content_row_bands(im: Image.Image, mincount: int = 20, threshold: int = 18) -> list[tuple[int, int]]:
    alpha = np.array(im.split()[-1])
    rows = (alpha > threshold).sum(axis=1)
    bands: list[tuple[int, int]] = []
    start: int | None = None
    for i, count in enumerate(rows):
        if count >= mincount and start is None:
            start = i
        elif count < mincount and start is not None:
            bands.append((start, i))
            start = None
    if start is not None:
        bands.append((start, len(rows)))
    return bands


def orange_only(im: Image.Image, chroma_min: int = 40) -> Image.Image:
    arr = np.array(im)
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3]
    chroma = rgb.max(axis=2) - rgb.min(axis=2)
    keep = (alpha > 18) & (chroma > chroma_min)
    out_alpha = np.where(keep, alpha, 0).astype(np.uint8)
    out_rgb = arr[:, :, :3].copy()
    out_rgb[out_alpha == 0] = 0
    return Image.fromarray(np.dstack([out_rgb, out_alpha]), "RGBA")


def to_white_icon(im: Image.Image) -> Image.Image:
    arr = np.array(im)
    rgb = np.full_like(arr[:, :, :3], 255)
    alpha = arr[:, :, 3]
    rgb[alpha == 0] = 0
    return Image.fromarray(np.dstack([rgb, alpha]), "RGBA")


def to_light_lockup(im: Image.Image) -> Image.Image:
    arr = np.array(im)
    rgb, alpha = arr[:, :, :3].astype(np.int16), arr[:, :, 3]
    chroma = rgb.max(axis=2) - rgb.min(axis=2)
    luma = 0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2]
    letters = (alpha > 18) & (chroma < 48) & (luma > 70)
    rgb[letters] = INK
    return Image.fromarray(np.dstack([rgb.astype(np.uint8), alpha]), "RGBA")


def fit_square(im: Image.Image, size: int, fill: tuple[int, int, int, int] | None = None) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), fill or (0, 0, 0, 0))
    scale = min((size * 0.78) / im.width, (size * 0.78) / im.height)
    w, h = max(1, round(im.width * scale)), max(1, round(im.height * scale))
    fitted = im.resize((w, h), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((size - w) // 2, (size - h) // 2), fitted)
    return canvas


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    PUBLIC_BRAND.mkdir(parents=True, exist_ok=True)
    APP_DIR.mkdir(parents=True, exist_ok=True)

    bands = content_row_bands(src)
    if len(bands) < 2:
        raise SystemExit(f"expected stacked + lockup bands in {SRC.name}, got {bands}")

    stacked_box = (0, bands[0][0], src.width, bands[0][1])
    lockup_box = (0, bands[1][0], src.width, bands[1][1])
    stacked_src = src.crop(stacked_box)
    lockup_src = src.crop(lockup_box)

    trophy = trim(keep_largest_blob(orange_only(stacked_src), threshold=16), pad=16)
    lockup = trim(lockup_src, pad=16)
    stacked = trim(stacked_src, pad=16)
    lockup_light = to_light_lockup(lockup)
    trophy_white = to_white_icon(trophy)

    trophy.save(DESIGN / "cupperfy-icon.png", "PNG", optimize=True)
    trophy_white.save(DESIGN / "cupperfy-icon-white.png", "PNG", optimize=True)
    lockup.save(DESIGN / "cupperfy-lockup.png", "PNG", optimize=True)
    lockup_light.save(DESIGN / "cupperfy-lockup-light.png", "PNG", optimize=True)
    stacked.save(DESIGN / "cupperfy-stacked.png", "PNG", optimize=True)

    trophy.save(PUBLIC_BRAND / "cupperfy-icon.png", "PNG", optimize=True)
    trophy_white.save(PUBLIC_BRAND / "cupperfy-icon-white.png", "PNG", optimize=True)
    lockup.save(PUBLIC_BRAND / "cupperfy-lockup.png", "PNG", optimize=True)
    lockup_light.save(PUBLIC_BRAND / "cupperfy-lockup-light.png", "PNG", optimize=True)

    icon32 = fit_square(trophy, 32)
    icon32.save(APP_DIR / "icon.png", "PNG", optimize=True)
    fit_square(trophy, 180, fill=(*INK, 255)).save(APP_DIR / "apple-icon.png", "PNG", optimize=True)
    icon32.save(
        APP_DIR / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32)],
    )

    print("trophy", trophy.size)
    print("lockup", lockup.size)
    print("stacked", stacked.size)


if __name__ == "__main__":
    main()
