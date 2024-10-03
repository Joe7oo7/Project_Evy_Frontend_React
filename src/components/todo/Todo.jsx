import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

const API_URL = 'http://localhost:8000/api/todos/';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');
    const [theme, setTheme] = useState('light'); // For managing light/dark mode

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setTodos(response.data))
            .catch(err => setError('Error fetching todos'));
    }, []);

    const addTodo = () => {
        if (task.trim() === '') return;

        axios.post(API_URL, { task })
            .then(response => setTodos([...todos, response.data]))
            .catch(err => setError('Error adding todo'));
    };

    const toggleComplete = (id) => {
        const todo = todos.find(todo => todo.id === id);
        axios.patch(`${API_URL}${id}/`, { completed: !todo.completed })
            .then(response => {
                setTodos(todos.map(todo => todo.id === id ? response.data : todo));
            })
            .catch(err => setError('Error updating todo'));
    };

    const deleteTodo = (id) => {
        axios.delete(`${API_URL}${id}/`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(err => setError('Error deleting todo'));
    };

    const updateTodo = (id) => {
        if (task.trim() === '') return;

        axios.patch(`${API_URL}${id}/`, { task })
            .then(response => {
                setTodos(todos.map(todo => todo.id === id ? response.data : todo));
                setEditId(null);
                setTask('');
            })
            .catch(err => setError('Error updating todo'));
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`todo-container ${theme}`}>

            
            <h1 className='title_text'>To-Do List</h1>

            {error && <p>{error}</p>}
            <input
                type="text"
                value={task}
                className='input'
                onChange={(e) => setTask(e.target.value)}
                placeholder={editId ? "Update the task" : "Add a new task"}
            />
            {editId === null
                ? <button className='button' onClick={addTodo}>Add</button>
                : <button className='button' onClick={() => updateTodo(editId)}>Update</button>
            }

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className='todo-item'>
                        <div className='checkbox-wrapper'>
                            <input
                                type="checkbox"
                                id={`checkbox-${todo.id}`}
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                            />
                            <label htmlFor={`checkbox-${todo.id}`}>
                                <span>{todo.task}</span>
                            </label>
                        </div>
                        <button className='button1' onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button className='button1' onClick={() => {
                            setTask(todo.task);
                            setEditId(todo.id);
                        }}>Update</button>
                    </li>
                ))}
            </ul>

            <button onClick={toggleTheme} className='toggle_button'>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
}

export default TodoList;
