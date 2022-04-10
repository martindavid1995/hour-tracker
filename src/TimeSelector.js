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
      moments.push({label: currTime.format('LT'), value: JSON.stringify(currTime)})
      currTime = currTime.add(step, 'minutes')
    }   
    moments.push({label: currTime.format('LT'), value: JSON.stringify(currTime)})
    return moments
}
   

class TimeSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "default",
            value: "default",
        } 
    }
 
    getValue = (name, val) => {
        let newState = this.state;
        newState = {
            name: name,
            value: val,
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
        // console.log("in TimeSelector, ",this.state.name, " holds the value ", this.state.value, "from the TimeSelector ID=",this.props.id)
        return(
            <div>
                <table class="drop">
                <td class="drop"><Drop name='from' options={getMomentRange()} sendValue={this.getValue.bind(this)}/></td>
                <td class="to">to</td>   
                <td class="drop"><Drop name='to' options={getMomentRange()} sendValue={this.getValue.bind(this)}/></td>  
                {/* <td>{this.props.id}</td> */}
                </table>
                {/* {this.showMessage()} */}
            </div>
        )
    }
} 

export default TimeSelector;
 