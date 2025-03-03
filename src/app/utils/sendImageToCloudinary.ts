import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
// import config from '../config';
import fs from 'fs';
import config from '../config';

export const sendImageToCloudinary = async (imageName: string, file: any) => {
  if (file) {
    // Configuration
    cloudinary.config({
      cloud_name: config.cloudinary_cloud_name,
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
    });

    // console.log(file.path);
    // console.log(imageName);

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: imageName,
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);

    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File is deleted.');
      }
    });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(imageName, {
      fetch_format: 'auto',
      quality: 'auto',
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(imageName, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);

    return autoCropUrl;
  }
};

// import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import multer from 'multer';
// import config from '../config';

// cloudinary.config({
//   cloud_name: config.cloudinary_cloud_name,
//   api_key: config.cloudinary_api_key,
//   api_secret: config.cloudinary_api_secret,
// });

// export const sendImageToCloudinary = (
//   imageName: string,
//   path: string,
// ): Promise<Record<string, unknown>> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: imageName.trim() },
//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result as UploadApiResponse);
//         // delete a file asynchronously
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('File is deleted.');
//           }
//         });
//       },
//     );
//   });
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
