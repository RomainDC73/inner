import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ChooseMedia from '@/Components/ChooseMedia';
import ImagePreview from '@/Components/ImagePreview';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { Inertia } from '@inertiajs/inertia';
import { useRef, useState, useEffect } from 'react';

export default function AddMedia({ mood_id }) {
    const { data, setData, post, processing } = useForm({
        media: null,
    });

    const [mediaPreview, setMediaPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const savedMedia = localStorage.getItem('media');
        if (savedMedia) {
            setMediaPreview(savedMedia);
        }
    }, []);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData('media', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setMediaPreview(imageUrl);
                localStorage.setItem('media', imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImportClick = () => fileInputRef.current && fileInputRef.current.click();
    const handleTakePhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute('capture', 'environment');
            fileInputRef.current.click();
        }
    };

    const handleRemoveMedia = () => {
        setData('media', null);
        setMediaPreview(null);
        fileInputRef.current.value = '';
        localStorage.removeItem('media');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('create.submit-media'), data, {
            onSuccess: () => {
                Inertia.visit('/create/recap');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    On ajoute une photo ?
                    </h1>
                </div>
            }
        >
            <Head title="Partager une photo" />

            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChooseMedia title="📁 Importer une photo" onClick={handleImportClick} />
                    <ChooseMedia title="📷 Prendre une photo" onClick={handleTakePhotoClick} />
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleMediaChange}
                />

                {mediaPreview && (
                    <ImagePreview
                        src={mediaPreview}
                        onRemove={handleRemoveMedia}
                    />
                )}

                <div className="mt-8 flex space-x-4">
                    <PrimaryButton
                        onClick={handleSubmit}
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={processing}
                    >
                        Continuer
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
