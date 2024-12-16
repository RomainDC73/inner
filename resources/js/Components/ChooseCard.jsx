import { Link } from '@inertiajs/react';

export default function ChooseCard({ title, link }) {
    return (
        <div className="max-w-xs w-full mx-auto mb-4">
            <Link href={link}>
                <div className={`bg-gradient-to-br from-white from-30% to-innerlightbluefade rounded-lg p-6 shadow-md flex flex-col items-center justify-center space-y-2`}>
                    <p className="text-sm text-gray-700">{title}</p>
                </div>
            </Link>
        </div>
    );
}

