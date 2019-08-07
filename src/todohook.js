import React, { useState } from "react";

export const TodoHook = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

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
        <button onClick={() => setItems([...items, { text, id: Date.now() }])}>
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
