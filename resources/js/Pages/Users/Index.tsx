import PrimaryButton from '@/Components/PrimaryButton';
import { Body, Head } from '@/Components/Table';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import { Link } from '@inertiajs/react';
import Avatar from 'boring-avatars';

export default function Index({ users }: PageProps<{ users: User[] }>) {
    return (
        <Authenticated title={'All Users'}>
            <div className={'mb-4 text-right'}>
                <Link href={'/users/new'}>
                    <PrimaryButton>New User</PrimaryButton>
                </Link>
            </div>
            <table className="w-full text-left text-sm text-gray-400">
                <Head columns={['Name', 'Position', 'Status', 'Action']} />
                <Body>
                    {users.map((user) => (
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
                                    name={'EmailName'}
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
                                <a
                                    href={`/users/${user.id}`}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                    ))}
                </Body>
            </table>
        </Authenticated>
    );
}
