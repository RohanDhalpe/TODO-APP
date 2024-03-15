import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().max(20).required("Title is required"),
  description: yup.string().required("Description is required"),
  assignee: yup.string().required("Assignee is required"),
  date: yup
    .date()
    .min(new Date(), "Date must be after or on today")
    .required("Date is required"),
});
