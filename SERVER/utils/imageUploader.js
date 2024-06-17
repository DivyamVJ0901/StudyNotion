const cloudinary = require('cloudinary').v2

exports.uploadImageToCloudinary = async (folder, file, quality, height) => {
  const options = { folder }
  if (height) {
    options.height = height
  }
  if (quality) {
    options.quality = quality
  }
  options.resource_type = 'auto'
  // console.log("Options" , options)
  return await cloudinary.uploader.upload(file.tempFilePath, options)
}
  