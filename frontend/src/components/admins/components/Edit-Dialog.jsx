import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
Input
const EditDialog = ({editUser,setEditUser,handleEditSubmit}) => {
    return (
        <div>
            <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Make changes to the user&apos;s information below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={editUser?.email || ''}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export { EditDialog }
