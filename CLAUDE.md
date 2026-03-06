# Hot Wheels Project Rules

## Image Thumbnails

**RULE: Every time new images are added to `img/`, generate thumbnails before committing.**

Original images must NEVER be modified.

### Thumbnail Specs
- **Width**: 680px (auto height, preserves aspect ratio)
- **Format**: JPEG
- **Quality**: 85
- **Metadata**: Stripped (no EXIF in thumbnails)
- **Output location**: `img/<date>/thumbs/<basename>.jpg`
  - Extension is always `.jpg` regardless of original format (JPG, PNG, etc.)

### How to Generate

For a single date folder:
```bash
cd img/<date>
mkdir -p thumbs
for f in *.JPG *.png; do
  convert "$f" -resize 680x -quality 85 -strip "thumbs/${f%.*}.jpg"
done
```

For all date folders at once:
```bash
for dir in img/*/; do
  mkdir -p "$dir/thumbs"
  for f in "$dir"*.JPG "$dir"*.png; do
    [ -f "$f" ] || continue
    base=$(basename "${f%.*}")
    convert "$f" -resize 680x -quality 85 -strip "$dir/thumbs/${base}.jpg"
  done
done
```

### Why 680px
Gallery cards are `minmax(340px, 1fr)` wide. 680px provides 2x resolution for retina displays while keeping file sizes ~40-55KB vs ~10MB originals.
