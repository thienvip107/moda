/**
 * Tự động thêm tham số w_width,f_auto,q_auto vào Cloudinary URL để tối ưu dung lượng & kích thước phù hợp
 * @param {string} url - URL Cloudinary gốc
 * @param {number} width - Chiều rộng tối đa (mặc định 800px cho card, 1920px cho hero banner, 400px cho thumbnail)
 * @returns {string} - URL đã được tối ưu tốc độ và kích thước
 */
export function optimizeCloudinaryUrl(url, width = 800) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    const transform = width ? `w_${width},f_auto,q_auto` : 'f_auto,q_auto';
    if (url.includes('/upload/f_auto,q_auto/')) {
      return url.replace('/upload/f_auto,q_auto/', `/upload/${transform}/`);
    }
    if (/\/upload\/w_\d+/.test(url)) {
      return url.replace(/\/upload\/w_\d+[^/]*\//, `/upload/${transform}/`);
    }
    return url.replace('/upload/', `/upload/${transform}/`);
  }
  return url;
}

/**
 * Service upload ảnh trực tiếp lên Cloudinary (Unsigned Upload)
 * @param {File} file - Tệp ảnh được chọn từ input file
 * @returns {Promise<string>} - Đường dẫn CDN URL của ảnh đã tối ưu f_auto,q_auto
 */
export async function uploadToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset || cloudName === 'demo' || cloudName === 'your-cloud-name') {
    console.warn('Cloudinary chưa được cấu hình. Đang tạo Mock URL cho ảnh...');
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Upload ảnh thất bại');
    }

    const data = await response.json();
    return optimizeCloudinaryUrl(data.secure_url, 1200);
  } catch (error) {
    console.error('Lỗi upload Cloudinary:', error);
    throw error;
  }
}
