import { Link } from '@inertiajs/react';

const ChooseCard = ({ title, link }) => {
    return (
        <div className="max-w-xs w-full mx-auto mb-4"> {/* Limite la largeur du badge et ajoute un espacement entre chaque badge */}
            <Link href={link}>
                <div className={`bg-gradient-to-br from-white from-30% to-innerlightbluefade rounded-lg p-6 shadow-md flex flex-col items-center justify-center space-y-2`}>
                    <p className="text-sm text-gray-500">{title}</p>
                </div>
            </Link>
        </div>
    );
}

export default ChooseCard;
