import { execSync } from 'child_process'

import * as puppeteer from 'puppeteer-core'

import getExporter from './exporters'
import { durationToFFmpegParams } from './ffmpeg'

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

  const exporter = getExporter(process.env.OUTPUT || 'output.mp4')
  await exporter.initializeExport()

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
    const volumeButton = document.querySelector("div.flex.cursor-pointer.items-center.justify-center.gap-2.rounded-2xl.border.border-black-130.bg-black.bg-opacity-10.p-2");
    volumeButton.children[0].click()
    } catch (e) {}
    `,
  )

  const ffmpegCmd =
    `ffmpeg -y -hide_banner -async 1 -nostdin -s ${resolution} -r 30 -draw_mouse 0
    -f x11grab -thread_queue_size 8192 -i $DISPLAY
    -c:v libx264 -preset veryfast -tune zerolatency -b:v ${rate}k -minrate ${rate}k -maxrate ${rate}k -bufsize 6000k -g 30
    -ss 00:00:03 ${ffmpegDurationParams} -pix_fmt yuv420p ${exporter.getFFmpegOutputParams()}`.replaceAll(
      /[\n\r\s]+/gm,
      ' ',
    )

  execSync(ffmpegCmd)

  await browser.close()

  await exporter.finalizeExport()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
