export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-innerlightblue shadow-sm focus:ring-innerlightblue ' +
                className
            }
        />
    );
}
