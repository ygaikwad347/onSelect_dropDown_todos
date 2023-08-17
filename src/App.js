import React, { useState, useEffect } from "react";

function NameDropdown() {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch names from the API when the component mounts
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setNames(data))
      .catch((error) => console.error("Error fetching names:", error));
  }, []);

  useEffect(() => {
    // Fetch todos data when a user is selected
    if (selectedUserId !== null) {
      fetch(
        `https://jsonplaceholder.typicode.com/users/${selectedUserId}/todos`
      )
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.error("Error fetching todos:", error));
    }
  }, [selectedUserId]);

  const handleSelectChange = (event) => {
    const selectedUserName = event.target.value;
    setSelectedName(selectedUserName);

    // Find the selected user's ID based on their name
    const selectedUser = names.find((name) => name.name === selectedUserName);
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
    }
  };

  return (
    <div>
      <h1>Name Dropdown</h1>
      <select value={selectedName} onChange={handleSelectChange}>
        <option value="">Select a name</option>
        {names.map((name) => (
          <option key={name.id} value={name.name}>
            {name.name}
          </option>
        ))}
      </select>
      {selectedUserId !== null && (
        <div>
          <h2>Todos for {selectedName}</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NameDropdown;
