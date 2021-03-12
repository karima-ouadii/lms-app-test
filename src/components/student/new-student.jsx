import React from 'react';

export default function NewStudent(props) {
    return (
            <div className="col-4 border p-5">
          <div className="avatar border mx-auto mt-5 " 
          style={{
            backgroundImage:`url(${
            props.avatar || "http://placekitten.com/g/200/300"
          })`,
          backgroundSize:"cover"
          }}
           />
          <form 
          onSubmit={props.handleSubmit} autoComplete="off">
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="nom"
                placeholder="Firstname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="pren"
                placeholder="Lastname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="email"
                placeholder="Email address"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="avatar"
                placeholder="Url Avatar"
                type="text"
                className="form-control"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Add Student <i className="fas fa-plus-circle" />
              </button>
            </div>
          </form>
        </div>
    )
}
