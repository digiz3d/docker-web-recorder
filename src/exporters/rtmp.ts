import Exporter from './exporter'

export default class RTMPExporter extends Exporter {
  getFFmpegOutputParams() {
    return `-f flv ${this.output}`
  }

  finishExport() {}
}
