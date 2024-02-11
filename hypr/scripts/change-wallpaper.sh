#!/usr/bin/bash

DIR=$HOME/Pictures/Wallpapers
PICS=($(ls ${DIR}))

RANDOMPICS=${PICS[ $RANDOM % ${#PICS[@]} ]}

swww img ${DIR}/${RANDOMPICS} --transition-type any --transition-fps 120 --transition-duration 1.0 --transition-bezier 0.65,0,0.35,1 --transition-step 255
wal -i ${DIR}/${RANDOMPICS}
killall waybar
waybar

echo "Successfully set a new wallpaper and generated colors from it."
