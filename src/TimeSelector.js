import React, { useState } from 'react'
import Drop  from './Drop';
import moment from 'moment';

const startTime = moment('06:00 am', 'hh:mm a');
const endTime = moment('09:00 pm', 'hh:mm a')
var step = 30

function getMinsLeft(currTime) {
  var duration = moment.duration(endTime.diff(currTime))
  return parseInt(duration.asMinutes(),10)
}

function getMomentRange(){ 
    var moments = []
    var currTime = startTime.clone()

    while(getMinsLeft(currTime) > 0){
      moments.push({label: currTime.format('LT'), value: JSON.stringify(currTime), moment: currTime.clone()})
      currTime = currTime.add(step, 'minutes')
    }   
    moments.push({label: currTime.format('LT'), value: JSON.stringify(currTime), moment: currTime.clone()})
    return moments
}
   
function TimeSelector({id, sendDiff}) {
    const [fromValue, getFromValue] = useState("undef")
    const [toValue, getToValue] = useState("undef")
    const [diff, setDiff] = useState(null)
    
    const push = (val, name) => {
        if (name === '0')
            getFromValue(val)
        else
            getToValue(val) 
        
        setDiff(getDifference())
    } 

    // https://gist.github.com/bpas247/e177a772b293025e5324219d231cf32c
    // https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#render-batching-and-timing
    // https://www.sitepoint.com/implement-memoization-in-react-to-improve-performance/#:~:text=In%20the%20context%20of%20a,will%20return%20the%20cached%20result.
    // https://epicreact.dev/memoization-and-react/
    

    function showValues() { 
        console.log("[",id,"]: ",fromValue.label," -> ", toValue.label," diff = ",diff)
    } 
    
    function getDifference(){
        if (fromValue === "undef" || toValue === "undef"){
            return null
        } 
    
        if (toValue.moment.isBefore(fromValue.moment))
            return 'X'
        
        return toValue.moment.diff(fromValue.moment, 'hours', true)
    }
       
    return(     
        <div>
            <table className="drop">
                <tbody>
                    <tr>
                        <td className="drop"><Drop name='0' options={getMomentRange()} sendValue={push}/></td>
                        <td className="to">to</td>   
                        <td className="drop"><Drop name='1' options={getMomentRange()} sendValue={push}/></td>
                        <td className="valBox">{getDifference()}</td>
                    </tr>  
                </tbody>
            </table>
            {showValues()}
        </div>
    )
    
} 

export default TimeSelector;


 