import React, { useState } from 'react'
import Drop  from './Drop';
import moment from 'moment';

const startTime = moment('06:00 am', 'HH:mm a');
const endTime = moment('09:00 pm', 'HH:mm a')
var step = 30

function getMinsLeft(currTime) {
  var duration = moment.duration(endTime.diff(currTime))
  return parseInt(duration.asMinutes(),10)
}

function getMomentRange(){ 
    var moments = []
    var currTime = startTime.clone()

    while(getMinsLeft(currTime) > 0){
      moments.push({label: currTime.format('LT'), value: JSON.stringify(currTime), moment: currTime})
      currTime = currTime.add(step, 'minutes')
    }   
    moments.push({label: currTime.format('LT'), value: JSON.stringify(currTime), moment: currTime})
    return moments
}
   

function TimeSelector({id}) {
       
    const [value, getValue] = useState("undef")
    const [name, setName] = useState("undef")
    
    const push = (name, val) => {
        setName(name)
        getValue(val)
    }

    function showMessage() { 
        console.log(name," holds the value ", value.label, " in ID =",id)
    } 
       
    return( 
         
        <div>
            <table className="drop">
                <tbody>
                    <tr>
                        <td className="drop"><Drop name='from' options={getMomentRange()} sendValue={push}/></td>
                        <td className="to">to</td>   
                        <td className="drop"><Drop name='to' options={getMomentRange()} sendValue={push}/></td>
                    </tr>  
                </tbody>
            </table>
            {showMessage()}
        </div>
    )
    
} 

 


// className TimeSelector extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             name: "default",
//             value: "default",
//         } 
//     }
 
//     getValue = (name, val) => {
//         let newState = this.state;
//         newState = {
//             name: name,
//             value: val,
//         }
//         this.setState(newState) 
//     }
 
//     showMessage = () => {
//         if(this.state)  {
//             return(
//                 <div>
//                     <p>{`${this.state.name} selected ${this.state.value}!`}</p>
//                 </div>
//             )
//         }
//         return false; 
//     } 

//     render = () => { 
//         console.log("in TimeSelector, ",this.state.name, " holds the value ", this.state.value, "from the TimeSelector ID =",this.props.id)
//         return(
//             <div>
//                 <table className="drop">
//                 <td className="drop"><Drop name='from' options={getMomentRange()} sendValue={this.getValue.bind(this)}/></td>
//                 <td className="to">to</td>   
//                 <td className="drop"><Drop name='to' options={getMomentRange()} sendValue={this.getValue.bind(this)}/></td>  
//                 {/* <td>{this.props.id}</td> */}
//                 </table>
//                 {/* {this.showMessage()} */}
//             </div>
//         )
//     }
// } 

export default TimeSelector;


 