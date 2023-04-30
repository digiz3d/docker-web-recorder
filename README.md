# Docker Web Recorder

Docker image to record a website with video and sound

Possible and easy future iterations:
- upload the file
- stream it

# Usage

```
docker build -t docker-web-recorder:latest .
docker run -v /absolute/path/to/your/recordings:/app/recordings --rm -e URL=https://xxxxx.com/video/123456 -e DURATION=25 -it docker-web-recorder:latest
```

## Variables

`URL` is the webpage to record  
`DURATION` is how many seconds should the clip be

# Implementation details

For now the first few seconds are cut because of an audio noise