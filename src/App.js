import React, {Component} from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
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
        url="http://foo.bar/particles.json" 
        init={particlesInit} 
        loaded={particlesLoaded} 
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
