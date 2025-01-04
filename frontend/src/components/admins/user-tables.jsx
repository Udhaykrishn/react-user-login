import { useState, useMemo } from 'react';
import axios from 'axios';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog, EditDialog, BlockDialog, DropdownMenuList, PaginationList } from '@/components/admins/components';

const ITEMS_PER_PAGE = 5;

const UserList = ({ data = [], setUserList }) => {
  const [editUser, setEditUser] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return data.filter(user =>
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));

  // Ensure currentPage stays within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  if (currentPage !== validCurrentPage) {
    setCurrentPage(validCurrentPage);
  }

  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleBlockAction = (user) => {
    setSelectedUser(user);
    setShowBlockDialog(true);
  };

  const handleBlockConfirm = async () => {
    try {
      const response = await axios.patch(`admin/dashboard/update/${selectedUser._id}`, {
        isBlocked: !selectedUser.isBlocked
      });



      if (response.data.success) {
        setUserList(prevUsers =>
          prevUsers.map(user =>
            user._id === response.data.user._id
              ? { ...user, isBlocked: !user.isBlocked }
              : user
          )
        );

      }
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
    setShowBlockDialog(false);
    setSelectedUser(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/admin/dashboard/update/${editUser._id}`, {
        email: editUser.email
      });

      if (response.data) {
        setUserList(prevUsers =>
          prevUsers.map(user =>
            user.id === editUser.id
              ? { ...user, email: editUser.email }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setEditUser(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/admin/dashboard/delete/${selectedUser._id}`);

      if (response.data.success) {
        setUserList((prevList) => prevList.filter(user => user._id !== selectedUser._id));
      } else {
        alert("error", response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setShowDeleteDialog(false);
    setSelectedUser(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const shouldShowPagination = filteredUsers.length > ITEMS_PER_PAGE;

  const getStatusIcon = (isBlocked) => {
    return isBlocked ?
      <XCircle className="h-4 w-4 text-red-500" /> :
      <CheckCircle2 className="h-4 w-4 text-green-500" />;
  };

  if (!Array.isArray(data)) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No user data available
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-8"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500">
          No users found
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">{user?.email}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user?.isBlocked)}
                        <Badge variant={user?.isBlocked ? "destructive" : "success"}>
                          {user?.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <DropdownMenuList handleBlockAction={handleBlockAction} handleDelete={handleDelete} handleEdit={handleEdit} user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {shouldShowPagination && (
            <PaginationList currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />
          )}
        </>
      )}

      {/* Edit User Dialog */}
      <EditDialog editUser={editUser} handleEditSubmit={handleEditSubmit} setEditUser={setEditUser} />

      {/* Delete Confirmation Dialog */}

      <DeleteDialog handleDeleteConfirm={handleDeleteConfirm} setShowDeleteDialog={setShowDeleteDialog} showDeleteDialog={showDeleteDialog} />

      {/* Block/Unblock Confirmation Dialog */}
      <BlockDialog handleBlockConfirm={handleBlockConfirm} selectedUser={selectedUser} setShowBlockDialog={setShowBlockDialog} showBlockDialog={showBlockDialog} />
    </div>
  );
};

export default UserList;