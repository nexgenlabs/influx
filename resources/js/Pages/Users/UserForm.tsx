import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { User } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './DeleteUserForm';

export default function UserForm({ user }: { user?: User }) {
    const [values, setValues] = useState({
        email: user?.email ?? '',
        name: user?.name ?? '',
        password: '',
        superuser: user?.superuser ?? false,
    });

    function handleChange(e: {
        target: { id: string; value: string | boolean };
    }) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();

        if (user) {
            router.put(`/users/${user!.id}`, values);
        } else {
            router.post('/users/new', values);
        }
    }

    return (
        <form
            className="lg:col-span-2"
            autoComplete={'off'}
            onSubmit={handleSubmit}
        >
            <div className="group relative z-0 mb-5 w-full">
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
                    placeholder=" "
                    defaultValue={user?.email}
                    required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-600 dark:text-gray-400 peer-focus:dark:text-green-500">
                    Email address
                </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
                    placeholder=" "
                    required={!user}
                />
                <label
                    htmlFor="password"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-green-500"
                >
                    Password
                </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={user?.name}
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
                        placeholder=" "
                        onChange={handleChange}
                        required
                    />
                    <label
                        htmlFor="name"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-green-500"
                    >
                        Username
                    </label>
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        id="superuser"
                        type="checkbox"
                        defaultChecked={user?.superuser}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600 dark:focus:ring-offset-gray-800"
                    />
                    <label
                        htmlFor="superuser"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Grant this account Superuser permissions
                    </label>
                </div>
            </div>
            <div className={'text-right'}>
                {user && (
                    <DeleteUserForm id={user!.id} />
                )}
                <PrimaryButton type={'submit'}>{user ? 'Update' : 'Create'} User</PrimaryButton>
            </div>
        </form>
    );
}
