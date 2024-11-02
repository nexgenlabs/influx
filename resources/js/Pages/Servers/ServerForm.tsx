import PrimaryButton from '@/Components/PrimaryButton';
import { Server, User } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function ServerForm({ server, users, owner }: { server?: Server, users?: User[], owner?: User }) {
    const [values, setValues] = useState({
        name: server?.name ?? '',
        address: server?.address ?? '',
        owner_id: server?.ownerId ?? 0,
        public: server?.public ?? false,
    });

    function handleChange(e: {
        target: { id: string; value: string | boolean | number };
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

        if (server?.id) {
            router.put(`/servers/${server!.id}`, values);
        } else {
            router.post('/servers/new', values);
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
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
                    placeholder=" "
                    defaultValue={server?.name}
                    required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-600 dark:text-gray-400 peer-focus:dark:text-green-500">
                    Server name
                </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
                <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
                    placeholder=" "
                    defaultValue={server?.address}
                    required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-600 dark:text-gray-400 peer-focus:dark:text-green-500">
                    Server IP/FQDN Address
                </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                    <select
                        name="owner_id"
                        id="owner_id"
                        defaultValue={server?.ownerId}
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
                        onChange={(e) => setValues({ ...values, owner_id: parseInt(e.currentTarget.value) })}
                    >
                        {server && owner ? (
                            <option value={server.ownerId}>
                                {owner?.name} ({owner?.email})
                            </option>
                        ) : (
                            <option value={0}></option>
                        )}
                        {users?.filter(x => x.id !== owner?.id).map((user) => (
                            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                        ))}
                    </select>
                    <label
                        htmlFor="name"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-green-500"
                    >
                        Server Owner
                    </label>
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        id="public"
                        type="checkbox"
                        defaultChecked={server?.public}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600 dark:focus:ring-offset-gray-800"
                    />
                    <label
                        htmlFor="superuser"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Allow this server to be viewed publicly
                    </label>
                </div>
            </div>
            <div className={'text-right'}>
                <PrimaryButton type={'submit'}>{server ? 'Update' : 'Create'} Server</PrimaryButton>
            </div>
        </form>
    );
}
