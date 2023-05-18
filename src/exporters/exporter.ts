export default abstract class Exporter {
  constructor(protected output: string) {}
  abstract getFFmpegOutputParams(): string
  abstract finishExport(): Promise<void> | void
}
