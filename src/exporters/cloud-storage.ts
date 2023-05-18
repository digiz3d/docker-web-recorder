import { Bucket, Storage } from '@google-cloud/storage'

import FileExporter from './file'

export default class CloudStorageExporter extends FileExporter {
  private bucket: Bucket
  private storage: Storage

  constructor(protected output: string) {
    super(output)
    this.storage = CloudStorageExporter.getStorage()
    const bucketName = this.output.split('/')[2]
    this.bucket = this.storage.bucket(bucketName)
  }

  getFFmpegOutputParams() {
    return this.getTemporaryFilePath()
  }

  async initializeExport() {
    const [bucketExists] = await this.bucket.exists()
    if (bucketExists) return
    try {
      await this.bucket.create()
    } catch (e) {
      console.error('Could not create the bucket: ', e)
      throw e
    }
  }

  async finalizeExport() {
    const destination = this.output.split('/').slice(3).join('/')
    await this.bucket.upload(this.getTemporaryFilePath(), {
      destination,
    })
  }

  private static getStorage() {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) return new Storage()
    return new Storage({
      credentials: CloudStorageExporter.getCredentials(
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
      ),
    })
  }

  private static getCredentials(credentials: string) {
    try {
      return JSON.parse(credentials)
    } catch {
      console.warn(
        'Could not parse GOOGLE_APPLICATION_CREDENTIALS as JSON, trying base64',
      )
      return JSON.parse(Buffer.from(credentials, 'base64').toString('ascii'))
    }
  }
}
