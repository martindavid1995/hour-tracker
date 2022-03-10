import React from "react"

// Construct some way of advancing from this date for like idk, 100 ranges? Linked list?
// Then find todays date and find the closest date before it that is in our list
const anchor_date = new Date("2022-02-19");
// const anchor_date = new Date("2022-12-25");

function dayToStr(date) {
  if (date > 6) date %= 7

  switch(date){
    case 0: return "Mon"
    case 1: return "Tues"
    case 2: return "Wed"
    case 3: return "Thurs"
    case 4: return "Fri"
    case 5: return "Sat"
    case 6: return "Sun"
  }
}

function monthToStr(month) {
  switch(month){
    case 1: return "Jan";
    case 2: return "Feb";
    case 3: return "Mar";
    case 4: return "Apr";
    case 5: return "May";
    case 6: return "Jun";
    case 7: return "Jul";
    case 8: return "Aug";
    case 9: return "Sep";
    case 10: return "Oct";
    case 11: return "Nov";
    case 12: return "Dec";  
  }
}

Date.prototype.addDays = function (days){
   const date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date;
}
//Biweek range from Saturday - Saturday - Friday, Next range starts on Saturday
function getDates(){
  //fuck moments im gonna do it myself because im stubborn also moments are deprecated get shit on
  var dates = new Array(14);

  for (var i = 0; i < 14; i++){
      var date_fmt = "";

      var curr_date = anchor_date.addDays(i); // For some reason this is incrementing everything by 1

      date_fmt += dayToStr(curr_date.getDay()) + " "
      date_fmt += monthToStr((curr_date.getMonth()))+" "+(curr_date.getDate())

      dates[i] = date_fmt;
  }
  

  return dates
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
      const d = getDates();

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


          {/* <label>
            Monday
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label><br></br>
          <label>
            Tuesday
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label><br></br>
          <label>
            Wednesday
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label><br></br>
          <label>
            Thursday
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label><br></br>
          <label>
            Friday
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label><br></br>
          <input type="submit" value="Submit" /> */}
        </form>
      );
    }
  }