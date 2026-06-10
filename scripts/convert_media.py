"""
Convert HEIC/JPG source photos to web-optimized JPGs (correct orientation,
downsized) and the .MOV to an MP4 hero video + poster frame.

Run once:  python scripts/convert_media.py
"""
import io
import os
import subprocess
import sys

from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

SRC = os.path.join("public", "images")
VID_SRC = os.path.join("public", "videos", "export_1752755466589.MOV")

# (source filename, destination relative path, max long edge px)
JOBS = [
    ("IMG_0479 - Lebron.HEIC", "public/bulls/lebron/1.jpg", 2200),
    ("IMG_0608 - Lebron.JPG",  "public/bulls/lebron/2.jpg", 2200),
    ("IMG_0653 - Levi.HEIC",   "public/bulls/levi/1.jpg",   2200),
    ("IMG_0741 - Levi.JPG",    "public/bulls/levi/2.jpg",   2200),
    ("IMG_0740 - Leroy.JPG",   "public/bulls/leroy/1.jpg",  2200),
    ("IMG_1176 - Mouse.JPG",   "public/bulls/mouse/1.jpg",  2200),
    ("IMG_1342-  - Marvin.HEIC", "public/bulls/marvin/1.jpg", 2200),
    ("IMG_8898 - Jagger.HEIC", "public/bulls/jagger/1.jpg", 2200),
    ("IMG_0369.HEIC", "public/gallery/herd-1.jpg", 2600),
    ("IMG_0683.HEIC", "public/gallery/herd-2.jpg", 2600),
    ("IMG_0865.HEIC", "public/gallery/herd-3.jpg", 2600),
    ("IMG_2085.HEIC", "public/gallery/herd-4.jpg", 2600),
]


def convert_image(src_name, dst, max_edge, quality=85):
    src = os.path.join(SRC, src_name)
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)  # bake in EXIF orientation
    img = img.convert("RGB")
    w, h = img.size
    scale = min(1.0, max_edge / max(w, h))
    if scale < 1.0:
        img = img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    img.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    kb = os.path.getsize(dst) // 1024
    print(f"  {src_name:32s} -> {dst:30s} {img.size[0]}x{img.size[1]} {kb}KB")


def convert_video():
    if not os.path.exists(VID_SRC):
        print("  (no source video found)")
        return
    out_mp4 = "public/video/hero.mp4"
    out_poster = "public/video/hero-poster.jpg"
    # H.264 MP4, max 1080p tall, faststart for web streaming, strip audio metadata
    subprocess.run([
        "ffmpeg", "-y", "-i", VID_SRC,
        "-vf", "scale='min(1920,iw)':'-2'",
        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-crf", "24", "-preset", "slow", "-movflags", "+faststart",
        "-an", out_mp4,
    ], check=True)
    # poster frame at 1s
    subprocess.run([
        "ffmpeg", "-y", "-ss", "00:00:01", "-i", VID_SRC,
        "-vframes", "1", "-vf", "scale='min(1920,iw)':'-2'",
        "-q:v", "3", out_poster,
    ], check=True)
    print(f"  video -> {out_mp4} ({os.path.getsize(out_mp4)//1024}KB)")
    print(f"  poster -> {out_poster}")


if __name__ == "__main__":
    print("Converting images...")
    for job in JOBS:
        try:
            convert_image(*job)
        except Exception as e:
            print(f"  !! failed {job[0]}: {e}", file=sys.stderr)
    print("Converting video...")
    convert_video()
    print("Done.")
