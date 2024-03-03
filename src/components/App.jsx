import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from './contactsSlice';
import styles from './App.css';

function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = event => setName(event.target.value);
  const handlePhoneChange = event => setPhone(event.target.value);

  const handleAddContact = () => {
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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter contacts" />
      <h2>Add new contact</h2>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Phone" />
      <button onClick={handleAddContact}>Add Contact</button>
      <h2>Contacts</h2>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
