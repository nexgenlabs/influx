import Card from '@/Components/Card';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { ServerStackIcon } from '@heroicons/react/24/outline';
import ServerForm from './ServerForm';

export default function New() {
    return (
        <Authenticated title={'New Server'}>
            <Card
                header={'Create new server'}
                description={'Add a new server to the management interface.'}
            >
                <div className={'grid gap-6 lg:grid-cols-3'}>
                    <div className={'grid items-center justify-center'}>
                        <div>
                            <ServerStackIcon className={'h-24 text-green-600'} />
                        </div>
                    </div>
                    <ServerForm />
                </div>
            </Card>
        </Authenticated>
    );
}
