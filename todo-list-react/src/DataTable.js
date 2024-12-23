import React from "react";
import "./App.css";

const DataTable = ({ data }) => {
  return (
    <div className="table_container">
      <table className="task_table">
        <thead>
          <tr>
            <th>✓</th>
            <th>Task</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.checkbox}</td>
              <td>{item.task}</td>
              <td>{item.duedate || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
