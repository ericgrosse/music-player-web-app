import React from 'react';
import Dropzone from 'react-dropzone';

class DropzoneAudio extends React.Component {
  onDrop = (files) => {
    const { handleDrop } = this.props;
    handleDrop(files);
  };

  render() {
    const { files } = this.props;

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
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
  }
}

export default DropzoneAudio;
