import React  from "react";
import { useState } from "react"
import OutputComponent from "./OutputComponent";
import { round } from './Utils'



function InputField({hoursWorked}){
    const [hoursReqd, setHoursReqd] = useState(85)
    const [wk1, setWk1] = useState(0)
    const [wk2, setWk2] = useState(0)
    const [miscHrs, setMiscHrs] = useState(0)


    function reset(){
        setMiscHrs(0)
        setHoursReqd(85)
        setWk1(0)
        setWk2(0)
      }

    return(
        <div>
            <table className='ifield'><tbody>
                <tr>
                    <td className='new'><label>Hours required per pay-period:</label></td>
                    <td className='new'>
                    <input         
                            type="text"
                            pattern="[0-9]*"
                            value={hoursReqd}
                            onChange={(e) => 
                                setHoursReqd((v) => (e.target.validity.valid ? e.target.value : v))                            
                            } /> 
                    </td>
                </tr>
                <tr>
                    <td className='new'><label>Hours worked week 1:</label></td>
                    <td className='new'>
                    <input         
                            type="text"
                            pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                            value={wk1}
                            onChange={(e) => 
                            setWk1((v) => (e.target.validity.valid ? e.target.value : v))
                            } /> 
                    </td>
                </tr>
                <tr>
                    <td className='new'><label>Hours worked week 2:</label></td>
                    <td className='new'>
                    <input         
                            type="text"
                            pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                            value={wk2}
                            onChange={(e) => 
                            setWk2((v) => (e.target.validity.valid ? e.target.value : v))
                            } /> 
                    </td>
                </tr>
                <tr>
                    <td className='new'><label>Enter Miscellaneous Hours:</label></td>
                    <td className='new'>
                    <input         
                            type="text"
                            pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                            value={miscHrs}
                            onChange={(e) => 
                            setMiscHrs((v) => (e.target.validity.valid ? e.target.value : v))
                            } /> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={() => reset()}>
                            Reset
                        </button>
                    </td>
                </tr>
                <tr>
                    <OutputComponent hoursReqd={hoursReqd} wk1={wk1} wk2={wk2} miscHrs={miscHrs} hoursWorked={hoursWorked}/>
                </tr>
            </tbody></table>
        </div>
                        
    )
}

export default InputField