import React from 'react';

export default function NewStudent(props) {
    return (
            <div className="col-4 border p-5">
          <div 
          className="avatar border mx-auto mt-5 " 
          style={{
            backgroundImage:`url(${
            props.avatar || "http://placekitten.com/g/200/300"
          })`,
          backgroundSize:"cover"
          }}
           />
          <form 
          onSubmit={props.action=="ADD" ? props.handleAddSubmit: props.handleEditSubmit} 
          autoComplete="off">
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="nom"
              value={props.nom}
                placeholder="Firstname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="pren"
              value={props.pren}
                placeholder="Lastname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="email"
              value={props.email}
                placeholder="Email address"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input onChange={props.changeInput}
              name="avatar"
              value={props.avatar}
                placeholder="Url Avatar"
                type="text"
                className="form-control"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <i className={props.iconBtn} />{props.textBtn}
              </button>
            </div>
          </form>
        </div>
    )
}
