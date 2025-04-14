import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { User } from "../../contexts/UserContext";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>
      <select 
        value={role} 
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <input 
        onChange={(e) => filterUsersByName(e.target.value)} 
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name" 
        value={name}
      />
      <div className="clearfix mb-3"></div>
      <PeopleTable users={users} />
    </div>
  );
}
