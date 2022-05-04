import React  from "react";
import { useState } from "react"
import { round } from "./Utils"

function getTotHrsWorked(wk1, wk2, hoursWorked){
    wk1 = parseFloat(wk1)
    wk2 = parseFloat(wk2)
    var total = hoursWorked
    if (!isNaN(wk1))
        total += wk1
    if (!isNaN(wk2))
        total += wk2
    return round(total,2)
}

function getResultString(hoursWorked, hoursReqd){
    const diff = round(hoursReqd-hoursWorked,2)
    if (diff > 0)
      return "You are short "+diff+" hours " + String.fromCodePoint(0x1F612)
    else if (diff < 0)
      return "You are over "+-diff+" hours " + String.fromCodePoint(0x1F604)
    else
      return "Your hours are perfect " + String.fromCodePoint(0x2705)
  }

function OutputComponent({hoursReqd, wk1, wk2, hoursWorked}) {

    var totHoursWorked = getTotHrsWorked(wk1,wk2,hoursWorked)

    return(
        <div>
            <label>Total hours worked: {totHoursWorked}</label><br></br>
            <label>{getResultString(totHoursWorked, hoursReqd)}</label>
        </div>
    )
}

export default OutputComponent