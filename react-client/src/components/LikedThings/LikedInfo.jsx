import React from 'react';
import axios from 'axios';
import DisplayPeople from '../displayPeople.jsx'
let counter = 0;

class LikedList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      displayItem: false,
      data: '',
      user: this.props.user
    }
    // bind functions here
    this.likedRender = this.likedRender.bind(this);
  }

  likedRender(name, type) { // Remember to adjust to different types of queries later on..
    let query = name
    axios.get(`https://swapi.co/api/people/?search=${query}`)
    .then((data) => {
      this.setState({displayItem: true, data: data.data.results[0]})
    })
    .catch((err) => {
      console.log('Error getting favorite!!!', err);
    })
  }

  render() {
    if (this.state.displayItem === false) {
      return (
        <div>
          <button name='people' onClick={ this.props.clickMe }>People</button>
          <button name='planets' onClick={ this.props.clickMe }>Planets</button>
          <button  name='species' onClick={ this.props.clickMe }>Species</button>
          <button name='vehicles' onClick={ this.props.clickMe }>Vehicles</button>
          <button name='liked' onClick={ this.props.clickMe }>Liked</button>
  
          <div style={this.props.css.listOfLikes}>
            <h2> What you've like from your journeys across the galaxy...</h2>
            { this.props.favorites.map((item) => {
              counter++
              return <button key={ counter } value={ JSON.stringify(item) } onClick={() => this.likedRender(item.name)} name='fromList' >{item.name}</button>
            })}
          </div>
        </div>
      )
    } else {
      return(
        <div>

          <DisplayPeople clickMe={this.props.clickMe} css={this.props.css} data={this.state.data} user={this.state.user}/>

        </div>
      )
    }
  }
} 

export default LikedList;