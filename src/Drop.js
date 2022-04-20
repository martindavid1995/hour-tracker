import React from "react";
import "normalize.css";
import Select from "react-dropdown-select";

 
function Drop ({name, options, sendValue}){

    return (
      <div>
         <Select
          placeholder={""}
          onChange={(values) => sendValue(values[0], name)}
          options={options}
        />
      </div>
    );
  
}

export default Drop;


