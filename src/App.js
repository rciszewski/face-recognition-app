import React, {Component} from "react";
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import { particlesOptions } from './ParticleOptions';
import Navigation from './components/Navigation/Navigation';
import SignIn from "./components/SignIn/SignIn";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '5f7089c95a9a46e2a37c402e60dd41fd'
});

const particlesInit = async (main) => {
  console.log(main);
  await loadFull(tsParticles);
};

const particlesLoaded = (container) => {
  console.log(container);
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},

    }
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});

  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
}

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
        <SignIn />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;


