import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    return (
        <AuthenticatedLayout title={'Dash'}>
            <Card
                header={'Account Overview'}
                description={'View basic information about your account.'}
            >
                You&apos;re logged in!
            </Card>
        </AuthenticatedLayout>
    );
}
