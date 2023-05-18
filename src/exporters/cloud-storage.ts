import { Storage } from '@google-cloud/storage'

import FileExporter from './file'

export default class CloudStorageExporter extends FileExporter {
  private cloudStorage: Storage = new Storage()

  constructor(protected output: string) {
    super(output)
    this.cloudStorage = new Storage({
      credentials: CloudStorageExporter.getCredentials(),
    })
  }

  private static getCredentials() {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error(
        'GOOGLE_APPLICATION_CREDENTIALS environment variable is required to use Cloud Storage',
      )
    }
    try {
      return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    } catch (e) {
      console.warn(
        'Could not parse GOOGLE_APPLICATION_CREDENTIALS as JSON, trying base64',
      )
      return JSON.parse(
        Buffer.from(
          process.env.GOOGLE_APPLICATION_CREDENTIALS,
          'base64',
        ).toString('ascii'),
      )
    }
  }

  getFFmpegOutputParams() {
    return this.getLocalOutputFilePath()
  }

  async finishExport() {
    const bucketName = this.output.split('/')[2]
    const bucket = this.cloudStorage.bucket(bucketName)
    const destination = this.output.split('/').slice(3).join('/')

    await bucket.upload(this.getLocalOutputFilePath(), {
      destination,
    })
  }
}
