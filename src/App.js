import { useState } from "react";
import './App.css';
import jsonContacts from "./contacts.json"

function App() {
  const renderedList = jsonContacts.filter((e, index)=> index < 6);
  const [contacts, setContacts] = useState(renderedList);
  const [remainingContacts, setRemainingContacts ] = useState(jsonContacts.slice(6));
  
  function addRandom () {
    const randomIndex = Math.floor(Math.random()*remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    setContacts (contacts => contacts.concat(randomContact));
    console.log("Original contacts: ", contacts);
    setRemainingContacts(remainingContacts => {
      const copy = [...remainingContacts]
      copy.splice(randomIndex, 1);
      return copy;
    });
    return randomContact;
  }

  function sortByPopularity() {
    setContacts(contacts => {
      const copy = [...contacts];
      copy.sort((a,b) => b.popularity - a.popularity);
      console.log("Sorted copy: ", copy);
      return copy;
    });
  }

  function sortByName() {
    setContacts(contacts => {
      const copy = [...contacts];
      copy.sort((a,b) => {
        const surnameA = getSurname(a.name);
        const surnameB = getSurname(b.name);
        return (surnameA < surnameB) ? -1 : 1;
        });
      return copy;
    });
  }

  function getSurname(fullName) {
    const startIndexOfSurname = fullName.indexOf(" ");
    const surName = fullName.slice(startIndexOfSurname);
    return surName;
  }

  function deleteById(id) {
    const filteredContacts = contacts.filter(e => e.id !== id);
    setContacts(filteredContacts);
  }

  return (

    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandom}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(e => {
            return (
              <tr key={e.id}>
                <td><img src={e.pictureUrl} alt="actor" /></td>
                <td><b>{e.name}</b></td>
                <td><b>{e.popularity}</b></td>
                <td>{e.wonOscar ? <i className='fas fa-trophy'></i> : " "} </td>
                <td>{e.wonEmmy ? <i className='fas fa-trophy'></i> : " "} </td>
                <td><button onClick={() => deleteById(e.id)}>Delete</button></td>
            </tr>
            )})}
        </tbody>
      </table>
    </div>
  );
}

export default App;
