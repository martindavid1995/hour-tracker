import './App.css';
import React from 'react';
import PayPeriodList from './PayPeriodList.js';
import HourInput from './HourInput';

function App() {
  return (
    <div class="center">
      <table className="container" class="center">
        <tbody>
        <tr> 
          <td class="center"><PayPeriodList /></td>
          <td class="center"><HourInput /></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
 