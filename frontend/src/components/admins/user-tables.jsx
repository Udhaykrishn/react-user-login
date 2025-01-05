import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  updateUserBlockStatus,
  deleteUser,
  editUser,
  setSearchQuery,
  setCurrentPage,
  selectPaginatedUsers,
  selectTotalPages,
  selectFilteredUsers
} from '@/slice/admin/userSlice';
import { CheckCircle2, Plus, Search, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Input } from '@/components/ui/input';
import {
  BlockDialog,
  DeleteDialog,
  DropdownMenuList,
  EditDialog,
  PaginationList,
  CreateUserDialog
} from './components';
import { Button } from '../ui/button';

const UserList = () => {
  const { toast } = useToast()
  const dispatch = useDispatch();

  const [editUserData, setEditUserData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


  const paginatedUsers = useSelector(selectPaginatedUsers)
  const totalPages = useSelector(selectTotalPages)
  const currentPage = useSelector(state => state.users.currentPage)
  const searchQuery = useSelector(state => state.users.searchQuery)
  const loading = useSelector(state => state.users.loading)
  const isAdmin = useSelector(state => state.adminAuth.isAdmin)
 const filteredUsers = useSelector(selectFilteredUsers);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, isAdmin])

  const handleEdit = (user) => {
    setEditUserData(user);
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
      await dispatch(updateUserBlockStatus({
        userId: selectedUser._id,
        isBlocked: selectedUser.isBlocked
      })).unwrap();

      toast({
        title: "Success",
        description: `User ${selectedUser.isBlocked ? 'unblocked' : 'blocked'} successfully`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error || "Failed to update user status",
        variant: "destructive",
      });
    }
    setShowBlockDialog(false);
    setSelectedUser(null);

  }


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editUser({
        userId: editUserData._id,
        email: editUserData.email
      })).unwrap()

      toast({
        title: "Success",
        description: "User edit success",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to edit user",
        variant: "destructive",
      });
    }
    setEditUserData(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteUser(selectedUser._id)).unwrap()
      toast({
        title: "Success",
        description: "User deleted successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error || "Failed to delete user",
        variant: "destructive",
      });
    }
    setShowDeleteDialog(false);
    setSelectedUser(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page))
    }
  };
  ;

  const getStatusIcon = (isBlocked) => {
    return isBlocked ?
      <XCircle className="h-4 w-4 text-red-500" /> :
      <CheckCircle2 className="h-4 w-4 text-green-500" />;
  };
  if (loading) {
    return <div className="w-full p-4 text-center">Loading...</div>;
  }

  return (
    <div className="w-full p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="pl-8"
        />
      </div>
      <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add User
      </Button>

      {paginatedUsers.length === 0 ? (
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
                        <Badge className={user?.isBlocked ? "bg-red-500 " : "bg-green-400"}>
                          {user?.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <DropdownMenuList
                        handleBlockAction={handleBlockAction}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        user={user}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {filteredUsers.length > 5 && (
            <PaginationList
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </>
      )}

      {/* Create User Dialog */}

      <CreateUserDialog setIsOpen={setIsCreateModalOpen} isOpen={isCreateModalOpen} />

      {/* Edit User Dialog */}
      <EditDialog
        editUser={editUserData}
        handleEditSubmit={handleEditSubmit}
        setEditUser={setEditUserData}
      />

      {/* Delete Confirmation Dialog */}

      <DeleteDialog
        handleDeleteConfirm={handleDeleteConfirm}
        setShowDeleteDialog={setShowDeleteDialog}
        showDeleteDialog={showDeleteDialog}
      />
      {/* Block/Unblock Confirmation Dialog */}
      <BlockDialog
        handleBlockConfirm={handleBlockConfirm}
        selectedUser={selectedUser}
        setShowBlockDialog={setShowBlockDialog}
        showBlockDialog={showBlockDialog}
      />
    </div>
  );
};

export default UserList;