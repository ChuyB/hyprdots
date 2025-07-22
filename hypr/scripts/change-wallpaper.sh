#!/usr/bin/bash

DIR=$HOME/Pictures/Wallpapers
PICS=($(ls ${DIR}))

RANDOMPICS=${PICS[ $RANDOM % ${#PICS[@]} ]}

wal -i ${DIR}/${RANDOMPICS} --backend wal --saturate 0.55 &
wait
swww img ${DIR}/${RANDOMPICS} -t center --transition-fps 60 --transition-duration 1.0

echo "Successfully set a new wallpaper and generated colors from it."

