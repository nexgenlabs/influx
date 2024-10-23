import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface Props {
    icon: ReactNode;
    title: string;
    content: string;
    children?: ReactNode;
}

export default function RowCard({ icon, title, content, children }: Props) {
    return (
        <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 sm:size-16">
                {icon}
            </div>

            <div className="w-full self-center">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                    {title}
                </h2>

                <p className="text-sm/relaxed">{content}</p>
                {children}
            </div>

            <ArrowRightIcon className={'m-auto h-8 w-8 text-green-500'} />
        </div>
    );
}
