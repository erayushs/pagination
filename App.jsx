import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const usersPerPage = 10;

  // --------------FETCHING USERS FROM API--------

  useEffect(() => {
    fetchApi();
  }, []);

  async function fetchApi() {
    try {
      let data = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      let json = await data.json();
      setUsers(json);
    } catch (e) {
      console.log(e);
    }
  }

  // ------------------------------------------------

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>
        <p>{currentPage}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
