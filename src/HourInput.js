import React, { useEffect } from "react"
import TimeSelector from "./TimeSelector"
import { useState } from "react"
import { round } from './Utils'


const anchorDate = new Date("2022-02-19"); //Must be a date that exists as a previous start to a pay period. Make this variable and inputtable
// const anchorDay = "Sat";
const lengthOfPayPeriod = 14; 
 
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

function getHoursTotal(hoursWorked, wk1, wk2){
    var sum = hoursWorked
    wk1 = parseFloat(wk1)
    wk2 = parseFloat(wk2)
   
    if (!isNaN(wk1)){
      sum += wk1
    } 
    if (!isNaN(wk2)){
      sum += wk2
    }
    return round(sum,2)
}


function getResultString(hoursWorked, hoursReqd){
  const diff = round(hoursReqd-hoursWorked,2)
  if (diff > 0)
    return "You are short "+diff+" hours " + String.fromCodePoint(0x1F612)
  else if (diff < 0)
    return "You are over "+-diff+" hours " + String.fromCodePoint(0x1F604)
  else
    return "Your hours are perfect " + String.fromCodePoint(0x2705)
}

const selectors = genSelectors()

function genSelectors () {
  const rng = getRelevantRange()
  var selectors = []
  for (var i = 0; i < lengthOfPayPeriod; i++){
   
    selectors[i] = {
      id: i,
      label: parseDate(rng[i])
    }
  }
  return selectors
}

function HourInput () {
    const diffs = new Array(lengthOfPayPeriod).fill(0)
    const [hoursWorked, setHoursWorked] = useState(0)
    const [hoursReqd, setHoursReqd] = useState(85)
    const [wk1, setWk1] = useState(0)
    const [wk2, setWk2] = useState(0)

    const pushHours = (diff, idx) => {
        if (diff !== null && diff !== 'X'){
            diffs[idx] = diff  
        } else {
            diffs[idx] = 0
        }
        useEffect(() => {
          setHoursWorked(diffs.reduce((a,b) => a + b, 0))
        })   
    } 
    
    function reset(){
      setHoursWorked(0)
      setHoursReqd(85)
      setWk1(0)
      setWk2(0)
    }
    
    return ( 
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  Hours required per period {     }
                  <input
                    className="input"
                    type="text"
                    pattern="[0-9]*"
                    value={hoursReqd}
                    onChange={(e) => 
                      setHoursReqd((v) => (e.target.validity.valid ? e.target.value : v))
                    } /> 
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>
                  Week 1 hours: {     }
                  <input 
                    className="input"
                    type="text"
                    pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                    value={wk1}
                    onChange={(e) => 
                      setWk1((v) => (e.target.validity.valid ? e.target.value : v))
                    } /> 
                </td>
                <td>
                  Week 2 hours: {     }
                  <input 
                    className="input"
                    type="text"
                    pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                    value={wk2}
                    onChange={(e) => 
                      setWk2((v) => (e.target.validity.valid ? e.target.value : v))
                    } /> 
                </td>
              </tr>

            </tbody>
          </table>

         

          <table>
            <tbody>
              {
                selectors.map((selector,index) => {
                  return (             
                     <tr key={selector.id +":"+ index}>
                       <td>
                         <TimeSelector id={selector.id} sendDiff={pushHours} label={selector.label}/>
                       </td>
                     </tr>               
                  )
                })   
              }
              <tr>
                <td>You have worked a total of {getHoursTotal(hoursWorked, wk1, wk2)} hours this pay-period</td>
              </tr>
              <tr>
                <td>{getResultString(getHoursTotal(hoursWorked, wk1, wk2), hoursReqd)}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => reset()}>
            Reset
          </button>
        </div>
          
      );




}

export default HourInput

