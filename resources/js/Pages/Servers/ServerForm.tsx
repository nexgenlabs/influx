import PrimaryButton from '@/Components/PrimaryButton';
import { Server, User } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';

export default function ServerForm({ server, users, owner }: { server?: Server, users?: User[], owner?: User }) {
    const [values, setValues] = useState({
        name: server?.name ?? '',
        address: server?.address ?? '',
        owner_id: server?.owner_id ?? 0,
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

    const options = users?.map(user => ({
        value: user.id,
        label: user.email
    }));

    const customStyles: StylesConfig = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#27272a', // bg-zinc-800
            borderColor: '#4b5563', // Default border color
            boxShadow: 'none', // Remove default shadow
            '&:hover': {
                borderColor: '#065f46', // Change border color on hover to green-700
            },
            '&:focus': {
                borderColor: '#065f46', // Change border color on focus to green-700
                outline: 'none', // Remove outline for focus
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999, // Ensure the menu is above other content
            backgroundColor: '#27272a', // bg-zinc-800 for the menu
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#065f46' : '#27272a', // Green-700 on focus
            color: 'white', // Text color
            '&:hover': {
                backgroundColor: '#065f46', // Green-700 on hover
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white', // Text color for selected value
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#a1a1aa', // gray-400 for placeholder
        }),
    };

    console.log(values);
      
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
                <div className="group relative mb-5 w-full">
                    <Select
                        options={options}
                        styles={customStyles}
                        className={'mt-2 relative'}
                        placeholder={owner?.email}
                        isSearchable
                        isClearable
                        onChange={(e: unknown) => (
                            
                            // @ts-ignore e.value is an integer
                            setValues({ ...values, owner_id: e?.value ?? 0 })
                        )}
                        menuPortalTarget={document.body}
                    />
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
