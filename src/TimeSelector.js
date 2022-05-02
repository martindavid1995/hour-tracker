import React, { useState } from 'react'
import Drop  from './Drop';
import moment from 'moment';

const startTime = moment('06:00 am', 'hh:mm a');
const endTime = moment('09:00 pm', 'hh:mm a')
var step = 30
const today = new Date()

function getMinsLeft(currTime) {
  var duration = moment.duration(endTime.diff(currTime))
  return parseInt(duration.asMinutes(),10)
}

function getMomentRange(){ 
    var moments = []
    var currTime = startTime.clone()

    while(getMinsLeft(currTime) > 0){
      moments.push({label: currTime.format('LT'), moment: currTime.clone()})
      currTime = currTime.add(step, 'minutes')
    }   
    moments.push({label: currTime.format('LT'), moment: currTime.clone()})
    return moments
}
   
function TimeSelector({id, sendDiff, label}) {
    // fromValue, toValue are moments
    const [fromValue, getFromValue] = useState("undef")
    const [toValue, getToValue] = useState("undef")
    const diff = getDifference()

    const handleClick = (val, name) => {
        if (name === '0')
            getFromValue(val)
        else
            getToValue(val)
    }

    function showValues() { 
        console.log("[",id,"]: ",fromValue.label," -> ", toValue.label," diff = ", diff)
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
            <table>
                <tbody>
                <tr>
                    <td className='fit'>{label}</td>
                    <td><Drop name='0' options={getMomentRange()} sendValue={handleClick} isDisabled={false}/></td>
                    <td>to</td>   
                    <td><Drop name='1' options={getMomentRange()} sendValue={handleClick} isDisabled={false}/></td>
                    <td className='fit'>{getDifference()}</td>
                </tr> 
                </tbody>
            </table>
            {sendDiff(diff, id)}
        </div>
    )
    
} 

export default TimeSelector;