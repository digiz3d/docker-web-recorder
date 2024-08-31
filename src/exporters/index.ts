import CloudStorageExporter from './cloud-storage'
import S3StoraegExporter from './s3-storage'
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
	return new S3StoraegExporter(output)
  }
  return new FileExporter(output)
}
