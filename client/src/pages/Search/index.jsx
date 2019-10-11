import React from 'react';
import GoogleApi from '../../utils/GoogleBooksAPI';
import API from '../../utils/API';
import BookList from '../../components/BookList';

class Search extends React.Component {
  state = {
    search: "",
    books: []
  }
  
  onSubmit = event => {
    event.preventDefault();

    //search books on google api
    GoogleApi.getBooks(this.state.search)
      .then(res => {
        
        if (res.data.totalItems !== 0) {

          let books = res.data.items.map(book => {
            const { authors, title, description, imageLinks, infoLink } = book.volumeInfo;
            
            return {
              id: book.id,
              title,
              authors: authors.join(", "),
              description,
              image: imageLinks.thumbnail,
              link: infoLink
            }
          });
          
          this.setState({ books });  
        }
        else {
          this.setState({ books: [] });  
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ books: [] });
      });
    
  }

  saveBook = book => {
    API.saveBook(book)
      .then(() => console.log("book saved!"))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() { 
    return (
      <div className="container">
        <h3>Book Search</h3>

        <form onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Book Title"
              aria-label="Book Title"
              aria-describedby="btn-search"
              onChange={this.handleInputChange}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                id="btn-search"
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>

        <h3>Results</h3>
        {this.state.books.length > 0 ? 
          <BookList saveBook={this.saveBook} books={this.state.books} />
          : "No books were found"
        }
      </div>
    );
  }
}
 
export default Search;