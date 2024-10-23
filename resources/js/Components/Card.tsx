import { ReactNode } from 'react';

export default function Card({
    header,
    description,
    children,
}: {
    header?: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={'overflow-hidden bg-zinc-900/75 shadow-sm sm:rounded-lg'}
        >
            <div className={'p-6 text-gray-100'}>
                {header && (
                    <header className={'mb-6'}>
                        <h2 className="text-lg font-medium">{header}</h2>
                        {description && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        )}
                    </header>
                )}
                {children}
            </div>
        </div>
    );
}
