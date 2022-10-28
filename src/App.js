
import { useEffect, useState } from 'react';
import './App.css';

function App() {

const [users, setUsers] = useState([]);

useEffect(() =>{
  fetch("http://localhost:5000/users")
  .then(res => res.json())
  .then(data => setUsers(data))
},[])

const handleAddUser = event =>{
  event.preventDefault()
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const user = {name, email};
  console.log(user);
  fetch("http://localhost:5000/users", {
    method:"POST",
    headers: {
      'content-type': 'application/json' 
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  form.reset()
}

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Your Name' />
        <br />
        <input type="email" name="email" id="" placeholder='Your Email Id' />
        <br />
        <button type='submit'>Add User</button>
      </form>
      <h2>Users: {users.length}</h2>
      <div>
        {
          users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
