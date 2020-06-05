// import React from 'react';
import React, { useState } from 'react';

import './App.css';

import Builder from './components/Builder';
import Previewer from './components/Previewer';

const App = () => {

  const [count, setCount] = useState(0);

  const handleButton = () => {
    setCount(count + 3);
  };

  return (
    <div className="App">
      <h1>Simon Templar</h1>
      <p>You clicked {count} times</p>
      <Builder handleButton={handleButton} />
      <Previewer />
    </div>
  );
}

export default App;
