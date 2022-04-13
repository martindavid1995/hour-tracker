import React from "react";
import "normalize.css";
import Select from "react-dropdown-select";

 
function Drop ({name, options, sendValue}){

    return (
      <div>
         <Select
          placeholder=""
          onChange={(values) => sendValue(name, values[0])}
          options={options}
        />
      </div>
    );
  
}

export default Drop;


