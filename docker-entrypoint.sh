#!/usr/bin/env sh

if [ -z "$RESOLUTION" ];
    then RESOLUTION="1280x720";
fi

RESOLUTION_W=$(echo $RESOLUTION | cut -d'x' -f1)
RESOLUTION_H=$(echo $RESOLUTION | cut -d'x' -f2)

pulseaudio -D
Xvfb $DISPLAY -screen 0 $RESOLUTION_W"x"$RESOLUTION_H"x24" 2>&1 &

exec "$@"