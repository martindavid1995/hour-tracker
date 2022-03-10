import React from "react"

// Construct some way of advancing from this date for like idk, 100 ranges? Linked list?
// Then find todays date and find the closest date before it that is in our list
const anchor_date = new Date("2022-02-19");
const anchor_day = "Sat"; //Make this variable and inputtable

Date.prototype.addDays = function (days){
   const date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date;
}

function parseDate(date){
    var fmt = "";
    var spl = date.toString().split(" ");

    fmt += spl[0] + " " + spl[1] + " " + spl[2];

    return fmt;
}

// Returns a formatted array from the anchor day to the next 14 days
// TODO: Make length of pay-period variable and inputtable 
function getDates(anchor){
  var dates = new Array(15);

  for (var i = 0; i < 15; i++) // Get every date from anchor -> anchor + 13 inclusive
    dates[i] = parseDate(anchor.addDays(i));

  if (dates[1].split(" ")[0] != anchor_day)
    console.log("ERR Start day doesn't match expected range")

  return dates.slice(1,15) // Cut the bad front date off
}


export default class HourInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      const d = getDates(anchor_date);

      return (
        <form onSubmit={this.handleSubmit}>
          <table>
          <tr>
            <td>{d[0]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[1]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[2]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[3]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[4]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[5]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[6]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[7]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[8]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[9]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[10]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[11]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[12]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          <tr>
            <td>{d[13]}</td>
            <td>
              <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </td>
          </tr>
          </table>
        </form>
      );
    }
  }