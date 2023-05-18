export function durationToFFmpegParams(duration: string) {
  if (!duration) {
    return ''
  } else {
    return `-t ${duration}`
  }
}
