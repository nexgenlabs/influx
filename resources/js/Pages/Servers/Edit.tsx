import Card from '@/Components/Card';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, Server, User } from '@/types';
import Avatar from 'boring-avatars';
import ServerForm from './ServerForm';

export default function Edit({ server, owner }: PageProps<{ server: Server, owner?: User }>) {
    return (
        <Authenticated title={'Edit server: ' + server.name}>
            <Card
                header={'Edit Server'}
                description={
                    'Update server details or remove the server from the system.'
                }
            >
                <div className={'grid gap-6 lg:grid-cols-3'}>
                    <div className={'grid items-center justify-center'}>
                        <div>
                            <Avatar
                                name={server.name}
                                className={'h-24'}
                                variant={'bauhaus'}
                            />
                        </div>
                    </div>
                    <ServerForm server={server} owner={owner} />
                </div>
            </Card>
        </Authenticated>
    );
}
