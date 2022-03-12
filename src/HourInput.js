import React, { useState } from "react"
import TimePicker from 'react-time-picker'

// Construct some way of advancing from this date for like idk, 100 ranges? Linked list?
// Then find todays date and find the closest date before it that is in our list
// 
// "2022-02-19"
const anchorDate = new Date("2022-02-19"); //Must be a date that exists as a previous start to a pay period. Make this manipulatable. 
const anchorDay = "Sat"; //Make this variable and inputtable
const lengthOfPayPeriod = 14;

Date.prototype.addDays = function (days){
   const date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date;
}

function parseDate(date){
    var fmt = "";
    var spl = date.toString().split(" ");
    fmt += spl[0] + " " + spl[1] + " " + spl[2];
    return fmt;
}

function makeRangeReadable(range){
  return (parseDate(range[0]) + " to " + parseDate(range[range.length - 1]) + "\n")
}

function getLastDate(range){
  return range[range.length - 1];
}

function generateRanges(){
    var ranges = new Array(); //We are going to hold 300 ranges
      
    var currRange = getRange(anchorDate);
    ranges.push(currRange);    

    for (var i = 1; i <= 300; i++)
      ranges.push(getRange(getLastDate(ranges.at(i-1)))); 
       
    // for (var j = 0; j < ranges.length; j++)
    //   console.log(makeRangeReadable(ranges.at(j)))
    
    return ranges;
}

// Gets a range of dates in standard "Date" format
function getRange(startDate) {
  if (startDate == null)
    startDate = anchorDate;
  
  var dates = new Array(lengthOfPayPeriod);

  for (var i = 0; i < dates.length; i++){
    dates[i] = startDate.addDays(i + 1);
  }

  return dates;
}
// Format a range into displayable format
function formatRange(range){
  var dates = new Array(range.length)
  for (var i = 0; i < range.length; i++){
    dates[i] = parseDate(range[i]);
  }

  return dates;
}

function getDates(anchor){
  return formatRange(getRange(anchor))
}

export default class HourInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
    

    render() {
      const d = getDates(anchorDate);
      generateRanges();
      return (
        <form onSubmit={this.handleSubmit}>
          <table>
          <tr>
            <td>{d[0]}</td>
            <td>
              <label>
                <input type="text" value={this.state.value} onChange={this.handleChange} /> 
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[1]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[2]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[3]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[4]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[5]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[6]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[7]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[8]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[9]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[10]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[11]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[12]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[13]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          </table>
        </form>
      );
    }
  }