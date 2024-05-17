import { httpClient } from '@/api/http';

export const editUsername = async (email: string, username: string) => {
  const response = await httpClient.put(`/user/username/${email}`, {
    username,
  });
  return response.data;
};

export const uploadProfileImage = async (email: string, file: File) => {
  const formData = new FormData();
  formData.append('profile_image', file);

  const response = await httpClient.put(
    `/user/upload/profile/${email}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.imageUrl;
};

export const uploadCoverImage = async (email: string, file: File) => {
  const formData = new FormData();
  formData.append('cover_image', file);

  const response = await httpClient.put(
    `/user/upload/cover/${email}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.imageUrl;
};

export const fetchProfileImage = async (email: string) => {
  const response = await httpClient.get(`/user/profile/${email}`, {
    responseType: 'blob',
  });

  const imageUrl = URL.createObjectURL(response.data);
  return imageUrl;
};

export const fetchCoverImage = async (email: string) => {
  const response = await httpClient.get(`/user/cover/${email}`, {
    responseType: 'blob', // 이미지를 Blob 형태
  });
  const imageUrl = URL.createObjectURL(response.data);
  return imageUrl;
};
