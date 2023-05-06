export function outputToFFmpegParams(output: string) {
  if (output.match(/([\n\r\s])/)) {
    throw new Error("The output path can't contain spaces")
  }

  if (output.endsWith(".mp4")) {
    return `./recordings/${output}`
  } else if (output.startsWith("rtmp://")) {
    return `-pix_fmt yuv420p -f flv ${output}`
  } else {
    throw new Error(
      "Invalid output string. Should be either xxxx.mp4 or rtmp://xxxx",
    )
  }
}
