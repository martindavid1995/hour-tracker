import React from "react";
import "normalize.css";
import Select from "react-dropdown-select";

 
function Drop ({name, options, sendValue, isDisabled}){
    return (
      <div style={{width: '120px'}}>
         <Select
          placeholder={""}
          onChange={(values) => 
            sendValue(values[0], name)
          }
          options={options}
          disabled={isDisabled}
        />
      </div>
    );
  
}

export default Drop;


