#!/usr/bin/env sh

if pgrep -x "wlogout" > /dev/null; then
    pkill -x wlogout
else
    wlogout &
fi
