import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserManagement = () => {
  const [dynamicUsers, setDynamicUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setDynamicUsers(users);
  }, []);

  const deleteUser = () => {
    if (userToDelete === null) return;

    const updatedUsers = dynamicUsers.filter((_, i) => i !== userToDelete);
    setDynamicUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowModal(false);
    setUserToDelete(null);
  };

  const confirmDelete = (index) => {
    setUserToDelete(index);
    setShowModal(true);
  };

  const editUser = (index) => {
    const userToEdit = dynamicUsers[index];
    const username = prompt("Edit Username:", userToEdit.username);
    const email = prompt("Edit Email:", userToEdit.email);

    if (username && email) {
      const updatedUsers = [...dynamicUsers];
      updatedUsers[index] = { username, email };
      setDynamicUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const filteredUsers = dynamicUsers.filter((user) =>
    `${user.username} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full justify-center items-center flexcol">
      <div className="w-full px-[2%]">
        <div className="mb-4 fixed w-[75.3rem] bg-white mt-[20px]" >
          <input
            type="text"
            placeholder="Search by username or email"
            className="w-full p-2 border border-neutral-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-grow overflow-auto">

        <table className="w-full mx-auto border border-neutral-300  mt-[4.2rem] relative">
          <thead className="bg-black text-white">
            <tr>
              <td className="py-[0.5rem] px-[1rem]">Username</td>
              <td className="py-[0.5rem] px-[1rem]">Email</td>
              <td className="py-[0.5rem] px-[1rem]">Edit</td>
              <td className="py-[0.5rem] px-[1rem]">Delete</td>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr className="border-b border-neutral-300" key={index}>
                  <td className="py-[0.5rem] px-[1rem]">{user.username}</td>
                  <td className="py-[0.5rem] px-[1rem]">{user.email}</td>
                  <td className="py-[0.5rem] px-[1rem]">
                    <button
                      className="bg-green-500 text-white px-[1rem] py-[0.5rem]"
                      onClick={() => editUser(index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-[0.5rem] px-[1rem]">
                    <button
                      className="bg-red-500 text-white px-[1rem] py-[0.5rem]"
                      onClick={() => confirmDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        </div>
       <div className=" mt-[20px] fixed-bottom">
       <Link to="/" className="text-blue-500">Logout?</Link>
       <Link to="/signup" className="ml-[61rem] text-blue-500">Add Another Account</Link>
       </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 mr-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
