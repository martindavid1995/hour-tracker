import React, { useState } from 'react'
import Drop  from './Drop';
import moment from 'moment';

const startTime = moment('06:00 am', 'HH:mm a');
const endTime = moment('09:00 pm', 'HH:mm a')
var step = 30

function getMinsLeft(currTime) {
  var duration = moment.duration(endTime.diff(currTime))
  return parseInt(duration.asMinutes())
}

function getMomentRange(){ 
    var moments = []
    var currTime = startTime.clone()

    while(getMinsLeft(currTime) > 0){
      moments.push({label: currTime.format('LT'), value: currTime})
      currTime = currTime.add(step, 'minutes')
    }   
    moments.push({label: currTime.format('LT'), value: currTime})

    return moments
}

class TimeSelector extends React.Component{
    render = () => {
        return(
            <table class="drop">
                <td class="drop"><Drop key={"a"} options={getMomentRange()}/></td>
                <td class="to">to</td>   
                <td class="drop"><Drop key={"b"} options={getMomentRange()}/></td>  
            </table>
        )
    }
}

export default TimeSelector;
 