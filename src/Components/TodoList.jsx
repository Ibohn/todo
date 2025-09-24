import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    // États initiaux
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    // Fonction pour ajouter un nouveau titre
    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
            setTodos([...todos, { heading: headingInput, lists: [] }]);
            setHeadingInput('');
        }
    };

    // Fonction pour supprimer un titre
    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    // Fonction pour gérer les changements dans les inputs de liste
    const handleListInputChange = (index, value) => {
        setListInputs({ ...listInputs, [index]: value });
    };

    // Fonction pour ajouter un élément à la liste
    const handleAddList = (index) => {
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos];
            newTodos[index].lists.push(listInputs[index]);
            setTodos(newTodos);
            setListInputs({ ...listInputs, [index]: '' });
        }
    };

    return (
        <div className="todo-container">
            <h1 className="title">My Todo List</h1>
            
            {/* Section d'ajout de titre */}
            <div className="input-container">
                <input
                    type="text"
                    className="heading-input"
                    placeholder="Enter heading"
                    value={headingInput}
                    onChange={(e) => setHeadingInput(e.target.value)}
                />
                <button className="add-list-button" onClick={handleAddTodo}>
                    Add Heading
                </button>
            </div>

            {/* Section d'affichage des todos */}
            <div className="todo_main">
                {todos.map((todo, index) => (
                    <div key={index} className="todo-card">
                        <div className="heading_todo">
                            <h3>{todo.heading}</h3>
                            <button 
                                className="delete-button-heading" 
                                onClick={() => handleDeleteTodo(index)}
                            >
                                Delete Heading
                            </button>
                        </div>

                        {/* Affichage des éléments de la liste */}
                        <ul>
                            {todo.lists.map((list, listIndex) => (
                                <li key={listIndex} className='todo_inside_list'>
                                    <p>{list}</p>
                                </li>
                            ))}
                        </ul>

                        {/* Section d'ajout d'éléments à la liste */}
                        <div className='add_list'>
                            <input
                                type="text"
                                className='list-input'
                                placeholder='Add list'
                                value={listInputs[index] || ''}
                                onChange={(e) => handleListInputChange(index, e.target.value)}
                            />
                            <button 
                                className="add-list-button" 
                                onClick={() => handleAddList(index)}
                            >
                                Add List
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;