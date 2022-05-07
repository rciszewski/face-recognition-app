import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} className={'br2 shadow-4 tilt'} style={{height: '150px', width: '150px'}}>
        <div className="pa3" style={{display: 'flex', justifyContent: 'center'}}>
          <img style={{paddingTop: '6px'}} alt="logo" src={brain}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;