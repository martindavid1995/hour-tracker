import React, {useState} from "react"


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

function PayPeriodList(){
 
    const range = getRelevantRange();
    var d = new Array(range.length);
    var marker = new Array(range.length);
    for (var i = 0; i < range.length; i++){
      d[i] = parseDate(range.at(i)); 
      if (parseDate(range.at(i)) === parseDate(today)){ 
        marker[i] = ">"; //maybe go backwards here and tag all of the ones before it  
      }
    }        

    const diffs = Array(14)
    const [hoursWorked, setHoursWorked] = useState(0)

    const pushHours = (diff, idx) => {
        if (diff !== null && diff !== 'X'){
            diffs[idx] = diff  
        } else {
            diffs[idx] = 0
        }
        setHoursWorked(diffs.reduce((a,b) => a + b, 0))
    } 
    
    const elements = getPayPeriodRange(14)

    return ( 
      <div>
        <table className="list">
          <tbody> 
            {
              elements.map((index) => {
                return (
                  <tr>
                    <td>{marker[index]}</td>
                    <td>{d[index]}</td> 
                  </tr>
                )
              })   
            }
          </tbody>
        </table>
      </div>
        
    );
}

export default PayPeriodList

