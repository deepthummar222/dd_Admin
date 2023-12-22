import React, { useState } from 'react';
import AWS from "aws-sdk"
import './DropzoneStyles.css'

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const S3_BUCKET = "dating-app-admin-panel/emoji";
    const REGION = "us-east-1";
    AWS.config.update({
      accessKeyId: "AKIA6RS5PDR3U2RY63XW",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const params = {
      ACL: 'public-read',
      Body: selectedFile,
      Bucket: S3_BUCKET,
      Key:selectedFile.name,
      ContentType: selectedFile.type
    };

    s3.putObject(params)
      .on('httpUploadProgress', (evt) => {
      })
      .send((err) => {
        if (err) console.log(err)
      })

  };
  return (
    <div>
      <div>
        <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
        <form className="form-container" encType="multipart/form-data">
          <div className="upload-files-container">
            <div className="drag-file-area">
              <span className="material-icons-outlined upload-icon"> file_upload </span>
              <h3 className="dynamic-message"> select Emojis </h3>
              <label className="label"> or <span className="browse-files"> <input type="file" className="default-file-input" onChange={handleFileChange} /> <span className="browse-files-text">browse file</span> <span>from device</span> </span> </label>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UploadImage;
