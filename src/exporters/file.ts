import { randomUUID } from 'node:crypto'
import { mkdirSync, renameSync } from 'node:fs'
import { dirname } from 'node:path'

import Exporter from './exporter'

export default class FileExporter extends Exporter {
  private temporaryLocalFilename: string
  constructor(protected output: string) {
    super(output)
    this.temporaryLocalFilename = `${randomUUID()}.mp4`
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
