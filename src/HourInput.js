import React, { useEffect } from "react"
import TimeSelector from "./TimeSelector"
import { useState } from "react"


const anchorDate = new Date("2022-02-19"); //Must be a date that exists as a previous start to a pay period. Make this variable and inputtable
const anchorDay = "Sat";
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
  const diff = hoursReqd-(hoursWorked)
  if (diff > 0)
    return "You are short "+diff+" hours " + String.fromCodePoint(0x1F612)
  else if (diff < 0)
    return "You are over "+-diff+" hours " + String.fromCodePoint(0x1F604)
  else
    return "Your hours are perfect " + String.fromCodePoint(0x2705)
}




// const selectors = [
//   { 
//     id: 0,
//     name: "first",
//     label: parseDate(range[0])
//   },
//   {
//     id: 1,
//     name: "second",
//     label: parseDate(range[1])
//   },
//   {
//     id: 2,
//     name: "third",
//     label: parseDate(range[2])
//   },
//   {
//     id: 3,
//     name: "fourth",
//     label: parseDate(range[3])
//   }
// ]


function HourInput () {
    const diffs = Array(14)
    const [hoursWorked, setHoursWorked] = useState(0)
    const [hoursReqd, setHoursReqd] = useState(85)
    const range = getRelevantRange();
    const selectors = [
      {
        id: "01",
        label:parseDate(range[0])
      },
      {
        id: "02",
        label:parseDate(range[1])
      },
      {
        id: "03",
        label:parseDate(range[2])
      },
      {
        id: "04",
        label:parseDate(range[3])
      },
      {
        id: "05",
        label:parseDate(range[4])
      },
      {
        id: "06",
        label:parseDate(range[5])
      },
      {
        id: "07",
        label:parseDate(range[6])
      },
      {
        id: "08",
        label:parseDate(range[7])
      },
      {
        id: "09",
        label:parseDate(range[8])
      },
      {
        id: "10",
        label:parseDate(range[9])
      },
      {
        id: "11",
        label:parseDate(range[10])
      },
      {
        id: "12",
        label:parseDate(range[11])
      },
      {
        id: "13",
        label:parseDate(range[12])
      },
      {
        id: "14",
        label:parseDate(range[13])
      }
    ]
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
              {
                selectors.map((selector,index) => {
                  return (

                   <div key={selector.id + index}>
                     <tr>
                       <td>
                         <TimeSelector id={selector.id} sendDiff={pushHours} label={selector.label}/>
                       </td>
                     </tr>
                   </div>              
                  )
                })   
              }
              <tr>
                <td>You have worked a total of {hoursWorked} hours this pay-period</td>
              </tr>
              <tr>
                <td>{getResultString(hoursWorked, hoursReqd)}</td>
              </tr>
            </tbody>
          </table>
        </div>
          
      );




}

export default HourInput


// <tr>
// <td><TimeSelector key={selector.name+"-"+index} id={selector.id} sendDiff={pushHours} label={selector.label}/></td>
// {/* {index} */}
// </tr>