import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

    setLoading(true); // Set loading to true when starting the request

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

      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'download.zip'; // Default file name

      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches && matches.length === 2) {
          fileName = matches[1];
        }
      }

      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // File name based on your backend
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('File downloaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files and download the result');
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div>
      <h2>Upload Multiple Files</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={loading} // Disable input while loading
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {loading && <p>Loading, please wait...</p>} {/* Loading message */}

      {selectedFiles.length > 0 && !loading && (
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
