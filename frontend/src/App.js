import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  const [input, setInput] = useState({
    title: '',
    content: ''
  })

  const [notes, setNotes] = useState([{
    title: '',
    content: ''
  }])

  useEffect(() => {
    fetch("/notes").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setNotes(jsonRes))
  })

  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  function handleClick(event) {
    event.preventDefault();
    console.log(input);
    const newNote = {
      title: input.title,
      content: input.content
    }
    axios.post("http://localhost:5000/create", newNote)
  }

  return (
    <div className="p-5">

      <div className="p-5">
        <h1>Add Note</h1>
        <form>
          <div className="form-group">
            <input onChange={handleChange} name="title" value={input.title} type="text" className="form-control" placeholder="title" />
          </div>
          <div className="form-group">
            <input onChange={handleChange} name="content" value={input.content} type="textarea" className="form-control" placeholder="add note" />
          </div>
          <button onClick={handleClick} className="btn btn-lg btn-info">Submit</button>
        </form>
      </div>

      <div className="p-5">
        <h1>All Notes</h1>
        {notes.map((note) => {
          return (
          <div>
            <h2>{note.title}</h2>
            <h3>{note.content}</h3>
          </div>
          )
        })}

      </div>



    </div>
  );
}

export default App;
