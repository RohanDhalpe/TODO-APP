const TodoNavbar = () => {
  return (
    <nav className="todo-navbar">
      <form className="todo-form">
        <button className="add-todos-btn" type="submit">
          <a href="/addtodos" className="nav-link">Add Todos</a>
        </button>
        <button className="view-todos-btn" type="submit">
          <a href="/" className="nav-link">View Todos</a>
        </button>
      </form>
    </nav>
  );
};

export default TodoNavbar;
