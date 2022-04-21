import React from "react"
import TimeSelector from "./TimeSelector"
import { useState } from "react"

function HourInput () {
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

    const elements = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]

    return ( 
        <div>
          <table>
            <tbody> 
              {
                elements.map((index) => {
                  return (
                    <tr>
                      <td><TimeSelector id={index} sendDiff={pushHours} /></td>
                    </tr>
                  )
                })   
              }
            </tbody>
          </table>
        </div>
          
      );




}

export default HourInput