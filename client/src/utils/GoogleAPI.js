import axios from "axios";

const KEY = "AIzaSyB-U2UvyJ3bi8ZXATBe-Ui86LcwEVS5HMI";
const URL = "https://www.googleapis.com/books/v1/volumes?printType=books&key=" + KEY + "&q=";

export default {
  getBooks: query => {
    console.log(URL + query);
    return axios.get(URL + query);
  }
}

