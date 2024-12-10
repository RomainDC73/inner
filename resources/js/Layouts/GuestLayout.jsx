import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import '../../css/cloud.css';

export default function Guest({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            {/* Conteneur des orbes en arrière-plan */}
            <div className="orb-container">
                <div className="orb"></div>
                <div className="orb"></div>
                <div className="orb"></div>
            </div>

            <div className="orbContainer-bottom">
                <div className="orb-bottom"></div>
                <div className="orb-bottom"></div>
                <div className="orb-bottom"></div>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col items-center justify-center w-full mt-20">
                <Link href={route('welcome')}>
                    <ApplicationLogo className="h-14" />
                </Link>
                <h1 className="text-innerdarkblue uppercase mt-8 tracking-wider">
                    Mémorisez vos émotions.
                </h1>
            </div>

            <div className="mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
