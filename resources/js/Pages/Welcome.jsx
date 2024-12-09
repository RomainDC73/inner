import { Head, Link } from '@inertiajs/react';
import { MdAccountCircle } from "react-icons/md";
import { LuBrain } from "react-icons/lu";
import { PiSignIn } from "react-icons/pi";
import { FiLayers } from "react-icons/fi";
import { FaHandHoldingHand } from "react-icons/fa6";
import Dropdown from '@/Components/Dropdown';
import Slideshow from '@/Components/Slideshow';
import WelcomeImage01 from '@/Assets/welcome_inner_01.jpg'
import WelcomeImage02 from '@/Assets/welcome_inner_02.jpg'
import AppInnerDashboardImage from '@/Assets/app_inner_dashboard.png';
import InnerCreate01 from '@/Assets/app_inner_create_01.png';
import InnerCreate02 from '@/Assets/app_inner_create_02.png';
import InnerCreate03 from '@/Assets/app_inner_create_03.png';
import InnerCreate04 from '@/Assets/app_inner_create_04.png';
import InnerCreate05 from '@/Assets/app_inner_create_05.png';
import InnerCreate06 from '@/Assets/app_inner_create_06.png';
import '../../css/cloud.css';
import ApplicationLogo from '@/Components/ApplicationLogo';
import MoodBadgeCycler from '@/Components/MoodBadgeCycler';
import CreateButton from '@/Components/CreateButton';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const images = [AppInnerDashboardImage, InnerCreate01, InnerCreate02, InnerCreate03, InnerCreate04, InnerCreate05, InnerCreate06]

    return (
        <>
            <Head title="Welcome" />
            <div>
            <div className="orbContainer">
                    <div className="orb"></div>
                    <div className="orb"></div>
                    <div className="orb"></div>
            </div>
                <div className="text-white relative flex min-h-screen flex-col items-center justify-center overflow-hidden">

                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl ">

                        <header className="gap-2 py-6 lg:grid-cols-3">

                            <div className="flex justify-end">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-innerdarkblue transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                <MdAccountCircle size="28" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div>
                                            {auth.user ? (
                                                <Dropdown.Link
                                                    href={route('dashboard')}
                                                    className="rounded-md px-3 py-2 transition uppercase"
                                                >
                                                    Mon Compte
                                                </Dropdown.Link>
                                            ) : (
                                                <>
                                                    <Dropdown.Link
                                                        href={route('login')}
                                                        className="rounded-md px-3 py-2 transition uppercase"
                                                    >
                                                        Connexion
                                                    </Dropdown.Link>
                                                </>
                                            )}
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full mt-6">
                                <Link href={route('welcome')}>
                                    <ApplicationLogo className="h-14" />
                                </Link>
                                <h1 className="text-innerdarkblue uppercase mt-8 tracking-wider">
                                Mémorisez vos émotions.
                                </h1>
                            </div>

                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-gradient-to-br from-innerlightblue to-innerdarkblue p-6 transition duration-300 hover:text-gray-200 md:row-span-3 lg:p-10 lg:pb-10">
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            src={WelcomeImage01}
                                            alt="Inner, la plateforme de mémorisation des émotions"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover drop-shadow-[0px_4px_20px_rgba(0,0,0,0.25)]"
                                        />
                                        <div className="absolute inset-0 bg-innerlightblue/30 rounded-[10px]"></div>
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-innerlightblue sm:size-16">
                                            <LuBrain className='text-2xl' />
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Rappellez-vous...
                                                </h2>

                                                <p className="mt-4 text-base/relaxed">
                                                    Ce moment de grâce que vous avez vécu, une période désagréable que vous avez besoin de confier, ce que vous avez ressenti à un moment particulier.
                                                    <br></br>
                                                    <b>Gardez une trace de vos émotions.</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <CreateButton className="w-1/2 ml-0" href={route('register')}>
                                <PiSignIn className="mr-4" />
                                    s'incrire
                                </CreateButton>

                                <div className="flex items-start gap-4 rounded-lg bg-gradient-to-br from-innerdarkblue to-innerlightblue p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-gray-200 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full sm:size-16">
                                    <MoodBadgeCycler />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Qu'on se sente bien...
                                        </h2>

                                        <p className="mt-4 text-base/relaxed">
                                            ...pas bien ou d'humeur "moyenne", toutes les émotions sont importantes. Et pouvoir les relire, les réécouter, les revivre, c'est encore mieux.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-innerdarkblue p-6 transition duration-300 hover:text-gray-200 md:row-span-3 lg:p-10 lg:pb-10">
                                    <div
                                        id="screenshot-container"
                                        className="relative flex h-full w-full flex-1 items-stretch rounded-lg overflow-hidden"
                                    >
                                        <Slideshow images={images} interval={3000} className="rounded-lg lg:rounded-lg overflow:hidden" />
                                        <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)]"></div>
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-innerlightblue sm:size-16">
                                            <FiLayers className='text-2xl' />
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Expliquez...
                                                </h2>

                                                <p className="mt-4 text-base/relaxed">
                                                    Ce que vous avez ressenti, pourquoi vous avez ressenti cela, comment vous avez réagi, ce que vous avez fait pour vous sentir mieux.
                                                    <br></br>
                                                    <b>Du texte, de l'image, un enregistrement audio, choisissez le format qui vous convient.</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-gradient-to-br from-innerlightblue to-innerdarkblue p-6 transition duration-300 hover:text-gray-200 lg:p-10 lg:pb-10">
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            src={WelcomeImage02}
                                            alt="Inner, la plateforme de mémorisation des émotions"
                                            className="aspect-video flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_20px_rgba(0,0,0,0.25)]"
                                        />
                                        <div className="absolute inset-0 bg-innerlightblue/30 rounded-[10px]"></div>
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-innerlightblue sm:size-16">
                                            <FaHandHoldingHand className='text-2xl' />
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Retenez le moment présent
                                                </h2>

                                                <p className="mt-4 text-base/relaxed">
                                                    Profitez et ressentez chaque instant, même les plus difficiles. Ils sont tous importants.
                                                    <br></br>
                                                    Notez-les, enregistrez-les, gardez-les précieusement pour vous.
                                                    <br></br>
                                                    <b>Et revenez-y quand vous en avez besoin.</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <CreateButton className="w-1/2 ml-0" href={route('register')}>
                                <PiSignIn className="mr-4" />
                                    s'incrire
                                </CreateButton>


                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black">
                            Laravel v{laravelVersion} (PHP v{phpVersion})

                        </footer>

                    </div>
                    <div className="orbContainer-bottom">
                <div className="orb-bottom"></div>
                <div className="orb-bottom"></div>
                <div className="orb-bottom"></div>
            </div>
                </div>

            </div>
        </>
    );
}
