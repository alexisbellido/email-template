import React from 'react';
import './App.css';

import TemplateBuilder from './components/TemplateBuilder';
import Previewer from './components/Previewer';

const App = () => {
  return (
    <div className="App">
      <TemplateBuilder />
      <Previewer />
    </div>
  );
}

export default App;
