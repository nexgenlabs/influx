import PrimaryButton from '@/Components/PrimaryButton';
import { Body, Head } from '@/Components/Table';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, Server } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import Avatar from 'boring-avatars';
import { useState } from 'react';
import New from './New';

export default function Index({ servers }: PageProps<{ servers: Server[] }>) {
    const [filter, setFilter] = useState<string>('');
    const [showForm, setShowForm] = useState(false);

    if (showForm) {
        return <New />;
    };

    return (
        <Authenticated title={'All Servers'}>
            <div className={'mb-4 flex justify-between'}>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <MagnifyingGlassIcon className={'h-5 text-white'} />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2.5 ps-10 text-sm text-white focus:border-green-500 focus:ring-green-500 dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                        placeholder="Search servers"
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
                    <PrimaryButton onClick={() => setShowForm(true)}>New Server</PrimaryButton>
                </div>
            </div>
            <table className="w-full text-left text-sm text-gray-400">
                <Head columns={['Name', 'Position', 'Status', 'Action']} />
                <Body>
                    {servers
                        .filter((x) => x.name.startsWith(filter))
                        .map((server) => (
                            <tr
                                className="duration-250 border-b border-gray-800 bg-zinc-800 transition dark:hover:bg-zinc-800/80"
                                key={server.name}
                            >
                                <th
                                    scope="row"
                                    className="flex items-center whitespace-nowrap px-6 py-4"
                                >
                                    <Avatar
                                        variant={'bauhaus'}
                                        name={server.name}
                                        className={'h-10 w-10'}
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">
                                            {server.name}
                                        </div>
                                        <div className="font-normal text-gray-500">
                                            {server.address}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {server.public ? 'Public' : 'Private'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>{' '}
                                        Online
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/servers/${server.id}`}
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
