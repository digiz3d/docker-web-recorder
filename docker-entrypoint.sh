#!/usr/bin/env bash

pulseaudio -D
Xvfb :99 -screen 0 1280x720x24 2>&1 &

exec "$@"