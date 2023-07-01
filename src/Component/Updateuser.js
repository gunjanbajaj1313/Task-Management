import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";

const Updateuser = () => {
    const [id, idchange] = useState(0);
    const [title, titlechange] = useState('');
    const [date, datechange] = useState('');
    const [description, descriptionchange] = useState('');
    const [status, statuschange] = useState('completed');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    const userobj=useSelector((state)=>state.user.userobj)


    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { id, title, date, description, status };
        dispatch(FunctionUpdateUser(userobj,id));
        navigate('/');
    }

    useEffect(() => {
        dispatch(FetchUserObj(code));
    }, [])

    useEffect(() => {
        if(userobj){
            idchange(userobj.id);
            titlechange(userobj.title);
            datechange(userobj.date);
            descriptionchange(userobj.description);
            statuschange(userobj.status);
        }
    }, [userobj])

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Edit Task</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input value={title || ''} onChange={e => titlechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input value={date || ''} onChange={e => datechange(e.target.value)} type="date" className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <input value={description || ''} onChange={e => descriptionchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select value={status || ''} onChange={e => statuschange(e.target.value)} className="form-control">
                                    <option value="To Do">To Do</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Testing">Testing</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary mx-3" type="submit">Submit</button> 
                        <Link className="btn btn-secondary" to={'/'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Updateuser;