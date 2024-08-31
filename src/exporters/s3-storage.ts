import { S3 } from 'aws-sdk';
import FileExporter from './file';

export default class S3StorageExporter extends FileExporter {
  private s3: S3;
  private bucketName: string;

  constructor(protected output: string) {
    super(output);
    this.s3 = S3StorageExporter.getS3Client();
    this.bucketName = this.output.split('/')[2];
  }

  getFFmpegOutputParams() {
    return this.getTemporaryFilePath();
  }

  async initializeExport() {
    const bucketExists = await this.s3.headBucket({ Bucket: this.bucketName }).promise().then(() => true).catch(() => false);
	 
    if (bucketExists) return;
    try {
      await this.s3.createBucket({ Bucket: this.bucketName }).promise();
    } catch (e) {
      console.error('Could not create the bucket: ', e);
      throw e;
    }
  }

  async finalizeExport() {
    const destination = this.output.split('/').slice(3).join('/');
    const fileStream = require('fs').createReadStream(this.getTemporaryFilePath());
    await this.s3.upload({
      Bucket: this.bucketName,
      Key: destination,
      Body: fileStream,
    }).promise();
  }

  private static getS3Client() {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials are not set');
      throw new Error('AWS credentials are not set');
    }

    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1', // Default to us-east-1 if region is not set
    });
  }
}
