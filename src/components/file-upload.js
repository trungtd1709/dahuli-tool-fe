import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files first!');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(
        'https://dahuli-tool.vercel.app/api/calculate/sku',
        // 'http://localhost:3000/api/calculate/sku',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Important for downloading binary data
        }
      );

      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cogs.xlsx'); // File name based on your backend
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('File downloaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files and download the result');
    }
  };

  return (
    <div>
      <h2>Upload Multiple Files</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>

      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
