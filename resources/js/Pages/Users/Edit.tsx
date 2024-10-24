import Card from '@/Components/Card';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import Avatar from 'boring-avatars';
import UserForm from './UserForm';

export default function Edit({ user }: PageProps<{ user: User }>) {
    if (!user) return <></>;

    return (
        <Authenticated title={'Edit user: ' + user.name}>
            <Card
                header={'Edit User Account'}
                description={
                    'Update account details or remove the account from the system.'
                }
            >
                <div className={'grid gap-6 lg:grid-cols-3'}>
                    <div className={'grid items-center justify-center'}>
                        <div>
                            <Avatar
                                name={user.name}
                                className={'h-24'}
                                variant={'beam'}
                            />
                        </div>
                    </div>
                    <UserForm user={user} />
                </div>
            </Card>
        </Authenticated>
    );
}
