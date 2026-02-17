import React, { useEffect, useRef } from "react";

function AudioRecorder() {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          // TODO: send blob to backend via fetch/axios
          console.log("Audio recorded", blob);
        };

        mediaRecorder.start();
      } catch (err) {
        console.error("Audio recording failed:", err);
      }
    };

    startRecording();
  }, []);

  return null; // Invisible, recording in background
}

export default AudioRecorder;