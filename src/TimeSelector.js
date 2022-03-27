import React from 'react'
import Drop  from './Drop';


function TimeSelector(){
    return(
        <table>
             <td class="drop"><Drop /></td>
             <td class="to">to</td>   
             <td class="drop"><Drop /></td>
        </table>
    )
}

export default TimeSelector;
 