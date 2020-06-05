import React from 'react';
import logo from './logo.svg';
import './App.css';

import TemplateBuilder from './components/TemplateBuilder';
import Handlebars from "handlebars";
import Previewer from './components/Previewer';

function App() {
  const template = Handlebars.compile("Hello, I am {{name}}");
  console.log(template({name: "Mickey"}));
  return (
    <div className="App">
      <TemplateBuilder />
      <Previewer />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Test 5
        </a>
      </header>
    </div>
  );
}

export default App;
