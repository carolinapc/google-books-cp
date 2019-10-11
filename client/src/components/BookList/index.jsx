import React from 'react';
import './style.css';

const BookList = props => {
  
  return (
    <>
      {props.books.map(book => {
        const { authors, title, description, imageLinks, infoLink } = book.volumeInfo;
        return (
          <div className="card" key={book.id}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div className="wrap-button">
                <a href={infoLink} target="_blank" rel="noopener noreferrer" className="btn btn-light">View</a>
                <button className="btn btn-light">Save</button>
              </div>
              <h6 className="card-subtitle mb-2 text-muted">Written by {authors}</h6>
              <p className="card-text">
                <img src={imageLinks.thumbnail} alt={title} />
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
 
export default BookList;