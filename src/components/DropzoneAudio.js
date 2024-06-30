import React from 'react';
import Dropzone from 'react-dropzone';

const DropzoneAudio = ({ files, handleDrop }) => {
  const onDrop = (acceptedFiles) => {
    handleDrop(acceptedFiles);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Try dropping some files here, or click to select files to upload.</p>
          </div>
        )}
      </Dropzone>

      <aside>
        <h2>Dropped files</h2>
        <ul>{files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}</ul>
      </aside>
    </div>
  );
};

export default DropzoneAudio;
