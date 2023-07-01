import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";
import { MdEditSquare} from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrTableAdd} from 'react-icons/gr';



const Userlisting = (props) => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); 
  const [filteredUsers, setFilteredUsers] = useState(props.user.userlist); 
  useEffect(() => {
    props.loaduser();
  }, []);
  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(code);
      props.loaduser();
      toast.success("Task removed successfully.");
    }
  };

  useEffect(() => {
    setFilteredUsers(props.user.userlist);
  }, [props.user.userlist]);
  const handleStatusChange = (event) => {
    const status = event.target.value; 
    setSelectedStatus(status); 

    
    if (status === "All") {
      setFilteredUsers(props.user.userlist);
    } else{

  
      const filteredArray = props.user.userlist.filter(
        (user) => user.status === status
      );
      setFilteredUsers(filteredArray);
      } 
  };
  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="card">
        <div className="card-header">
          <input
            type="search"
            placeholder="Search Tasks"
            className="me-2 rounded-pill border border-primary text-primary text-center"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
                    />
                    
          <select
            className="form-control w-50"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
          
            <option value="All">All</option>
            <option value="To Do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Testing">Testing</option>
          </select>
        
          <Link to={"/add"} className="btn btn-primary rounded-pill ">
           <GrTableAdd/> Add New Task
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-secondary text-light">
              <tr>
                <td>Title</td>
                <td>Date</td>
                <td>Description</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .filter((val) => {
                  if (
                    val.title.toLowerCase().includes(search.toLocaleLowerCase()) 
                  ) {
                    return val;
                  } else if (search === "") {
                    return val;
                  }
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link
                        to={"/edit/" + item.id}
                        className="btn btn-light text-dark"
                      >
                        <MdEditSquare/>
                      </Link>{" "}
                      
                      <button
                        onClick={() => {
                          handledelete(item.id);
                        }}
                        className="btn btn-light text-dark"
                      >
                        <RiDeleteBin6Line/>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(Removeuser(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
