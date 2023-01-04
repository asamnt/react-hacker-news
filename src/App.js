import "./App.css";
import React, { Component } from "react";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: "",
    };

    this.onDismiss = this.onDismiss.bind(this);
    //binding is necessary as class methods do not automatically bind "this" to the class instance
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss = (id) => {
    const updatedList = this.state.list.filter((item) => {
      return item.objectID !== id;
    });
    this.setState({ list: updatedList }); //we have to use this.setState to set the state
  };

  //when we use a event handler, we get access to the synthetic React "event"
  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value }); //we add the value to the state
  };

  render() {
    return (
      <div className="App">
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>
        {this.state.list.map((item) => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                //we have to pass a function defn that takes a parameter objectId to the onClick handler,
                //we cannot just say onClick={onDismiss} as we need to pass the key to the onDismiss function
                //so we create a arrow function to wrap the objectId property in
                //this is known as higher order functions
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
