import React from 'react';

const Error = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error!</h4>
            <p>Page Not Found!!</p>
            <hr />
            <p className="mb-0">Please check the URL and try again.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
