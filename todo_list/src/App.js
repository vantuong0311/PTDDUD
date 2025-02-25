import React, { useState, useEffect, useRef, useMemo, useReducer } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      dispatch({ type: 'SET', payload: storedTodos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return {
      incomplete: todos.filter(todo => !todo.completed),
      completed: todos.filter(todo => todo.completed),
    };
  }, [todos]);

  const handleAddTodo = () => {
    if (!inputValue) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    dispatch({ type: 'ADD', payload: newTodo });
    setInputValue('');
    inputRef.current.focus();
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <h2>Incomplete Tasks</h2>
      <ul>
        {filteredTodos.incomplete.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => handleToggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {filteredTodos.completed.map(todo => (
          <li key={todo.id}>
            <span onClick={() => handleToggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;