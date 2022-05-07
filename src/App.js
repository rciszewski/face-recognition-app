import React, {Component} from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/InputForm/ImageLinkForm';
import './App.css';

class App extends Component {
  render (){
    return (
      <div>
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
