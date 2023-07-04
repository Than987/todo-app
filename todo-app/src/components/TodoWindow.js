import React, { useEffect, useState } from 'react';
import axios from 'axios'

export const TodoWindow = () => {
    const [task, setTask] = useState({});
    const [database, setDatabase] = useState([]);

    const getData = () => {
        axios.get(`https://6303ab6a0de3cd918b3bbabb.mockapi.io/crud-data`)
            .then((res) =>
                setDatabase((data) => res.data)
            )
    }

    useEffect(() => {
        getData();
    }, [])

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setTask({ ...task, [name]: value })
    }

    const handleSubmit = () => {
        axios.post(`https://6303ab6a0de3cd918b3bbabb.mockapi.io/crud-data`, task)
            .then((res) => {
                const d = res.data
                console.log(d, 'res.data')
            })
    }

    const onButtonsubmit = (e) =>{
        e.preventDefault();
    }

    return (
        <>
            <h1>Todo App</h1>
            <form onSubmit={handleSubmit}>
            <input type='text' name='TaAsk' value={task.TaAsk || ""} placeholder='add todo' onChange={handleChange} />
            <button onClick={onButtonsubmit}>ADD</button>
            </form>
            {database && database.map((todotask) => {
                return (

                    <table border='2px'>
                        <tr>
                            <thead>

                                <th id={todotask.id}>Task Number</th>
                                <th>Task</th>

                            </thead>
                        </tr>
                        <tr>
                            <tbody>

                                <td>{todotask.id}</td>
                                <td>{todotask.TaAsk}</td>
                                <td><button>Edit</button></td>
                                <td><button>Delete</button></td>

                            </tbody>
                        </tr>
                    </table>
                )
            })}
        </>
    )
}
