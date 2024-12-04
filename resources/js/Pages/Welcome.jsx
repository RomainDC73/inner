import { Head, Link } from '@inertiajs/react';
import { MdAccountCircle } from "react-icons/md";
import { LuBrain } from "react-icons/lu";
import Dropdown from '@/Components/Dropdown';
import WelcomeImage01 from '@/Assets/welcome_inner_01.jpg'
import '../../css/cloud.css';
import ApplicationLogo from '@/Components/ApplicationLogo';
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

    return (
        <>
            <Head title="Welcome" />
            <div>

                <div className="text-white relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div className="orbContainer">
                    <div className="orb"></div>
                    <div className="orb"></div>
                    <div className="orb"></div>
                </div>
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
                                                    className="rounded-md px-3 py-2 transition"
                                                >
                                                    Dashboard
                                                </Dropdown.Link>
                                            ) : (
                                                <>
                                                    <Dropdown.Link
                                                        href={route('login')}
                                                        className="rounded-md px-3 py-2 transition"
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
                                <a
                                    href="https://laravel.com/docs"
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-innerdarkblue p-6 transition duration-300 hover:text-black/70 md:row-span-3 lg:p-10 lg:pb-10"
                                >
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            src={WelcomeImage01}
                                            alt="Laravel documentation screenshot"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                                        />
                                        <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)]"></div>
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-innerlightblue sm:size-16">
                                            <LuBrain />
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Rappellez-vous
                                                </h2>

                                                <p className="mt-4 text-sm/relaxed">
                                                    Gardez une trace de vos émotions.
                                                </p>
                                            </div>
                                        </div>

                                        <svg
                                            className="size-6 shrink-0 stroke-[#FF2D20]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                            />
                                        </svg>
                                    </div>
                                </a>

                                <CreateButton href={route('register')}>
                                    s'incrire
                                </CreateButton>

                                <a
                                    href="https://laracasts.com"
                                    className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <svg
                                            className="size-5 sm:size-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <g fill="#FF2D20">
                                                <path d="M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" />
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Laravel News
                                        </h2>

                                        <p className="mt-4 text-sm/relaxed">
                                            Laravel News is a community driven
                                            portal and newsletter aggregating
                                            all of the latest and most important
                                            news in the Laravel ecosystem,
                                            including new package releases and
                                            tutorials.
                                        </p>
                                    </div>

                                    <svg
                                        className="size-6 shrink-0 self-center stroke-[#FF2D20]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </a>
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
