import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

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
    setErrorMessage(''); // Clear any previous error message
  
    try {
      const response = await axios.post(
        'https://dahuli-tool.vercel.app/api/calculate/sku',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Expecting blob but handling JSON too
        }
      );
  
      // Check if the response is a JSON
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          const json = JSON.parse(text);
          console.log(json); // This is your JSON object { result: 'Fail', message: 'Thiếu file TSV' }
          setErrorMessage(json.message); // Display the message
        };
        reader.readAsText(response.data); // Read blob data as text
      } else {
        // Handle blob data, e.g., file download
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
      }
    } catch (error) {
      console.error('Error uploading files:', error);
  
      if (error.response && error.response.data) {
        // Try to read the error response if it's a blob
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          try {
            const json = JSON.parse(text);
            setErrorMessage(json.message || 'An error occurred');
          } catch (e) {
            setErrorMessage('An unexpected error occurred.');
          }
        };
        reader.readAsText(error.response.data);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };
  

  return (
    <div>
      <h3>Tool COGS of DAHULI</h3>
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

      {/* Display error message if exists */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
