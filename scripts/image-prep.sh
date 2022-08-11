#!/usr/bin/env bash 

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
TARGET=$(realpath "$SCRIPT_DIR/../static/bg-img/")
FULL=$(realpath "$SCRIPT_DIR/../static/bg-img/full/")

for i in $(find "$FULL" -type f -regex '.*\(jpg\|png\)$'); do
  convert "$i" "${i%.*}.webp"
  j=$(basename $i)
  convert "$i" -resize 64x64 "$TARGET/${j%.*}.webp"
  rm "$i"
done
