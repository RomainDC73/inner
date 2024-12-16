import { Link } from '@inertiajs/react';

export default function CreateButton({
    className = '',
    disabled,
    children,
    href,
    ...props
}) {
    const buttonClass = `inline-flex items-center rounded-md border border-transparent bg-innerlightblue px-4 py-4 text-sm font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-innerdarkblue focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
        disabled ? 'opacity-25' : ''
    } ${className}`;

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
