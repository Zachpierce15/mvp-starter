import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import css from './components/Styled-Components.js'
import People from './SearchPeople.jsx'
import Liked from './components/LikedThings/LikedInfo.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName: '',
      favorites: [],
      submited: false,
      type: 'people',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitUserHandler = this.onSubmitUserHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/userInfo')
  //   .then()
  // }

  onChangeHandler(e) {
    if (e.target.name === 'user') {
      this.setState({ userName: e.target.value })
    }
    console.log('hello')
  }

  onSubmitUserHandler(e) {
    e.preventDefault();
    this.setState({ submited: true })
    axios.get('/user-info', { params: { username: this.state.userName } })
    .then((data) => {
      console.log(data.data[0].favoritePeople)
      this.setState({ favorites: data.data[0].favoritePeople })
    })
    .catch((err) => {
      console.log('Did not get Info', err)
    })
  }

  onClickHandler(e) {
    e.preventDefault();
    if (e.target.name === 'liked') {
      this.setState({ type: e.target.name })
    }
    if (e.target.name === 'people') {
      this.setState({ type: e.target.name })
    }
  }


  render () {
    if(this.state.submited === false) {
      return (
      <div style={ css.centerStuff }>
        <h1 style={ { color: 'gold' } }>STAR WARS</h1>
        <div style={ css.padawanLearner }>
          Your name young padawan learner...
        </div>
        <form onSubmit={ this.onSubmitUserHandler } >
          <input type='text' name='user' value={ this.state.userName } onChange={ this.onChangeHandler } />
        </form>
      </div>)
    }
    if(this.state.type === 'people') {
      return(
        <div>
          <People clickMe={ this.onClickHandler } css={ css } type={ this.state.type } user={ this.state.userName }/>
        </div>
      )
    }
    if(this.state.type === 'liked') {
      return(
        <div>
          <Liked  favorites={ this.state.favorites } clickMe={ this.onClickHandler } css={ css } user={ this.state.userName }/> 
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));