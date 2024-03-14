import  { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  date: string;
  description: string;
  assignee: string;
}

const fetchTodos = async () => {
  const { data } = await axios.get("http://localhost:8000/todos");
  return data;
};

const TodosPerPage = 3;

enum ActionTypes {
  SET_SEARCH,
  SET_SORT_ORDER,
  SET_STATUS_FILTER,
  SET_CURRENT_PAGE,
}

interface Action {
  type: ActionTypes;
  payload: any;
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH:
      return { ...state, search: action.payload };
    case ActionTypes.SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };
    case ActionTypes.SET_STATUS_FILTER:
      return { ...state, statusFilter: action.payload };
    case ActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default function Todos() {
  const initialState = {
    search: "",
    sortOrder: "asc",
    statusFilter: null,
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { search, sortOrder, statusFilter, currentPage } = state;

  const navigate = useNavigate();

  const { data: todolist = [], isLoading, refetch } = useQuery<Todo[]>("todos", fetchTodos);

  const { mutate: toggleTodo } = useMutation(
    (todo: Todo) =>
      axios.patch(`http://localhost:8000/todos/${todo.id}`, {
        isCompleted: !todo.isCompleted,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deleteTodo } = useMutation(
    (id: number) => axios.delete(`http://localhost:8000/todos/${id}`),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  let filteredTodos = todolist.filter((todo) => {
    const titleIncludesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const isStatusMatch = statusFilter === null || todo.isCompleted === statusFilter;

    return titleIncludesSearch && isStatusMatch;
  });

  filteredTodos.sort((a, b) => {
    if (a.date < b.date) return sortOrder === "asc" ? -1 : 1;
    if (a.date > b.date) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastTodo = currentPage * TodosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - TodosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber: number) => dispatch({ type: ActionTypes.SET_CURRENT_PAGE, payload: pageNumber });

  const handleCheckbox = (todo: Todo) => {
    toggleTodo(todo);
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleTitleClick = (id: number) => {
    navigate("/viewtodos/" + id);
  };

  return (
    <>
      <div className="container">
        <div className="mb-2 d-flex justify-content-between">
          <input
            className="form-control w-25"
            type="search"
            placeholder="Search a Task"
            value={search}
            onChange={(e) => dispatch({ type: ActionTypes.SET_SEARCH, payload: e.target.value })}
          />
          <div className="d-flex">
            <select
              className="form-control mr-2"
              value={sortOrder}
              onChange={(e) => dispatch({ type: ActionTypes.SET_SORT_ORDER, payload: e.target.value as "asc" | "desc" })}
            >
              <option value="asc">Sort by Date (Asc)</option>
              <option value="desc">Sort by Date (Desc)</option>
            </select>
            <select
              className="form-control"
              value={statusFilter === null ? "" : statusFilter.toString()}
              onChange={(e) =>
                dispatch({ type: ActionTypes.SET_STATUS_FILTER, payload: e.target.value === "" ? null : e.target.value === "true" })
              }
            >
              <option value="">Show All</option>
              <option value="true">Show Completed</option>
              <option value="false">Show Pending</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="container">
              <div className="todos">
                {currentTodos.length > 0 ? (
                  currentTodos.map((item) => (
                    <div
                      key={item.id}
                      className="card text-wrap card-content justify-content-center text-center w-50 mt-3 mb-3 d-flex flex-row"
                    >
                      <div
                        className="card-body card-text text-wrap d-inline-flex switch"
                      >
                        <div>
                        <h5 onClick={() => handleTitleClick(item.id)} style={{ cursor: 'pointer' }}>Title: {item.title}</h5>
                          <p>Description: {item.description}</p>
                        </div>
                        <input
                          className="check-box"
                          checked={item.isCompleted}
                          onChange={() => handleCheckbox(item)}
                          type="checkbox"
                        />
                        <button
                          className="btn btn-sm btn-danger ms-4"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No todos found.</p>
                )}
              </div>

              <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredTodos.length / TodosPerPage) }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button onClick={() => paginate(i + 1)} className="page-link">
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
