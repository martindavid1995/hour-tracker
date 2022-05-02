import React, { useEffect } from "react"
import TimeSelector from "./TimeSelector"
import { useState } from "react"


const anchorDate = new Date("2022-02-19"); //Must be a date that exists as a previous start to a pay period. Make this variable and inputtable
const anchorDay = "Sat";
const lengthOfPayPeriod = 14; 
const requiredHours = 10;
 
function addDays (today, days){
   const date = new Date(today);
   date.setDate(date.getDate() + days);
   return date; 
} 

const today = new Date()

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
    var ranges = [] //We are going to hold 100 ranges
      
    var currRange = getRange(anchorDate);
    ranges.push(currRange);    

    for (var i = 1; i <= 100; i++)
      ranges.push(getRange(getLastDate(ranges.at(i-1)))); 
          
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
  console.log("Didn't find a valid range for today.")
}

// Gets a range of dates in standard "Date" format
function getRange(startDate) {
  if (startDate == null)
    startDate = anchorDate;
  
  var dates = new Array(lengthOfPayPeriod);

  for (var i = 0; i < dates.length; i++){
    dates[i] = addDays(startDate, (i + 1));
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

function getPayPeriodRange(n){
  var result = []
  for (var i = 0; i < n; i++){
      result[i] = i
  }
  return result
}


function getResultString(hoursWorked, hoursReqd){
  const diff = hoursReqd-hoursWorked
  if (diff > 0)
    return "You are under "+diff+" hours " + String.fromCodePoint(0x1F612)
  else if (diff < 0)
    return "You are over "+-diff+" hours" + String.fromCodePoint(0x1F604)
  else
    return "Your hours are perfect " + String.fromCodePoint(0x2705)
}


function HourInput () {
    const diffs = Array(14)
    const [hoursWorked, setHoursWorked] = useState(0)
    const [hoursReqd, setHoursReqd] = useState(0)
    

    const pushHours = (diff, idx) => {
        if (diff !== null && diff !== 'X'){
            diffs[idx] = diff  
        } else {
            diffs[idx] = 0
        }
        console.log()
        useEffect(() => {
          setHoursWorked(diffs.reduce((a,b) => a + b, 0))
        })
        
    } 

    const keys = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
    const range = getRelevantRange();
    
    return ( 
        <div>
          <table>
            <tbody>
              {
                keys.map((index) => {
                  return (
                    <tr>
                      <td><TimeSelector key={JSON.stringify(range[index])} id={index} sendDiff={pushHours} label={parseDate(range[index])}/></td>
                    </tr>
                  )
                })   
              }
              <tr>
                <td>You have worked a total of {hoursWorked} hours this pay-period</td>
              </tr>
              <tr>
                {getResultString(hoursWorked, hoursReqd)}
              </tr>
            </tbody>
          </table>
        </div>
          
      );




}

export default HourInput

/* <input
  type="text"
  pattern="[0-9]*"
  value={hoursReqd}
  onChange={(e) => 
    setHoursReqd((v) => (e.target.validity.valid ? e.target.value : v))
  } /> */