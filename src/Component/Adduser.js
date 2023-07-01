import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";

const Adduser = () => {
    const [title, titlechange] = useState('');
    const [date, datechange] = useState('');
    const [description, descriptionchange] = useState('');
    const [status, statuschange] = useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();

    
    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { title, date, description, status };
        dispatch(FunctionAddUser(userobj));
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add Task</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input value={title} onChange={e => titlechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" value={date} onChange={e => datechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <input value={description} onChange={e => descriptionchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select value={status} onChange={e => statuschange(e.target.value)} className="form-control">
                                        <option value="Completed">Completed</option>
                                        <option value="Testing">Testing</option>
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary mx-3" type="submit">Submit</button> 
                        <Link className="btn btn-secondary " to={'/'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Adduser;