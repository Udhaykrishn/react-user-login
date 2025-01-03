import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export const BlockDialog = ({showBlockDialog,setShowBlockDialog,selectedUser,handleBlockConfirm}) => {
    return (
        <div>
            <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
                <AlertDialogContent
                    className={`border-l-4 ${selectedUser?.isBlocked ? 'border-green-500' : 'border-red-500'}`}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle className={selectedUser?.isBlocked ? 'text-green-500' : 'text-red-500'}>
                            {selectedUser?.isBlocked ? 'Unblock User' : 'Block User'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {selectedUser?.isBlocked ? 'unblock' : 'block'} this user?
                            {!selectedUser?.isBlocked && ' They will not be able to access the system.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleBlockConfirm}
                            className={selectedUser?.isBlocked ?
                                'bg-green-500 hover:bg-green-600' :
                                'bg-red-500 hover:bg-red-600'
                            }
                        >
                            {selectedUser?.isBlocked ? 'Unblock' : 'Block'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
