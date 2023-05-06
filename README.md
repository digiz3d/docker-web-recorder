# Docker Web Recorder

Docker image to record or stream a website with video and sound.

TODO:

- [x] stream the webpage
- [ ] record to mp4
- [ ] upload the file

# Building the image

```bash
docker build -t docker-web-recorder:latest .
```

# Usage

## Record a file

```bash
docker run -v /absolute/path/to/your/recordings:/app/recordings --rm -e OUTPUT=video.mp4 -e URL=https://xxxxx.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

## Make a livestream

```bash
docker run --rm -e OUTPUT=rtmp://example.com/app/your_key_here -e URL=https://xxxxx.com/video/123456 -e RATE=1000 -e DURATION=120 -it docker-web-recorder:latest
```

For instance if you plan on streaming to Twitch, set the OUTPUT to something like `rtmp://cdg10.contribute.live-video.net/app/live_blablabla`. Depends on [the best Twitch ingest server](https://stream.twitch.tv/ingests) for you.

## Variables

`URL` is the webpage to record. Required.  
`DURATION` is the lenght of the recording. No value means infinite  
`RATE` is the constant bitrate used for the video. Defaults to `6000`  
`OUTPUT` is the output file/stream. Can either start with `rtmp://` or end with `.mp4` . Defaults to `output.mp4`

# Implementation details

For now the first few seconds are cut because of an audio noise
