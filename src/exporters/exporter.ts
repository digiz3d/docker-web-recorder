export default abstract class Exporter {
  constructor(protected output: string) {}
  abstract getFFmpegOutputParams(): string
  abstract initializeExport(): Promise<void> | void
  abstract finalizeExport(): Promise<void> | void
}
