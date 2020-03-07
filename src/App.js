import React from "react";
import "./App.css";
import logo from "./logo.svg";

const App = () => {
  const speak = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = "Welcome to my first Progressive Web App!";
    msg.volume = 0.1;
    msg.voice = speechSynthesis
      .getVoices()
      .filter(voice => voice.name === "Thomas")[0];
    speechSynthesis.speak(msg);
    console.log(msg);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          First PWA (yet only implementing text-to-speech). More to come...
        </p>
        <button className="speak-button" onClick={speak}>
          Enable text-to-speech
        </button>
      </header>
    </div>
  );
};

export default App;
