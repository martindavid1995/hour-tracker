import React, { useState } from "react"
import TimeRange from 'react-time-range'
import TimeSelector from './TimeSelector'
import moment from "moment";
import DropDown from "./TimeSelector";


const anchorDate = new Date("2022-02-19"); //Must be a date that exists as a previous start to a pay period. Make this variable and inputtable
const anchorDay = "Sat";
const lengthOfPayPeriod = 14; 
 
 
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
    
    render() {
      const range = getRelevantRange();
      var d = new Array(range.length);
      var marker = new Array(range.length);
      for (var i = 0; i < range.length; i++){
        d[i] = parseDate(range.at(i)); 
        if (parseDate(range.at(i)) === parseDate(today)){ 
          marker[i] = ">"; //maybe go backwards here and tag all of the ones before it
        }
      }       
    

    //   <td class = "time">
    //   <TimeRange 
    //   onStartTimeChange = {this.returnFunctionStart}
    //   onEndTimeChange = {this.returnFunctionEnd}
    //   startMoment = {this.state.startTime}
    //   endMoment = {this.state.endTime}
    //   startLabel = ""
    //   endLabel = " to "
    //   showErrors = {true}/> 
    //   </td>



      return ( 
          <table>
          <tr>
            <td class = "arrow">{marker[0]}</td>
            <td class = "date">{d[0]}</td>
            <td class = "time"><TimeSelector /></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[1]}</td>
            <td class = "date">{d[1]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[2]}</td>
            <td class = "date">{d[2]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[3]}</td>
            <td class = "date">{d[3]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[4]}</td>
            <td class = "date">{d[4]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[5]}</td>
            <td class = "date">{d[5]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[6]}</td>
            <td class = "date">{d[6]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[7]}</td>
            <td class = "date">{d[7]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
           <td class = "arrow">{marker[8]}</td>
            <td class = "date">{d[8]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[9]}</td>
            <td class = "date">{d[9]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[10]}</td>
            <td class = "date">{d[10]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[11]}</td>
            <td class = "date">{d[11]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[12]}</td>
            <td class = "date">{d[12]}</td>
            <td class = "time"></td>
          </tr>
          <tr>
            <td class = "arrow">{marker[13]}</td>
            <td class = "date">{d[13]}</td>
            <td class = "time"></td>
          </tr>
          </table>
      );
    }
  }