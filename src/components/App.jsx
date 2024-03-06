import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../store/contactsSlice';
import './App.css'; 

function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = event => setName(event.target.value);
  const handlePhoneChange = event => setPhone(event.target.value);

  const handleAddContact = event => {
    event.preventDefault();
    dispatch(addContact({ id: Date.now(), name, phone }));
    setName('');
    setPhone('');
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    handleAddContact(event);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container"> 
      <h1>Phonebook</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="inputGroup">
          <input className="input" type="text" value={name} onChange={handleNameChange} placeholder="Name" />
          <input className="input" type="text" value={phone} onChange={handlePhoneChange} placeholder="Phone" />
        </div>
        <button className="button" type="submit">Add Contact</button> 
      </form>
      <input className="input" type="text" value={filter} onChange={handleFilterChange} placeholder="Filter contacts" />
      <h2>Contacts</h2>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button className="button-delete" onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
