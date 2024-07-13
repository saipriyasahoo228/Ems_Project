import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import imageCompression from 'browser-image-compression';

const Imagecompression = ({ setCompressedImageBase64 }) => {
  const [compressedFile, setCompressedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setCompressedFile(compressedFile);
        convertToBase64(compressedFile);
      } catch (error) {
        setError('Error compressing the image');
        console.error(error);
      }
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result.split(',')[1];
      setCompressedImageBase64(base64data);
      console.log('Base64 Encoded Image:', base64data);
    };
    reader.onerror = () => {
      setError('Error converting the image to base64');
    };
  };

  return (
    <Box sx={{ padding: 4, border: '1px solid lightgrey', borderRadius: '8px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-button-file">
        <Button variant="contained" component="span" sx={{ margin: 1 }}>
          Select Image
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log('Image ready for upload')}
        disabled={!compressedFile}
        sx={{margin:1}}
      >
        Upload Image
      </Button>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Imagecompression;
