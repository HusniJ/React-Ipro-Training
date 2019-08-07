import React, { createContext } from "react";
import axios from "axios";

const ItemContext = createContext([]);
export class TodoContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ""
    };
  }

  render() {
    const { items, text } = this.state;

    return (
      <div>
        <ItemContext.Provider value={items}>
          <h1>TODO</h1>
          <form>
            <label htmlFor="new-todo">What needs to be done?</label>
            <br />
            <input id="new-todo" onChange={this.handleChange} value={text} />
            <br />
            <button onClick={this.handleSubmit}>Add #{items.length + 1}</button>
            <TodoData
              text="Get Data"
              dataFunction={this.fetchData.bind(this)}
            />
          </form>
          <TodoList />
        </ItemContext.Provider>
      </div>
    );
  }

  fetchData = e => {
    e.preventDefault();
    const { items } = this.state;
    const usersCount = items.length + 1;
    axios
      .get("https://reqres.in/api/users/" + usersCount)
      .then(function(response) {
        // response.data.data.map(d => items.push({ id: d.id, text: d.last_name }));
        items.push({
          id: response.data.data.id,
          text: response.data.data.last_name
        });
      });
    this.setState({ items: items });
  };

  handleSubmit = e => {
    const { items } = this.state;
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    items.push({
      text: this.state.text,
      id: Date.now()
    });

    this.setState({
      items: items,
      text: ""
    });
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
}

class TodoList extends React.Component {
  static contextType = ItemContext;
  render() {
    return (
      <ul>
        {this.context.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

const TodoData = props => {
  return (
    <div>
      <br />
      <button onClick={props.dataFunction}>{props.text}</button>
    </div>
  );
};
