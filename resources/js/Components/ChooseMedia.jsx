export default function ChooseMedia({ title, link, onClick }) {
    return (
        <div className="max-w-xs w-full mx-auto mb-4">
            <div
                className={`bg-gradient-to-br from-white from-30% to-innerlightbluefade rounded-lg p-6 shadow-md flex flex-col items-center justify-center space-y-2 cursor-pointer`}
                onClick={onClick}
            >
                <p className="text-sm text-gray-700">{title}</p>
            </div>
        </div>
    );
}
