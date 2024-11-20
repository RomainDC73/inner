import { useState, useRef } from 'react';
import { IoMicCircle } from "react-icons/io5";
import { IoStopCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

export default function VoiceRecorder() {
    const [audioBlob, setAudioBlob] = useState(null);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

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
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Erreur d'accès au microphone :", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioURL = URL.createObjectURL(audioBlob);
            new Audio(audioURL).play();
        }
    };

    return (
        <div>
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? <IoStopCircle size={40} color="#F9B5AC" /> : <IoMicCircle size={40} color="#75B9BE"/>}
            </button>
            {audioBlob && (
                <>
                    <button onClick={playAudio}><IoPlayCircle size={40} color="#D0D6B5" /></button>
                    <button onClick={() => setAudioBlob(null)}><MdDeleteForever size={40} color="#F9B5AC" /></button>
                </>
            )}
        </div>
    );
}
