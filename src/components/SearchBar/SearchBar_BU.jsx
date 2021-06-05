import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getDogs } from '../../actions/index.js';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: ""
        };
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this)
        getDogs(this.state.title)
    }

    render() {
        const { breed } = this.state;
        return (
          <div>
            <h2>Doggie Searcher</h2>
            <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
              <div>
                <label className="label" htmlFor="title">Breed: </label>
                <input
                  type="text"
                  id="title"
                  autoComplete="off"
                  value={breed}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <button type="submit">Search</button>
            </form>
              <ul>
                {
                  this.props.dogs && this.props.dogs.map(dog => (
                    <div key={dog.id} >
                      <Link to={`/dogs/${dog.id}`} >
                        {dog.name}
                      </Link>
                      {/* <button onClick={() => this.props.addMovieFavorite({title: movie.Title, id: movie.imdbID})} >add to favorites!</button> */}
                    </div>
                  ))
                }
              </ul>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    dogs: state.dogsLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDogs: breed => dispatch(getDogs(breed))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)