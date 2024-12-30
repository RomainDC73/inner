import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ChooseMedia from '@/Components/ChooseMedia';
import ImagePreview from '@/Components/ImagePreview';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function EditMedia({ post }) {
    const { data, setData, processing } = useForm({
        media: null,
    });

    const [mediaPreview, setMediaPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (post.media_url) {
            setMediaPreview(post.media_url);
        }
    }, [post]);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData('media', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setMediaPreview(imageUrl);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('media', fileInputRef.current.files[0]);

        try {
            const response = await axios.post(`/post/${post.id}/edit/media`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        window.location.href = response.data.redirect;
        } catch (error) {
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <BackButton />
                    <h1 className="text-xl text-center font-semibold leading-tight text-gray-800 mt-4 mb-4">
                    Modifier la photo
                    </h1>
                </div>
            }
        >
            <Head title="Modifier la photo" />

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
                        Enregistrer
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
