import { useState } from 'react';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteUserForm({ id }: { id: number }) {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const deleteUser = () => {
        setSubmitting(true);

        router.delete(`/users/${id}`, {
            onError: (error) => console.error(error)
        });
    };

    return (
        <>
            <DangerButton onClick={() => setOpen(true)} className={'mr-4'}>
                Delete
            </DangerButton>

            <Modal show={open} onClose={() => setOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Deleting this user account will revoke their access immediately.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton type={'button'} onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton type={'button'} className="ms-3" disabled={submitting} onClick={deleteUser}>
                            Delete Account
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
