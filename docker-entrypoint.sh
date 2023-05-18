#!/usr/bin/env sh
set -e
export RESOLUTION="${RESOLUTION:=1280x720}"

RESOLUTION_W=$(echo $RESOLUTION | cut -d'x' -f1)
RESOLUTION_H=$(echo $RESOLUTION | cut -d'x' -f2)

pulseaudio -D
Xvfb $DISPLAY -screen 0 $RESOLUTION_W"x"$RESOLUTION_H"x24" 2>&1 &

exec "$@"