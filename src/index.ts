import * as puppeteer from 'puppeteer-core'
import { execSync } from 'child_process'
import { durationToFFmpegParams, outputToFFmpegParams } from './ffmpeg'

const url = process.env.URL
const resolution = process.env.RESOLUTION
const rate = process.env.RATE || 6000

async function main() {
  if (!url) throw new Error('URL environment variable is required')
  if (!resolution)
    throw new Error('RESOLUTION environment variable is required')

  const resolutionSplit = resolution.split('x')
  const resolutionWidth = parseInt(resolutionSplit[0], 10)
  const resolutionHeight = parseInt(resolutionSplit[1], 10)
  if (!resolutionWidth || !resolutionHeight)
    throw new Error('RESOLUTION must be in the format of 1280x720')

  const ffmpegOutputParams = outputToFFmpegParams(
    process.env.OUTPUT || 'output.mp4',
  )
  const ffmpegDurationParams = durationToFFmpegParams(
    process.env.DURATION || '',
  )

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: false,
    ignoreDefaultArgs: ['--mute-audio', '--enable-automation'],
    defaultViewport: {
      width: resolutionWidth,
      height: resolutionHeight,
    },
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--disable-dev-shm-usage',
      '--disable-default-apps',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--autoplay-policy=no-user-gesture-required',
      `--window-size=${resolutionWidth},${resolutionHeight}`,
      '--window-position=0,0',
      '--kiosk',
    ],
  })

  const page = await browser.newPage()
  page.on('console', (msg) => console.log(msg.text()))
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // this can be used to unmute a video, or anything else needed
  await page.evaluate(
    `
    try {
    const volumeButton = document.querySelector("div.flex.cursor-pointer.items-center.justify-center.gap-2.rounded-2xl.border.border-offwhite-150.bg-black.bg-opacity-10.p-2");
    volumeButton.children[0].click()
    } catch (e) {}
    `,
  )

  const ffmpegCmd =
    `ffmpeg -y -hide_banner -async 1 -nostdin -s ${resolution} -r 30 -draw_mouse 0
    -f x11grab -i $DISPLAY
    -f pulse -ac 2 -i default
    -c:v libx264 -preset veryfast -tune zerolatency -b:v ${rate}k -minrate ${rate}k -maxrate ${rate}k -g 30
    -c:a aac -b:a 128k -ac 2 -ar 44100
    -ss 00:00:05 ${ffmpegDurationParams} ${ffmpegOutputParams}`.replaceAll(
      /[\n\r\s]+/gm,
      ' ',
    )

  execSync(ffmpegCmd)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
