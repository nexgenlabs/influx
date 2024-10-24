import { ReactNode } from 'react';

export default function Table({ children }: { children: ReactNode }) {
    return (
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            {children}
        </table>
    );
}

export function Head({ columns }: { columns: string[] }) {
    return (
        <thead className="bg-zinc-900 text-xs uppercase">
            <tr>
                {columns.map((col) => (
                    <th scope="col" className="px-6 py-3" key={col}>
                        {col}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export function Body({ children }: { children: ReactNode }) {
    return <tbody>{children}</tbody>;
}
