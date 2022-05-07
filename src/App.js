import React, {Component} from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import { particlesOptions } from './ParticleOptions';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/InputForm/ImageLinkForm';
import './App.css';

const particlesInit = async (main) => {
  console.log(main);
  await loadFull(tsParticles);
};

const particlesLoaded = (container) => {
  console.log(container);
};

class App extends Component {
  render (){
    return (
      <div>
        <Particles 
        className="particles" 
        id="tsparticles" 
        init={particlesInit} 
        loaded={particlesLoaded}
        options={particlesOptions} 
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* 
        <FaceRecognition />} */}
      </div>
    );
  }
}

export default App;
