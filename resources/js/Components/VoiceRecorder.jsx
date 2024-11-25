import { useState, useRef } from 'react';
import { IoMicCircle, IoStopCircle, IoPlayCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import '../../css/wave.css';

export default function VoiceRecorder({ onRecordingComplete }) {
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [recording, setRecording] = useState(false);
    const [time, setTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const intervalRef = useRef(null);

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
                stream.getTracks().forEach(track => track.stop()); // Libère les ressources
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
                setAudioURL(URL.createObjectURL(audioBlob));
                onRecordingComplete(audioBlob);
            };

            mediaRecorder.start();
            setRecording(true);
            intervalRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
        } catch (error) {
            console.error("Erreur d'accès au microphone :", error);
            alert("Erreur d'accès au microphone : " + error.message);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            clearInterval(intervalRef.current);
        }
    };

    const playAudio = () => {
        if (audioURL) new Audio(audioURL).play();
    };

    const resetRecording = () => {
        setAudioBlob(null);
        setAudioURL(null);
        setTime(0);
        onRecordingComplete(null);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="text-center">
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? <IoStopCircle size={40} color="#F9B5AC" /> : <IoMicCircle size={40} color="#75B9BE" />}
            </button>

            {recording && (
                <div>
                    <div className="wave-container mt-4">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                    <p>{`Durée : ${formatTime(time)}`}</p>
                </div>
            )}

            {audioBlob && (
                <div className="mt-4">
                    <button onClick={playAudio}><IoPlayCircle size={40} color="#D0D6B5" /></button>
                    <button onClick={resetRecording}><MdDeleteForever size={40} color="#F9B5AC" /></button>
                </div>
            )}
        </div>
    );
}
