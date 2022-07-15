import axios from "axios";
export const createProduct = async (data) => {
  const response = await axios.post("http://localhost:3001/products", data);

  return response;
};
