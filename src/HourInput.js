import React, { useState } from "react"
import TimeRange from 'react-time-range'
import moment from "moment";


const anchorDate = new Date("2022-02-19"); //Must be a date that exists as a previous start to a pay period. Make this variable and inputtable
const anchorDay = "Sat"; //Make this variable and inputtable
const lengthOfPayPeriod = 14; //Make this variable and inputtable
 
 
Date.prototype.addDays = function (days){
   const date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date; 
} 

const today = new Date().addDays(0)

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
    var ranges = new Array(); //We are going to hold 100 ranges
      
    var currRange = getRange(anchorDate);
    ranges.push(currRange);    

    for (var i = 1; i <= 100; i++)
      ranges.push(getRange(getLastDate(ranges.at(i-1)))); 
       
    // for (var j = 0; j < ranges.length; j++)
    //   console.log(makeRangeReadable(ranges.at(j)))
    
    return ranges;
}
 
function getRelevantRange(){
  // const today = new Date();
  var ranges = generateRanges();
  for (var i = 0; i < ranges.length; i++){
     var rng = ranges.at(i);
     for (var j = 0; j < rng.length; j++){
       if (parseDate(today) === parseDate(rng[j])){
        //  console.log("Today falls within pay period: "+makeRangeReadable(rng))
         return rng;
       }
     } 
  }
  console.log("Didn't find a valid range for today")
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
      super(props)
    }

    state = {
      startTime: moment(), 
      endTime: moment()
    };

    returnFunctionStart = event => {
      this.setState({startTime: event.startTime});
    }

    returnFunctionEnd = event => {
      this.setState({endTime: event.endTime});
    }

    getTR(){
      return <TimeRange 
      onStartTimeChange = {this.returnFunctionStart}
      onEndTimeChange = {this.returnFunctionEnd}
      startMoment = {moment("2017-03-13 06:00")}
      endMoment = {moment("2017-03-13 21:00")}
      startLabel = ""
      endLabel = " to "
      showErrors = {true}
    />
    }

    render() {
      const range = getRelevantRange();
      // const today = new Date();
      var d = new Array(range.length);
      var marker = new Array(range.length);
      for (var i = 0; i < range.length; i++){
        d[i] = parseDate(range.at(i));
        if (parseDate(range.at(i)) === parseDate(today)){ //can probably get rid of the parseDate()s here
          marker[i] = ">"; //maybe go backwards here and tag all of the ones before it
        }
      }      
    

      return (
          <table>
          <tr>
            <td class = "arrow">{marker[0]}</td>
            <td class = "date">{d[0]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[1]}</td>
            <td class = "date">{d[1]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[2]}</td>
            <td class = "date">{d[2]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[3]}</td>
            <td class = "date">{d[3]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[4]}</td>
            <td class = "date">{d[4]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[5]}</td>
            <td class = "date">{d[5]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[6]}</td>
            <td class = "date">{d[6]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[7]}</td>
            <td class = "date">{d[7]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
           <td class = "arrow">{marker[8]}</td>
            <td class = "date">{d[8]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[9]}</td>
            <td class = "date">{d[9]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[10]}</td>
            <td class = "date">{d[10]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[11]}</td>
            <td class = "date">{d[11]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[12]}</td>
            <td class = "date">{d[12]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          <tr>
            <td class = "arrow">{marker[13]}</td>
            <td class = "date">{d[13]}</td>
            <td class = "time">{this.getTR()}</td>
          </tr>
          </table>
      );
    }
  }