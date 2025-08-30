import React from "react";
import { Link } from "react-router-dom";
const Newsitem =(props)=> {
  
    let { title, description, imgUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:'1'}}>
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <Link to={newsUrl} target="_blank" className="btn btn-dark btn-sm">
              Read more...
            </Link>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
