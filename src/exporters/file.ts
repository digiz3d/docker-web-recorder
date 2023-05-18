import { mkdirSync, renameSync } from 'fs'
import { dirname } from 'path'

import { v4 as uuidv4 } from 'uuid'

import Exporter from './exporter'

export default class FileExporter extends Exporter {
  private temporaryLocalFilename: string
  constructor(protected output: string) {
    super(output)
    this.temporaryLocalFilename = `${uuidv4()}.mp4`
  }

  getFFmpegOutputParams() {
    return this.getTemporaryFilePath()
  }

  initializeExport() {
    mkdirSync(dirname(this.getFinalOutputPath()), { recursive: true })
  }

  finalizeExport() {
    renameSync(this.getTemporaryFilePath(), this.getFinalOutputPath())
  }

  protected getTemporaryFilePath() {
    return `${this.getOutputDirPath()}/${this.temporaryLocalFilename}`
  }

  private getFinalOutputPath() {
    return `${this.getOutputDirPath()}/${this.output}`
  }

  private getOutputDirPath() {
    return './recordings'
  }
}
