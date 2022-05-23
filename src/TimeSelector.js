import React, { useState } from 'react'
import Drop  from './Drop';
import moment from 'moment';


const startTime = moment('06:00 am', 'hh:mm a');
const endTime = moment('10:00 pm', 'hh:mm a')
var step = 30


function getMinsLeft(currTime) {
  var duration = moment.duration(endTime.diff(currTime))
  return parseInt(duration.asMinutes(),10)
}

function getMomentRange(){ 
    var moments = []
    var currTime = startTime.clone()

    while(getMinsLeft(currTime) > 0){
      moments.push({label: currTime.format('LT'), value: currTime.clone()})
      currTime = currTime.add(step, 'minutes')
    }   
    moments.push({label: currTime.format('LT'), value: currTime.clone()})
    return moments
}

function parseDiff(diff){
    if (diff !== null && diff !== 'X'){
        return diff
    }else if (diff != null){
        return String.fromCodePoint(0x274c)
    }
}
   
function TimeSelector({id, sendDiff, label}) {
    // fromValue, toValue are moments
    const [fromValue, getFromValue] = useState("undef")
    const [toValue, getToValue] = useState("undef")
    const diff = getDifference()
    const opts = getMomentRange()

    const handleClick = (val, name) => {
        if (name === '0')
            getFromValue(val)
        else
            getToValue(val)
    }
    
    function getDifference(){
        if (fromValue === "undef" || toValue === "undef"){
            return null
        } 
    
        if (toValue.value.isBefore(fromValue.value))
            return 'X'
        
        return toValue.value.diff(fromValue.value, 'hours', true)
    }

    return(     
        <div>
            <table>
                <tbody>
                <tr>
                    <td className='fit'>{label}</td>
                    <td><Drop name='0' options={opts} sendValue={handleClick} isDisabled={false}/></td>
                    <td>to</td>   
                    <td><Drop name='1' options={opts} sendValue={handleClick} isDisabled={false}/></td>
                    <td className='fit'>{parseDiff(diff)}</td>
                </tr> 
                </tbody>
            </table>
            {sendDiff(diff, id)}
        </div>
    )
    
} 

export default TimeSelector;