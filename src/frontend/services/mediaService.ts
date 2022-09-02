import _axios from 'frontend/api/axios';
import { AWS_S3_CONFIG } from 'frontend/config';
import ReactS3Client from 'react-aws-s3-typescript';

const s3Config = {
  bucketName: AWS_S3_CONFIG.bucketName,
  region: AWS_S3_CONFIG.region,
  accessKeyId: AWS_S3_CONFIG.accessKeyId,
  secretAccessKey: AWS_S3_CONFIG.secretAccessKey
};

export const uploadMedia = async (file: any) => {
  const formData = new FormData();
  formData.append('media', file);
  try {
    const res = await _axios.post('api/upload/media/', formData);
    return {
      success: true,
      data: res
    };
  } catch (e: any) {
    return {
      success: false,
      message: e.message
    };
  }
};
