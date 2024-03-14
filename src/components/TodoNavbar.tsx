import { Link, useNavigate } from "react-router-dom";

const TodoNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Tasks</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <form className="form-inline">
           
          </form>
          <button className="btn btn-primary ml-2"> 
            <Link to="/addtodos" className="nav-link text-white">Add Todos</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TodoNavbar;
