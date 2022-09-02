import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';
import { uploadMedia } from './mediaService';

export const updateProfile = () => {};

export const uploadCoverPhoto = async (file: any) => {
  const id = toast.loading('Loading...', {
    autoClose: 6000
  });
  const uploadResult = await uploadMedia(file);
  if (uploadResult.success) {
    try {
      const result = await _axios.put('api/user/update-profile-by-token/', {
        banner_image: uploadResult?.data?.data?.data[0]?.media_file_url || ''
      });
      toast.update(id, {
        render: 'Cover photo updated',
        type: 'success',
        isLoading: false
      });
      if (result.data?.data) {
        const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
        localStorage.setItem('userData', JSON.stringify({ ...savedUser, ...result.data.data }));
      }

      return {
        success: true,
        data: result.data.data
      };
    } catch (e) {
      toast.update(id, {
        render: 'Something went wrong!',
        type: 'error',
        isLoading: false
      });
      return {
        success: false
      };
    }
  } else {
    toast.update(id, {
      render: 'Media upload failed!',
      type: 'error',
      isLoading: false
    });
  }
};
