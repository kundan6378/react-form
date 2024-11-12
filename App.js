import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
   const [form, setForm] = useState({})


    function handleForm(event){
        
        setForm({
            ...form, 
            [event.target.name] : event.target.value
        })
        
    }

    async function handleSubmit(event){
        event.preventDefault();

        const response = await fetch('http://localhost:8080/demo',{
            method:'POST',
            body: JSON.stringify(form),  // Send form data as JSON
            headers: {
                'Content-Type': 'application/json'
            }
          })

          const data = await response.json();
        console.log(data);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        
            <span>username</span>
            <input type="text" name="username" onChange={handleForm}></input>
                
            <span>password</span>
            <input type="text" name="password" onChange={handleForm}></input>

            <input type="submit"></input>
        </form>
    </div>
  )
}

export default App;
