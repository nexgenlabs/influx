import Card from '@/Components/Card';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Avatar from 'boring-avatars';
import UserForm from './UserForm';

export default function New() {
    return (
        <Authenticated title={'All Users'}>
            <Card
                header={'Create new user'}
                description={'Add a new user to the management interface.'}
            >
                <div className={'grid gap-6 lg:grid-cols-3'}>
                    <div className={'grid items-center justify-center'}>
                        <div>
                            <Avatar
                                name={'0'}
                                className={'h-24'}
                                variant={'beam'}
                            />
                        </div>
                    </div>
                    <UserForm />
                </div>
            </Card>
        </Authenticated>
    );
}
