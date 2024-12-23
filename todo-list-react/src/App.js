import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // Track which row is being edited

  // Function to add a new row
  const addRow = () => {
    const newRow = { id: Date.now(), task: "New Task", duedate: "N/A", checked: false };
    setData([...data, newRow]);
  };

  // Handle checkbox and fade-out
  const handleCheck = (index) => {
    const updatedData = data.map((row, i) =>
      i === index ? { ...row, checked: true } : row
    );
    setData(updatedData);

    setTimeout(() => {
      setData((prevData) => prevData.filter((_, i) => i !== index));
    }, 500);
  };

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedData = data.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setData(updatedData);
  };

  // Toggle editing mode
  const toggleEdit = (index) => {
    setEditingRow(index);
  };

  // Save changes (placeholder for database update)
  const saveChanges = () => {
    console.log("Changes saved:", data); // This will later push changes to a database
    setEditingRow(null); // Exit editing mode
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const result = [
        { id: 1, task: "Call Mom", duedate: "December 25th", checked: false },
        { id: 2, task: "Do Homework", duedate: "N/A", checked: false },
        { id: 3, task: "Buy Groceries", duedate: "N/A", checked: false },
      ];
      setData(result);
    };

    fetchData();
  }, []);

  // Return JSX
  return (
    <div className="App">
      <div id="header_intro">
        <article>
          <header>
            <h1>To-Do List</h1>
            <p>By Mitchel Anderson | 2024</p>
          </header>
        </article>
      </div>
      <div>
        <button onClick={addRow} className="add_row_button">Add Row</button>
        <button onClick={saveChanges} className="save_changes_button">Save Changes</button>
      </div>
      <div className="task_table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className={row.checked ? "fade-out" : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={row.checked}
                    onChange={() => handleCheck(index)}
                  />
                </td>
                <td onClick={() => toggleEdit(index)}>
                  {editingRow === index ? (
                    <input
                      type="text"
                      value={row.task}
                      onChange={(e) => handleInputChange(index, "task", e.target.value)}
                    />
                  ) : (
                    row.task
                  )}
                </td>
                <td onClick={() => toggleEdit(index)}>
                  {editingRow === index ? (
                    <input
                      type="text"
                      value={row.duedate}
                      onChange={(e) => handleInputChange(index, "duedate", e.target.value)}
                    />
                  ) : (
                    row.duedate
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Render the App component into the DOM
const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
