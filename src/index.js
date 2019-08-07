import React from "react";
import ReactDOM from "react-dom";
import { TodoApplication } from "./components/todoapplication";
// import { TodoHook } from "./components/todohook";
// import { TodoContext } from "./components/todocontext";

const App = () => <TodoApplication />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
