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
    constructor(props){
        super(props);
        this.state = {
            name: "default",
            value: "default"
        } 
    }
 
    getValue = (id, val) => {
        // console.log("getValue() called with",id," ",val)
        let newState = this.state;
        newState = {
            name: id,
            value: val
        }
        this.setState(newState)
    }

    showMessage = () => {
        if(this.state)  {
            return(
                <div>
                    <p>{`${this.state.name} selected ${this.state.value}!`}</p>
                </div>
            )
        }
        return false;
    } 

    render = () => {
        // console.log("Rendering in TimeSelector")
        console.log("in TimeSelector, ",this.state.name, " holds the value ", this.state.value)
        return(
            <div>
                <table class="drop">
                <td class="drop"><Drop name='from' options={getMomentRange()} sendValue={this.getValue.bind(this)}/></td>
                <td class="to">to</td>   
                <td class="drop"><Drop name='to' options={getMomentRange()} sendValue={this.getValue.bind(this)}/></td>  
                </table>
                {/* {this.showMessage()} */}
            </div>
        )
    }
}

export default TimeSelector;
 