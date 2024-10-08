import { Link } from '@inertiajs/react'; // Assurez-vous d'importer Link si vous utilisez Inertia.js

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    href, // Ajout de la prop href
    ...props
}) {
    const buttonClass = `inline-flex items-center rounded-md border border-transparent bg-innerlightblue px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-innerdarkblue focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
        disabled ? 'opacity-25' : ''
    } ${className}`;

    // Si href est fourni, retourner un lien
    if (href) {
        return (
            <Link
                href={href}
                className={buttonClass}
                {...props}
            >
                {children}
            </Link>
        );
    }

    // Sinon, retourner un bouton
    return (
        <button
            className={buttonClass}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
