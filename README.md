# Docker Web Recorder

<p align="center">
  <a href="https://hub.docker.com/r/digiz3d/web-recorder  " alt="Latest docker image version">
    <img src="https://img.shields.io/docker/v/digiz3d/web-recorder/latest" />
  </a>
  <a href="https://hub.docker.com/r/digiz3d/web-recorder" alt="Docker pulls">
    <img src="https://img.shields.io/docker/pulls/digiz3d/web-recorder" />
  </a>
</p>

Docker image to record or stream a website with video and sound.

# Building the image

```bash
docker build -t docker-web-recorder:latest .
```

# Usage

## Record a file

```bash
docker run --rm -v /absolute/path/to/your/recordings:/app/recordings -e OUTPUT=video.mp4 -e URL=https://example.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

## Record and send to Google Cloud Storage (GCS)

```bash
docker run --rm -e OUTPUT=gs://somebucket/path/video.mp4 -e GOOGLE_APPLICATION_CREDENTIALS=your-json-key -e URL=https://example.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

The `GOOGLE_APPLICATION_CREDENTIALS` environment variable can be used if you prefer providing a JSON key instead of using Application Default Credentials.

## Record and send to AWS S3 Storage

```bash
docker run --rm -e OUTPUT=s3://yourbucket/path/video.mp4 -e AWS_ACCESS_KEY_ID=your-access-key -e AWS_SECRET_ACCESS_KEY=your-secret-key -e AWS_REGION=your-region -e URL=https://example.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

The `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` environment variables must be set to upload files to AWS S3.

## Make a livestream

```bash
docker run --rm -e OUTPUT=rtmp://example.com/app/your_key_here -e URL=https://example.com/video/123456 -e RATE=1000 -e DURATION=120 -it docker-web-recorder:latest
```

For instance if you plan on streaming to Twitch, set the OUTPUT to something like `rtmp://cdg10.contribute.live-video.net/app/live_blablabla`. Depends on [the best Twitch ingest server](https://help.twitch.tv/s/twitch-ingest-recommendation?language=en_US) for you.

## Variables

`DURATION` is the length of the recording. No value means infinite  
`GOOGLE_APPLICATION_CREDENTIALS` optional. Can be used instead of Application Default Credentials when using GCS.  
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` are required when using S3.
`OUTPUT` is the output file/stream. Can either start with `rtmp://`, `gs://` or end with `.mp4`. Defaults to `output.mp4`  
`RATE` is the constant bitrate (CBR) used for the video. Defaults to `6000`  
`RESOLUTION` is the resolution of the video. Defaults to `1280x720`  
`URL` is the webpage to record. Required.

# Contributing

Feel free to open an issue if you have any question or suggestion.  
PRs are welcome, especially for the following points :clap:

- [x] RTMP(s) stream
- [x] record to mp4
- [x] upload the file
  - [x] to GCS
  - [x] to S3
- [ ] configuration
  - [x] resolution
  - [ ] bitrate
  - [ ] framerate
  - [ ] audio
  - [ ] video codec
