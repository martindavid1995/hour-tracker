import './App.css';
import React from 'react';
import HourInput from './HourInput';

function App() {
  return (
    <div>
      <h1>This is hour-tracker. It is not done... not even close {String.fromCodePoint(0x1F62D)}</h1>
      <HourInput />
    </div>
  );
}

export default App;
 