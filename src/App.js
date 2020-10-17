import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions/todos';
import './App.css';

function App(props) {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = ev => {
    const { value } = ev.target;

    setInputValue(value)
  }

  const onSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      props.addTodo(trimmedValue)
      setInputValue('')
    }
  }

  return (
    <div className="App">
      <input type="text" onChange={onInputValueChange} value={inputValue} />
      <button onClick={onSubmit} disabled={inputValue.trim() === ''}>Add todo</button>

      <ul className="todo-list">
        {props.todos.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { todos } = state;

  return {
    todos: todos.todos,
  }
}

const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
