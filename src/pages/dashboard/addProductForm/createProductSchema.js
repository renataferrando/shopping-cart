import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.number().typeError("Must be a number").required("Id is required"),
  name: yup.string().required("Product name is required"),
  brand: yup.string().required("Brand is required"),
  price: yup
    .number()
    .typeError("Must be a number")
    .required("Price is required"),
  size: yup
    .array()
    .typeError("Must be an array")
    .required("Sizes are required"),
  category: yup.string().required("Product category is required"),
  gender: yup.string().required("Gender is required"),
  countInStock: yup
    .number()
    .typeError("Must be a number")
    .required("stock is required"),
  description: yup.string().required("Description is required"),
});

export default schema;
