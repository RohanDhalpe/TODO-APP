import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

const CreateTask = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup
      .string()
      .max(20, "Title length must be less than 20 characters")
      .required("Title is required"),
    description: yup.string().required("Description is required"),
    assignee: yup.string().required("Assignee is required"),
    date: yup
      .string()
      .matches(
        /^(?:\d{4}-\d{2}-\d{2})$/,
        'Date must be in the format YYYY-MM-DD'
      )
      .required("Date is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        assignee: "",
        date: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          await axios.post("http://localhost:8000/todos", {
            title: values.title,
            description: values.description,
            assignee: values.assignee,
            isCompleted: false,
            date: values.date,
          });
          navigate("/");
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to add data");
        }
      },
    });

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <form onSubmit={handleSubmit} className="p-4 border rounded ">
            <h2 className="text-center mb-4">Add a Task</h2>
            <div className="mb-3">
              <label className="form-label">task :</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                required
                autoFocus
              />
              {errors.title && touched.title && (
                <p className="text-danger">{errors.title}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="form-label">description :</label>
              <textarea
                className="form-control"
                name="description"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                required
              ></textarea>
              {errors.description && touched.description && (
                <p className="text-danger">{errors.description}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="form-label">assignee :</label>
              <input
                type="text"
                className="form-control"
                name="assignee"
                onChange={handleChange}
                value={values.assignee}
                onBlur={handleBlur}
                required
              />
              {errors.assignee && touched.assignee && (
                <p className="text-danger">{errors.assignee}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="form-label">date :</label>
              <input
                type="date"
                className="form-control"
                name="date"
                onChange={handleChange}
                value={values.date}
                onBlur={handleBlur}
                required
              />
              {errors.date && touched.date && (
                <p className="text-danger">{errors.date}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
