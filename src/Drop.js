import React from "react";
import "normalize.css";
import Select from "react-dropdown-select";




export class Drop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        key: this.props.key,
        options: [] 
    }
  }

  render() {
   
    return (
      <div>
         <Select
          placeholder=""
          onChange={() => console.log(this.props.options)}
          values={[]} 
          options={this.props.options}
        />
      </div>
    );
  }
}

export default Drop;