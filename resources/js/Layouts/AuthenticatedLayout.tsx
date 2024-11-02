import Alert from '@/Components/Alert';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { ChevronDownIcon, ComputerDesktopIcon, ServerStackIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Head, Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    title,
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode; title?: string }>) {
    const user = usePage().props.auth.user;
    const alert = usePage().props.alert;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-black font-semibold">
            <Head title={title ?? '404'} />
            {alert && <Alert type={alert.type} message={alert.message} />}
            <nav className="border-b border-gray-700 bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    <ComputerDesktopIcon
                                        className={'mr-2 h-5 w-5'}
                                    />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('users.index')}
                                    active={route().current('users.*')}
                                >
                                    <UsersIcon className={'mr-2 h-5 w-5'} />
                                    Accounts
                                </NavLink>
                                <NavLink
                                    href={route('servers.index')}
                                    active={route().current('servers.*')}
                                >
                                    <ServerStackIcon className={'mr-2 h-5 w-5'} />
                                    Servers
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}
                                                <ChevronDownIcon className={'w-4 h-4 mt-1 ml-1'} />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <ComputerDesktopIcon />
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('users.index')}
                            active={route().current('users.*')}
                        >
                            <UsersIcon />
                            Accounts
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('servers.index')}
                            active={route().current('servers.*')}
                        >
                            <ServerStackIcon />
                            Servers
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-zinc-900/75 shadow-xl">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
