# Docker Web Recorder

Docker image to record or stream a website with video and sound.

TODO:

- [x] stream the webpage
- [x] record to mp4
- [ ] upload the file

# Building the image

```bash
docker build -t docker-web-recorder:latest .
```

# Usage

## Record a file

```bash
docker run --rm -v /absolute/path/to/your/recordings:/app/recordings -e OUTPUT=video.mp4 -e URL=https://example.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

## Record and send to Cloud Storage

```bash
docker run --rm -e OUTPUT=gs://somebucket/path/video.mp4 -e GOOGLE_APPLICATION_CREDENTIALS=your-json-key -e URL=https://example.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

## Make a livestream

```bash
docker run --rm -e OUTPUT=rtmp://example.com/app/your_key_here -e URL=https://example.com/video/123456 -e RATE=1000 -e DURATION=120 -it docker-web-recorder:latest
```

For instance if you plan on streaming to Twitch, set the OUTPUT to something like `rtmp://cdg10.contribute.live-video.net/app/live_blablabla`. Depends on [the best Twitch ingest server](https://stream.twitch.tv/ingests) for you.

## Variables

`DURATION` is the lenght of the recording. No value means infinite  
`GOOGLE_APPLICATION_CREDENTIALS` used if you output to `gs://something`  
`OUTPUT` is the output file/stream. Can either start with `rtmp://`, `gs://` or end with `.mp4`. Defaults to `output.mp4`  
`RATE` is the constant bitrate (CBR) used for the video. Defaults to `6000`  
`RESOLUTION` is the resolution of the video. Defaults to `1280x720`  
`URL` is the webpage to record. Required.  

# Implementation details

For now the first few seconds are cut because of an audio noise
