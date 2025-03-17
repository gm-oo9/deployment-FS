import axios from "axios";

const baseUrl = '/api/persons';
const DeleteButton = ({ personId, personName, setPersons,setGreenNotificationMessage, setRedNotificationMessage }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${personName}?`)) {
      axios.delete(`${baseUrl}/${personId}`)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== personId));
          setGreenNotificationMessage(`Deleted ${personName}`);
          setTimeout(() => {
          setGreenNotificationMessage(null);}, 5000);
        })
        .catch(error => {console.error('Error deleting: ', error)
          setRedNotificationMessage(`Error deleting ${personName}`);
          setTimeout(() => {
          setRedNotificationMessage(null);}, 5000);
          });
       
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

const FilterPerson = ({ filteredPersons, setPersons, setGreenNotificationMessage, setRedNotificationMessage }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>
            {person.name} {person.number} 
            <DeleteButton personId={person.id} personName={person.name} setPersons={setPersons} setGreenNotificationMessage={setGreenNotificationMessage} setRedNotificationMessage={setRedNotificationMessage} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddNewName = ({ addPerson, newName, handleNameChange, handleNumberChange, newNumber }) => {
  return (
    <div>
      <h2>Add a new name</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>Name: <input type="text" value={newName} onChange={handleNameChange} /></p>
          <p>PhoneNo: <input type="text" value={newNumber} onChange={handleNumberChange} /></p>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
      
    </div>
  );
};

const FilterText = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      <h2>PhoneBook</h2>
      <p>Filter shown with Name: <input type="text" value={filterName} onChange={handleFilterChange} /></p>
    </div>
  );
};

export { FilterText, AddNewName, FilterPerson };
