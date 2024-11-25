import { useState, useRef, useEffect } from 'react';
import { IoMicCircle } from "react-icons/io5";
import { IoStopCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import '../../css/wave.css';

export default function VoiceRecorder({ onRecordingComplete }) {
    const [audioBlob, setAudioBlob] = useState(null);
    const [recording, setRecording] = useState(false);
    const [time, setTime] = useState(0);  // Etat pour le temps écoulé
    const mediaRecorderRef = useRef(null);
    const intervalRef = useRef(null); // Référence pour stocker l'intervalle

    const startRecording = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Votre navigateur ne supporte pas l'enregistrement audio.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const audioChunks = [];
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
                onRecordingComplete(audioBlob); // Informer le parent qu'un enregistrement a été effectué
            };

            mediaRecorder.start();
            setRecording(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1); // Met à jour le temps toutes les secondes
            }, 1000); // Intervalle de 1 seconde
        } catch (error) {
            console.error("Erreur d'accès au microphone :", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            clearInterval(intervalRef.current);  // Arrête l'intervalle quand l'enregistrement s'arrête
        }
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioURL = URL.createObjectURL(audioBlob);
            new Audio(audioURL).play();
            console.log("URL de l'audio :", audioURL);
        }
    };

    const resetTimer = () => {
        setTime(0);  // Réinitialise le timer
    };

    // Formater le temps en minutes:secondes
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);  // Nombre de minutes
        const seconds = timeInSeconds % 60;  // Reste des secondes
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;  // Formate en mm:ss
    };

    return (
        <div className="text-center">
            {/* Afficher l'icône d'enregistrement ou d'arrêt selon l'état */}
            {!audioBlob && (
                <button onClick={recording ? stopRecording : startRecording}>
                    {recording ? <IoStopCircle size={40} color="#F9B5AC" /> : <IoMicCircle size={40} color="#75B9BE" />}
                </button>
            )}

            {/* Afficher l'animation d'onde pendant l'enregistrement */}
            {recording && (
                <div className="wave-container mt-4">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            )}

            {/* Afficher le timer pendant l'enregistrement */}
            {recording && (
                <div className="mt-4">
                    <p>{`Durée : ${formatTime(time)}`}</p>
                </div>
            )}

            {/* Afficher les boutons Lecture et Suppression après l'enregistrement */}
            {audioBlob && (
                <div className="mt-4">
                    <button onClick={playAudio}><IoPlayCircle size={40} color="#D0D6B5" /></button>
                    <button onClick={() => { setAudioBlob(null); resetTimer(); onRecordingComplete(null); }}><MdDeleteForever size={40} color="#F9B5AC" /></button>
                </div>
            )}
        </div>
    );
}
