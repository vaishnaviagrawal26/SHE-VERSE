import React, { useEffect, useRef, useContext } from "react";
import { SOSContext } from "../../context/SOSContext";
import { uploadAudioEvidence } from "../../services/sosService";

function AutoAudioRecorder() {
  const { isSOSActive, sosId } = useContext(SOSContext);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (!isSOSActive || !sosId) return;

    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        await uploadAudioEvidence(sosId, blob);
        chunksRef.current = [];
      };

      recorder.start();

      setTimeout(() => {
        recorder.stop();
      }, 30000); // 30 sec recording
    };

    startRecording();
  }, [isSOSActive, sosId]);

  return null;
}

export default AutoAudioRecorder;