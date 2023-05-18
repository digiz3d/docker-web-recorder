import CloudStorageExporter from './cloud-storage'
import Exporter from './exporter'
import FileExporter from './file'
import RTMPExporter from './rtmp'

export default function getExporter(output: string): Exporter {
  if (output.startsWith('rtmp://') || output.startsWith('rtmps://')) {
    return new RTMPExporter(output)
  }
  if (!output.endsWith('.mp4')) {
    throw new Error(
      'Invalid output string. Should be either xxxx.mp4 or rtmp://xxxx',
    )
  }
  if (output.startsWith('gs://')) {
    return new CloudStorageExporter(output)
  }
  if (output.startsWith('s3://')) {
    throw new Error('AWS S3 is not supported yet')
  }
  return new FileExporter(output)
}
