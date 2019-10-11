import React from 'react';
import API from '../../utils/API';
import BookList from '../../components/BookList';

class Saved extends React.Component {
  state = { books: [] };

  componentDidMount = () => {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(() => this.loadBooks())
      .catch(err => console.log(err));
  }

  render() { 
    return (
      <div className="container">
        <h3>Saved Books</h3>
        {this.state.books.length > 0 ? 
          <BookList deleteBook={this.deleteBook} books={this.state.books} />
          : "No books were found"
        }
      </div>
    );
  }
}
 
export default Saved;