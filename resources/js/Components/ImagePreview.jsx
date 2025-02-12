export default function ImagePreview({ src, onRemove }) {

    const handleRemoveClick = () => {
        const confirmRemove = window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
        if (confirmRemove) {
            onRemove();
        }
    };

    return (
        <div className="relative mt-4">
            <img src={src} alt="Prévisualisation" className="w-32 h-32 object-cover rounded-md" />
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                >
                    🗑
                </button>
            )}
        </div>
    );
}
