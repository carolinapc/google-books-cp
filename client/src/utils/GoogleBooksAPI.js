import axios from "axios";

const KEY = process.env.REACT_APP_GBOOKS_API_KEY;
const URL = "https://www.googleapis.com/books/v1/volumes?printType=books&key="+KEY+"&q=";

export default {
  getBooks: query => axios.get(URL + query)
};
