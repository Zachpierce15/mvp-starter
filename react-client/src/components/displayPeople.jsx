import React from 'react';
import Vehicles from './vehiclesInfo.jsx';
import axios from 'axios';

class DisplayPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      person: this.props.data,
      user: this.props.user,
    }
    // bind functions here
    this.addToLikes = this.addToLikes.bind(this);
  }

  addToLikes(e) {
    e.preventDefault();
    axios.post('/add-to-likes', this.state)
    .then((response) => {
      console.log('Successfully Added');
    })
    .catch((err) => {
      console.log('Error Posting', err);
    })
  }

  render() {
    return (
      <div>

        <div>
          <button name='people' onClick={ this.props.clickMe }>People</button>
          <button name='planets' onClick={ this.props.clickMe}>Planets</button>
          <button  name='species' onClick={ this.props.clickMe}>Species</button>
          <button name='vehicles' onClick={ this.props.clickMe}>Vehicles</button>
          <button name='liked' onClick={ this.props.clickMe }>Liked</button>
          <button name='like' style={this.props.css.likeButton} onClick={this.addToLikes}>like</button>
        </div>

        <span>
          <img src="https://icon2.kisspng.com/20180605/lqh/kisspng-star-wars-the-clone-wars-obi-wan-kenobi-anakin-sk-obi-wan-5b166751f34158.0938309915281948979964.jpg" style={this.props.css.image}/>
        </span>

      <table style={this.props.css.information}>
        <thead>This is for { `${this.props.data.name}` }</thead>
        <tbody>
          <tr>
            <td>
              Name: { `${this.props.data.name}` }
            </td>
          </tr>

          {/* <tr>
            <td>
              HomeWorld: { `${this.props.data.homeworld}` }
            </td>
          </tr> */}

          <tr>
            <td>
            Height: { `${this.props.data.height}` }
            </td>
          </tr>

          <tr>
            <td>
              Eye-Color: { `${this.props.data.eye_color}` }
            </td>
          </tr>

          <tr>
            <td>
              Birth-Year: { `${this.props.data.birth_year}` }
            </td>
          </tr>

          <tr>
            <td>
              Gender: { `${this.props.data.gender}` }
            </td>
          </tr>

          {/* <tr>
            <td>
              Species: { `${this.props.data.species}` }
            </td>
          </tr> */}

          <tr>
            <td>
              Vehicles: <Vehicles data={this.props.data.vehicles} />
            </td>
          </tr>
        </tbody>

      </table>

    </div>
    )
  }
}
export default DisplayPeople;