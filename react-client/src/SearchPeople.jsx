import React from 'react';
import DisplayPeople from './components/displayPeople.jsx'
import axios from 'axios'

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      startedSearch:false,
      data: 'hello',
      user: this.props.user,
      error: false
    };
    //bind functions here
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.reSetTheSearch = this.reSetTheSearch.bind(this);
  }

  onChangeHandler(e) {
    this.setState({query: e.target.value})
  };

  onSubmitHandler(e) {
    e.preventDefault();
    let type = this.props.type;
    let query = this.state.query
    axios.get(`https://swapi.co/api/${type}/?search=${query}`)
    .then((data) => {
      console.log(data.data)
      if (data.data.count !== 0) {
        this.setState({startedSearch: true, data: data.data.results[0]})
      } else {
        this.setState({ error: true })
      }
    })
    .catch((err) => {
      console.log('this is an error!!', err);
    }) 
  };

  reSetTheSearch(e) {
    this.setState({ error: false })
  }

  render() {
    if (this.state.error === true) {
      return (
        <div>
          <button name='people' onClick={ this.props.clickMe }>People</button>
          <button name='planets' onClick={ this.props.clickMe }>Planets</button>
          <button  name='species' onClick={ this.props.clickMe }>Species</button>
          <button name='vehicles' onClick={ this.props.clickMe }>Vehicles</button>
          <button name='liked' onClick={ this.props.clickMe }>Liked</button>

          <div style={this.props.css.listOfLikes}>
            <h1>
              There's a disturbance in the force...  
            </h1>

            <h3> 
              No results found...
            </h3>
            <button onClick={this.reSetTheSearch} > Delve into the force once more</button>
          </div>

        </div>
      )
    }

    if(this.state.startedSearch === false) {
    return (
        <div>

          <button name='people' onClick={ this.props.clickMe }>People</button>
          <button name='planets' onClick={ this.props.clickMe }>Planets</button>
          <button  name='species' onClick={ this.props.clickMe }>Species</button>
          <button name='vehicles' onClick={ this.props.clickMe }>Vehicles</button>
          <button name='liked' onClick={ this.props.clickMe }>Liked</button>

          <div style={ this.props.css.searchPeople }>
            <h1 style={ { color: 'gold' } } > People of the Galaxy</h1>
            <div  style={ this.props.css.padawanLearner } >
              Who is it you wish to know? 
            </div>

            <form onSubmit={ this.onSubmitHandler }>
                <input type='text' value={ this.state.query } onChange={ this.onChangeHandler } />
            </form>

          </div>

        </div>
      )
    } 

      return (
        <div>
        <DisplayPeople clickMe={this.props.clickMe} css={this.props.css} data={this.state.data} user={this.state.user}/>
        </div>
      )
  }
}
export default People;