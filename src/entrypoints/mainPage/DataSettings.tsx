import React from 'react';
import { StorageManager } from '@/modules/storage';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const DataSettings = () => {
    const handleDeleteAllData = async () => {
        try {
            console.log('Deleting all data...');
            await StorageManager.clearAllData();
            toast.success('All data successfully deleted.');
            // Optionally, trigger a refresh or state update if needed
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Failed to delete data.');
        }
    };

    const handleBackup = async () => {
        try {
            const data = await StorageManager.getAllStoredData();
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
            a.download = `timeeo_backup_${date}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast.success('Data backup downloaded.');
        } catch (error) {
            console.error('Error backing up data:', error);
            toast.error('Failed to backup data.');
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Data Management</h2>

            <div>
                <h3 className="text-md font-medium mb-2">Backup Data</h3>
                <p className="text-sm text-muted-foreground mb-2">
                    Download a JSON file containing all your tracked time data.
                </p>
                <Button onClick={handleBackup} variant="outline">
                    Download Backup
                </Button>
            </div>

            <div>
                <h3 className="text-md font-medium mb-2">Delete Data</h3>
                <p className="text-sm text-muted-foreground mb-2">
                    Permanently delete all tracked time data. This action cannot
                    be undone.
                </p>
                <div>
                    <Button onClick={handleDeleteAllData} variant="destructive">
                        Delete All Data (No Confirmation)
                    </Button>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete All Data</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete all your time tracking data
                                from this browser&apos;s local storage.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAllData}>
                                Yes, delete everything
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default DataSettings;
