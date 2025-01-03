import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Ban, MoreHorizontal, Pencil, Trash } from "lucide-react"


export const DropdownMenuList = ({ handleEdit, user, handleDelete, handleBlockAction }) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleDelete(user)}
                        className="text-red-500 focus:text-red-500"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleBlockAction(user)}
                        className={user?.isBlocked ? "text-green-500 focus:text-green-500" : "text-red-500 focus:text-red-500"}
                    >
                        <Ban className="mr-2 h-4 w-4" />
                        {user?.isBlocked ? "Unblock" : "Block"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
