import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css';

export const TodoWindow = () => {
    const [todotask, setTodotask] = useState("");
    const [todadata, setTododata] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        GetNote();
    }, [todadata])

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setTodotask({ ...todotask, [name]: value })
    }

    const PostNote = () => {
        axios.post(`https://6303ab6a0de3cd918b3bbabb.mockapi.io/crud-data`, todotask)
            .then(res => res.data)
        setTodotask("")

    }

    const GetNote = () => {
        axios.get(`https://6303ab6a0de3cd918b3bbabb.mockapi.io/crud-data`)
            .then(res =>
                setTododata((res.data)))
    }

    const DeleteNote = (id) => {
        axios.delete(`https://6303ab6a0de3cd918b3bbabb.mockapi.io/crud-data/${id}`)
            .then((res) => {
                console.log(res.data)
            })
    }


    const ModalWindow = () => {
        return (
            <>
                <input type='text' placeholder='Update Note' name='Task' />
                <button onClick={UpdateModal}>Update</button>
            </>
        )
    }

    const UpdateModal =() => {
        setModal(false)
    }

    const OpenModal = () => {
        setModal(true)
    }

    const ClearTextField = () =>{
        setTodotask("");
    }


    return (
        <>
            {modal && <ModalWindow />}
            <div className='modall'>
                <div className="modal-fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"style={{color:'green',fontFamily:'cursive'}}>Notepad</h1>
                            </div>
                            <div className="modal-body">
                                <div className="col-auto">
                                    <input type="text" name='Task' placeholder="Task: expample to do..." value={todotask.Task || ""} onChange={handleChange} id="inputPassword6" class="form-control" autoFocus style={{fontFamily:'cursive'}}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ClearTextField}>Clear Note</button>
                                <button type="button" onClick={PostNote} className="btn btn-success">Save Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Your Note</th>
                    </tr>
                </thead>
                <tbody>
                    {todadata && todadata.map((note) => {
                        return (
                            <>
                                <tr>
                                    <td>{note.id}</td>
                                    <td>{note.Task}</td>
                                    <td ><button onClick={() => OpenModal(note.id)}>Edit Note</button></td>
                                    <td ><button onClick={() => DeleteNote(note.id)}>Delete Note</button></td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
