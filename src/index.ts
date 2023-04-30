import * as puppeteer from "puppeteer"
import { execSync } from "child_process"

const url = process.env.URL
const duration = process.env.DURATION || 10

async function main() {
  if (!url) {
    console.error("URL environment variable is required")
    process.exit(1)
  }
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: false,
    ignoreDefaultArgs: ["--mute-audio", "--enable-automation"],
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--disable-dev-shm-usage",
      "--disable-default-apps",
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--autoplay-policy=no-user-gesture-required",
      "--window-size=1280,720",
      "--window-position=0,0",
      "--kiosk",
    ],
  })

  const page = await browser.newPage()
  page.on("console", (msg) => console.log(msg.text()))
  await page.goto(url, { waitUntil: "domcontentloaded" })
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
    `ffmpeg -y -hide_banner -async 1 -nostdin -s 1280x720 -r 30 -draw_mouse 0
    -f x11grab -i :99.0
    -f pulse -ac 2 -i default
    -c:v libx264 -preset ultrafast -minrate 6000 -maxrate 6000 -g 12000
    -c:a aac -b:a 192k -ac 2 -ar 44100
    -ss 00:00:05 -t ${duration} ./recordings/output.mp4`.replaceAll(/[\n\r\s]+/gm, " ")

  execSync(ffmpegCmd)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
