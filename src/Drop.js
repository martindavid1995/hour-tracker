import React from "react";
import "normalize.css";
import Select from "react-dropdown-select";

 


export class Drop extends React.Component {
  send = (key, value) => {
    this.props.sendValue(key, value)
  }

  render() { 
   
    return (
      <div>
         <Select
          placeholder=""
          onChange={(values) => this.send(this.props.name, values[0].label)}
          // values={} 
          options={this.props.options}
        />
      </div>
    );
  }
}

export default Drop;