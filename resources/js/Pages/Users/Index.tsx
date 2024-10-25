import PrimaryButton from '@/Components/PrimaryButton';
import { Body, Head } from '@/Components/Table';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import Avatar from 'boring-avatars';
import { useState } from 'react';

export default function Index({ users }: PageProps<{ users: User[] }>) {
    const [filter, setFilter] = useState<string>('');

    return (
        <Authenticated title={'All Users'}>
            <div className={'mb-4 flex justify-between'}>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <MagnifyingGlassIcon className={'h-5 text-white'} />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2.5 ps-10 text-sm text-white focus:border-green-500 focus:ring-green-500 dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                        placeholder="Search user accounts"
                        onChange={(e) => {
                            if (e.currentTarget.value.length > 2) {
                                setFilter(e.currentTarget.value);
                            } else {
                                setFilter('');
                            }
                        }}
                        required
                    />
                </div>
                <div className={'ml-auto'}>
                    <Link href={'/users/new'}>
                        <PrimaryButton>New User</PrimaryButton>
                    </Link>
                </div>
            </div>
            <table className="w-full text-left text-sm text-gray-400">
                <Head columns={['Name', 'Position', 'Status', 'Action']} />
                <Body>
                    {users
                        .filter((x) => x.email.startsWith(filter))
                        .map((user) => (
                            <tr
                                className="duration-250 border-b border-gray-800 bg-zinc-800 transition dark:hover:bg-zinc-800/80"
                                key={user.email}
                            >
                                <th
                                    scope="row"
                                    className="flex items-center whitespace-nowrap px-6 py-4"
                                >
                                    <Avatar
                                        variant={'beam'}
                                        name={user.name}
                                        className={'h-10 w-10'}
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">
                                            {user.name}
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {user.superuser ? 'Superuser' : 'Standard'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>{' '}
                                        Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="font-medium text-green-600 hover:underline dark:text-green-500"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </Body>
            </table>
        </Authenticated>
    );
}
