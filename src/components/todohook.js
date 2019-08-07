import React, { useState, useEffect } from "react";
import axios from "axios";

export const TodoHook = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("https://reqres.in/api/users/").then(function(response) {
      response.data.data.map(d =>
        setItems([...items, { id: d.id, text: d.last_name }])
      );
    });
  }, []);
  return (
    <div>
      <h1>TODO</h1>
      <form>
        <label htmlFor="new-todo">What needs to be done?</label>
        <br />
        <input
          id="new-todo"
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <br />
        <button
          onClick={e => {
            e.preventDefault();
            if (!text.length) {
              return;
            }
            setItems([...items, { text, id: Date.now() }]);
            setText("");
          }}
        >
          Add #{items.length + 1}
        </button>
      </form>
      <TodoList items={items} />
    </div>
  );
};

const TodoList = props => {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export default TodoHook;
