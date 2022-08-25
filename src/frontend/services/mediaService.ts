import { AWS_S3_CONFIG } from 'frontend/config';
import ReactS3Client from 'react-aws-s3-typescript';
import { toast } from 'react-toastify';

const s3Config = {
  bucketName: 'dint',
  region: 'us-east-2',
  accessKeyId: AWS_S3_CONFIG.accessKeyId,
  secretAccessKey: AWS_S3_CONFIG.secretAccessKey
};

export const uploadMedia = async (file: any) => {
  const s3 = new ReactS3Client(s3Config);
  try {
    const res = await s3.uploadFile(file);
    return {
      success: true,
      uploadedUrl: res.location
    };
  } catch (e) {
    return {
      success: false
    };
  }
};
