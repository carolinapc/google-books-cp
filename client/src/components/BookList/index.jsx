import React from 'react';
import './style.css';

const BookList = props => {
  
  return (
    <>
      {props.books.map(book => {
        const { id, authors, title, description, image, link } = book;
        return (
          <div className="card" key={id}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div className="wrap-button">
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary"><i className="fas fa-external-link-alt"></i> View</a>
                <button className="btn btn-outline-secondary" onClick={()=> props.saveBook(book)}><i className="fas fa-cloud"></i> Save</button>
              </div>
              <h6 className="card-subtitle mb-2 text-muted">Written by {authors}</h6>
              <p className="card-text">
                <img src={image} alt={title} />
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