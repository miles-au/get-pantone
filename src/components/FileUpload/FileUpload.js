import React from 'react';

const FileUpload = ({onUpload,picURL}) => {
  return(
    <div className="fl w-100 w-50-ns pa2">
      <div className="bg-white pv4 br3">
        <h3>Upload a picture of a product</h3>
        <input type="file" onChange={onUpload} />
        <img className="w-90 mt2" alt="" src={picURL} />
      </div>
    </div>
  )
}

export default FileUpload;