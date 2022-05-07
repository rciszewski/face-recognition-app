import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = () => {
  return (
    <div>
      <p className="center black f3">
      {'This magic brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className="center">
        <div className="pa4 br3 form center shadow-5">
          <input placeholder='Url link here...' className="f4 pa2 w-70 center" type="text" />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;