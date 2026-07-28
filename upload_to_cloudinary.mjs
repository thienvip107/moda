import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLOUD_NAME = 'ydxroi9a';
const UPLOAD_PRESET = 'modalaichau';
const IMG_DIR = path.join(__dirname, 'public', 'assets', 'img');

async function uploadFile(filePath) {
  const fileName = path.basename(filePath);
  console.log(`Đang upload: ${fileName}...`);

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append('file', blob, fileName);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(`❌ Upload thất bại ${fileName}:`, err.error?.message || err);
      return null;
    }

    const data = await res.json();
    let url = data.secure_url;
    if (url.includes('/upload/') && !url.includes('f_auto')) {
      url = url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    console.log(`✅ Thành công: ${fileName} -> ${url}`);
    return url;
  } catch (err) {
    console.error(`❌ Lỗi kết nối ${fileName}:`, err.message);
    return null;
  }
}

async function main() {
  const files = fs.readdirSync(IMG_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });

  console.log(`Tìm thấy ${files.length} ảnh cần upload lên Cloudinary...\n`);
  const mapping = {};

  for (const file of files) {
    const fullPath = path.join(IMG_DIR, file);
    const url = await uploadFile(fullPath);
    if (url) {
      mapping[`/assets/img/${file}`] = url;
    }
  }

  console.log('\n====================================');
  console.log('KẾT QUẢ MAPPING CLOUDINARY URLS:');
  console.log(JSON.stringify(mapping, null, 2));

  fs.writeFileSync(path.join(__dirname, 'cloudinary_mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('\nĐã lưu kết quả vào file client/cloudinary_mapping.json');
}

main();
