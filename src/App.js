import React, {Component} from "react";
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import { particlesOptions } from './ParticleOptions';
import Navigation from './components/Navigation/Navigation';
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '5f7089c95a9a46e2a37c402e60dd41fd'
});

//Load particles background from tsParticles package
const particlesInit = async (main) => {
  await loadFull(tsParticles);
};

const initialState = {
    imageUrl: '',
    input: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

calculateFaceLocation = (data) => {
  //storing data needed from Clarifai object into a variable
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //selecting the img tag in FaceRecognition component
  const image = document.getElementById('inputimage');
  //getting width & height of img
  const width = Number(image.width);
  const height = Number(image.height);
  //returning an object for facebox div dimensions according to Clarifai API
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});

  app.models.predict(
    // Clarifai.FACE_DETECT_MODEL
    {id: "a403429f2ddf4b49b307e318f00e528b",
    version: "34ce21a40cc24b6b96ffee54aabff139"}, this.state.input)
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(entryCount => {
          this.setState(Object.assign(this.state.user, {entries: entryCount}))
        })
        .catch(err => console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
}

onRouteChange = (route) => {
  if (route === 'home'){
    this.setState({isSignedIn: true});
  } else {
    this.setState(initialState);
  }
  this.setState({route: route});
}

  render (){
    const {imageUrl, box, route, isSignedIn} = this.state;
    const {name, entries} = this.state.user;
    return (
      <div>
        <Particles 
          className="particles" 
          id="tsparticles" 
          init={particlesInit} 
          options={particlesOptions} 
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'home' 
          ? <>
          <Logo />
          <Rank userName={name} userEntries={entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} /> 
          <FaceRecognition box={box} imageUrl={imageUrl} /> 
          </>
          : (
            route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
       }
      </div>
    );
  }
}

export default App;


