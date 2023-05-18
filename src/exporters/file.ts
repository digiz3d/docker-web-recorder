import { dirname } from 'path'
import { mkdirSync, renameSync } from 'fs'
import { v4 } from 'uuid'

import Exporter from './exporter'

export default class FileExporter extends Exporter {
  protected outputLocalFilename: string
  constructor(protected output: string) {
    super(output)
    this.outputLocalFilename = `${v4()}.mp4`
  }

  getFFmpegOutputParams() {
    mkdirSync(dirname(`./recordings/${this.output}`), { recursive: true })
    return this.getLocalOutputFilePath()
  }

  protected getLocalOutputFilePath() {
    return `./recordings/${this.outputLocalFilename}`
  }

  async finishExport() {
    renameSync(this.getLocalOutputFilePath(), `./recordings/${this.output}`)
  }
}
