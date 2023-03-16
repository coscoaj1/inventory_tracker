import config from "./config";
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
import path from "path";

const region = config.REGION;
const accessKeyId = config.ACCESS_KEY_ID;
const secretAccessKey = config.SECRET_ACCESS_KEY;
const bucketName = config.BUCKET_NAME;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//uploads a file to s3, no download function needed since
//setting the s3 bucket 'get object' to public access

function uploadFile(file: string, key: Express.Multer.File): Promise<any> {
  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: key.filename,
  };

  return s3.upload(uploadParams).promise();
}

// function deleteFile(deletedRow) {
//   const deleteParams = { Bucket: bucketName, Key: deletedRow.awskey };

//   return s3.deleteObject(deleteParams).promise();
// }

exports.uploadFile = uploadFile;
// exports.deleteFile = deleteFile;
