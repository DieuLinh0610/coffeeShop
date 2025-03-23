import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTransition from "@/components/ui/PageTransition";
import { getAllUsers, addUser } from "@/lib/apis/userApi";
import { deleteUser } from "@/lib/apis/userApi";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    gender: "male",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setShowAddUserModal(false);
      fetchUsers();
      setNewUser({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        location: "",
        gender: "male",
        role: "user",
      });
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">User Management</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-10 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
                  title="Add User"
                >
                  <UserPlus className="h-5 w-5" />
                  Add User
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-indigo-50 text-indigo-600 text-sm font-medium leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Location</th>
                  <th className="py-3 px-6 text-left">Join Date</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 text-gray-700"
                  >
                    <td className="py-3 px-6 whitespace-nowrap">
                      <p className="font-medium">{user.userName}</p>
                    </td>
                    <td className="py-3 px-6">
                      <p className="text-sm">{user.email}</p>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-6">{user.location}</td>
                    <td className="py-3 px-6 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition"
                          title="Delete"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No users found. Try adjusting your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <button onClick={() => setShowAddUserModal(false)} title="Close">
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <Input
              placeholder="User Name"
              value={newUser.userName}
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
              className="mb-4"
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="mb-4"
            />
            <Input
              placeholder="Password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="mb-4"
            />
            <Input
              placeholder="Location"
              value={newUser.location}
              onChange={(e) =>
                setNewUser({ ...newUser, location: e.target.value })
              }
              className="mb-4"
            />
            <Button
              className="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleAddUser}
              title="Add User"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default Users;
