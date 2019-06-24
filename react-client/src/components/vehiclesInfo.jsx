import React from 'react';
import axios from 'axios';
import { throws } from 'assert';

class Vehicles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      urls:[],
    }
    // Bind functions here
  }
  componentDidMount() {
    let vehiclesNew = [];
    if (this.props.data) {
      for(let i = 0; i < this.props.data.length; i++) {
        axios.get(this.props.data[i])
        .then((vehicle) => {
          vehiclesNew.push(vehicle.data.name);
          console.log('this is VEHICLES', vehiclesNew);
          this.setState({vehicles: vehiclesNew});
        })
        .catch((err) => {
          console.log('Error getting vehicles!', err)
        })
      }
    }
  }

  render() {

    if(this.state.vehicles.length > 0) {
      return(
        <div>
          {this.state.vehicles[0]}
        </div>
      );
    }
    return (
      <div>
        Vehicles Incoming!! 
      </div>
    )
  }
} 
export default Vehicles;