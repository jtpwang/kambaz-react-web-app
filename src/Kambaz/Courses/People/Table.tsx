import { useState, useEffect, useCallback } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { FaUserCircle, FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";

// Define a User interface to avoid any types
interface User {
    _id: string;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    section: string;
    loginId: string;
    lastActivity?: string;
    totalActivity?: string;
    [key: string]: any; // Allow dynamic properties
}

export default function PeopleTable({ currentUser }: { currentUser?: any }) {
    const { cid } = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    
    // get current user from props or Redux to determine permissions
    const effectiveUser = currentUser || useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = effectiveUser && effectiveUser.role === "FACULTY";
    
    // initialize empty user form
    const emptyUser: User = {
        _id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "STUDENT",
        section: "",
        loginId: ""
    };
    
    // load users enrolled in course
    const fetchUsers = useCallback(async () => {
        if (!cid) return;
        
        setLoading(true);
        setError(null);
        
        try {
            console.log(`Fetching users for course ${cid}...`);
            const loadedUsers = await client.findUsersEnrolledInCourse(cid);
            console.log(`Users fetched for course ${cid}:`, loadedUsers);
    
            if (!loadedUsers || !Array.isArray(loadedUsers) || loadedUsers.length === 0) {
                console.warn(`No enrolled users found for course ${cid}`);
            }
    
            setUsers(loadedUsers || []);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Failed to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [cid]);
    
    // fetch users when component mounts
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    // update a single field in the editing user
    const updateField = (field: string, value: string) => {
        setEditingUser((prev: User | null) => {
            if (!prev) return prev;
            return {
                ...prev,
                [field]: value
            };
        });
    };
    
    // handle user form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        
        try {
            if (editingUser._id) {
                // update existing user
                await client.updateUser(editingUser._id, editingUser);
            } else {
                // create new user
                await client.createUser(editingUser);
            }
            setShowUserModal(false);
            fetchUsers(); // reload user list
        } catch (err) {
            console.error("Failed to save user:", err);
            setError("Failed to save user, please try again later.");
        }
    };
    
    // handle delete user
    const handleDelete = async () => {
        if (!editingUser || !editingUser._id) return;
        
        try {
            await client.deleteUser(editingUser._id);
            setShowDeleteModal(false);
            fetchUsers(); // reload user list
        } catch (err) {
            console.error("Failed to delete user:", err);
            setError("Failed to delete user, please try again later.");
        }
    };
    
    // open add user modal
    const handleAddUser = () => {
        setEditingUser({...emptyUser});
        setShowUserModal(true);
    };
    
    // open edit user modal
    const handleEditUser = (user: User) => {
        setEditingUser({...user});
        setShowUserModal(true);
    };
    
    // open delete confirmation modal
    const handleDeleteUser = (user: User) => {
        setEditingUser(user);
        setShowDeleteModal(true);
    };
    
    // Add debug log
    useEffect(() => {
        console.log("PeopleTable component info:", {
            courseId: cid,
            currentUser: effectiveUser,
            isFaculty
        });
    }, [cid, effectiveUser, isFaculty]);
    
    // show loading state
    if (loading) {
        return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"></div></div>;
    }
    
    // show error message
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }
    
    return (
        <div id="wd-people-table">
            {/* user edit/create modal */}
            <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingUser && editingUser._id ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editingUser?.username || ""} 
                                onChange={(e) => updateField("username", e.target.value)}
                                required 
                            />
                        </Form.Group>
                        {!editingUser?._id && (
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={editingUser?.password || ""} 
                                    onChange={(e) => updateField("password", e.target.value)}
                                    required={!editingUser?._id} 
                                />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editingUser?.firstName || ""} 
                                onChange={(e) => updateField("firstName", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editingUser?.lastName || ""} 
                                onChange={(e) => updateField("lastName", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={editingUser?.email || ""} 
                                onChange={(e) => updateField("email", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Login ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editingUser?.loginId || ""} 
                                onChange={(e) => updateField("loginId", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Section</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={editingUser?.section || ""} 
                                onChange={(e) => updateField("section", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select 
                                value={editingUser?.role || "STUDENT"} 
                                onChange={(e) => updateField("role", e.target.value)}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="ADMIN">Admin</option>
                                <option value="USER">User</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowUserModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            
            {/* delete confirmation modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete user {editingUser?.firstName} {editingUser?.lastName}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* top control buttons - only visible to faculty */}
            {isFaculty && (
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="primary" onClick={handleAddUser}>
                        <FaPlus className="me-1" /> Add User
                    </Button>
                </div>
            )}
            
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                        {isFaculty && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.filter(user => user !== null).map((user: User) => (
                        <tr key={user._id || 'unknown'}>
                            <td className="wd-full-name text-nowrap">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span className="wd-first-name">{user.firstName || 'unknown'}</span>{" "}
                                <span className="wd-last-name">{user.lastName || 'unknown'}</span>
                            </td>
                            <td className="wd-login-id">{user.loginId || 'N/A'}</td>
                            <td className="wd-section">{user.section || 'N/A'}</td>
                            <td className="wd-role">{user.role || 'N/A'}</td>
                            <td className="wd-last-activity">{user.lastActivity || 'N/A'}</td>
                            <td className="wd-total-activity">{user.totalActivity || 'N/A'}</td>
                            {isFaculty && (
                                <td>
                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditUser(user)}>
                                        <FaPencilAlt />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUser(user)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
