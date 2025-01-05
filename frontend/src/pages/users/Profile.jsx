import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, User, Camera, Loader2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, editUserProfile, setData } from '@/slice/user/userProfile';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const data = useSelector((state) => state.userProfile.data);
  const loading = useSelector((state) => state.userProfile.loading);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [editedUser, setEditedUser] = useState(data);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

 

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setEditedUser(data);
  }, [data]);

  const handleImageClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleProfilePhotoClick = () => {
    if (data.photo) {
      setShowImagePreview(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          setPreviewImage(result);
          setEditedUser(prev => ({ ...prev, photo: file }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      if (editedUser.photo instanceof File) {
        formData.append('file', editedUser.photo);
      }
      formData.append('username', editedUser.username);
      formData.append('email', editedUser.email);
      formData.append('role', editedUser.role);
      if (editedUser.password && editedUser.password !== '••••••••') {
        formData.append('password', editedUser.password);
      }

      await dispatch(editUserProfile({ 
        userId: data._id,
        payload: formData 
      })).unwrap();

      // Update the UI with all new data
      const updatedUserData = {
        ...editedUser,
        photo: previewImage || editedUser.photo,
        password: '••••••••'
      };
      dispatch(setData(updatedUserData));

      // Close dialog and clear preview
      setShowEditDialog(false);
      setPreviewImage(null);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      // Fetch fresh data from server
      dispatch(fetchUserProfile()).unwrap();
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description:error || "Failed to update profile in profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      editedUser.username?.trim() &&
      editedUser.email?.trim() &&
      emailRegex.test(editedUser.email)
    );
  };

  if (loading && !data.email) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and manage your account details</CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowEditDialog(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="cursor-pointer" onClick={handleProfilePhotoClick}>
                <Avatar className="h-24 w-24">
                  <AvatarImage src={data.photo} alt={data.username} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <div className="p-2 bg-gray-100 rounded-md">{data.username}</div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <div className="p-2 bg-gray-100 rounded-md">{data.email}</div>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <div className="p-2 bg-gray-100 rounded-md capitalize">{data.role}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile information here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="relative cursor-pointer group"
                    onClick={handleImageClick}
                    role="button"
                    tabIndex={0}
                  >
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={previewImage || editedUser.photo}
                        alt={editedUser.username}
                      />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleImageClick}
                  >
                    Change Profile Picture
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={editedUser.username}
                    onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={editedUser.role}
                    onValueChange={(value) => setEditedUser({ ...editedUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isLoading || !validateForm()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Image Preview Dialog */}
        <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Profile Picture</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setShowImagePreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="flex justify-center items-center p-4">
              <img
                src={data.photo}
                alt={data.username}
                className="max-w-full max-h-[500px] object-contain rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;