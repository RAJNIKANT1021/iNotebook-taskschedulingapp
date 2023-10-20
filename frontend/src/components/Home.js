import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
const Home = ({showAlert}) => {
  const navigate=useNavigate();
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [usedata, setuserdata] = useState("");
  const [notedata, setnodedata] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    // console.log(e.target.name)
    setnodedata({ ...notedata, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    addNote(notedata.title, notedata.description, notedata.tag,showAlert);
    setnodedata({ title: "", description: "", tag: "" });
  };
  const fetcher = async () => {
    let authtoks = localStorage.getItem("token");

    if (authtoks.length === 0) return;
    try {
      const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authtoks}`,
        },
      });

      const json = await response.json();

      setuserdata(json.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
    fetcher();}else{
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }

  return (
    <div className="container my-3 text-light">
      <div className="d-flex justify-content-around flex-wrap">
        <div className="hey ml-auto  my-3 p-3 bg-dark">
          <h2
            className="d-flex align-items-center justify-content-center pb-1 px-2"
            style={{ maxWidth: "46rem" }}
          >
            User details
          </h2>
          <hr></hr>
          <div className="circleavtar m-auto">
            <img
              src="https://static.wixstatic.com/media/c95985_ccdb9d92abdd41459ee70b7bf20bbd82~mv2.gif"
              alt="dp"
            />
          </div>
          <div className="my-2 p-2 d-flex flex-column">
            <span
              className="my-1 text-light mx-2"
              style={{ display: "inline-block" }}
            >
              Name: <span className="mx-2 text-primary">{usedata.name}</span>{" "}
            </span>

            <span
              className="my-1 text-light mx-2"
              style={{ display: "inline-block" }}
            >
              Email: <span className="mx-1 text-primary">{usedata.email}</span>{" "}
            </span>

            <button
              type="submit"
              className="p-1 my-4 btn btn-danger "
              onClick={handleLogout}
            >
              Exit the notebook
            </button>
          </div>
        </div>
        <div
          className="hey my-3 p-3 bg-dark align-items-center"
          style={{ width: "44rem" }}
        >
          <h2 className="d-flex align-items-center justify-content-center pb-1 px-2 inline-block">
            Record a New Entry
          </h2>
          <hr></hr>
          <form className="mx-4 align-items-center justify-content-center ">
            <div className="row mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <div className="col-s-10">
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="title"
                  name="title"
                  value={notedata.title}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <div className="col-s-10">
                <textarea
                  rows="5"
                  cols="33"
                  id="desc"
                  name="description"
                  className="form-control bg-dark text-light"
                  onChange={onChange}
                  value={notedata.description}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="tag" className="form-label">
                Tags
              </label>
              <div className="col-s-10">
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="tag"
                  name="tag"
                  onChange={onChange}
                  value={notedata.tag}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success "
              onClick={handleClick}
            >
              Submit a Record
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <Notes showAlert={showAlert}/>
      </div>
    </div>
  );
};

export default Home;
