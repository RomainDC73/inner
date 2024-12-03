import { IoChevronBackCircleOutline } from "react-icons/io5";

const BackButton = ({ fallbackUrl = '/', className = '' }) => {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back(); // Retourne à la page précédente
        } else {
            window.location.href = fallbackUrl; // Navigue vers une URL de secours si aucune page précédente
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`mb-6 rounded-full hover:bg-gray-100 transition ${className}`}
            aria-label="Retour"
        >
            <IoChevronBackCircleOutline className="text-3xl text-innerlightblue hover:text-innerdarkblue" />
        </button>
    );
};

export default BackButton;
