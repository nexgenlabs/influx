import colors from 'tailwindcss/colors';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';

interface Props {
    message: string;
    type: AlertType;
}

function getAlertStyle({ type }: { type: AlertType }): string {
    let color: string = colors.white;

    switch (type) {
        case 'success':
            color = colors.green[500];
            break;
        case 'info':
            color = colors.blue[500];
            break;
        case 'warning':
            color = colors.orange[500];
            break;
        case 'danger':
            color = colors.red[500];
            break;
    }

    return color
}

export default function Alert({ message, type }: Props) {
    const color = getAlertStyle({ type });


    return (
        <div className={'absolute bottom-4 right-4'}>
            <div
                style={{ borderColor: color, color: color }}
                className="flex items-center py-3 px-4 text-sm border rounded-lg bg-zinc-800">
                <div>
                    <span className="font-bold px-2 py-1 text-xs bg-white/10 rounded-full uppercase mr-1">{type}</span>
                    <span className={'text-gray-400 font-normal text-sm'}>{message}</span>
                </div>
            </div>
        </div>
    )
}