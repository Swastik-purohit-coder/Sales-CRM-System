import { useState } from "react";

const VoiceRecorder = ({
    onRecord,
}) => {

    const [recording, setRecording] =
        useState(false);

    const toggleRecording = () => {

        if (!recording) {

            setRecording(true);

            onRecord?.();

        } else {

            setRecording(false);

        }

    };

    return (

        <button
            type="button"
            onClick={toggleRecording}
        >

            {recording
                ? "⏹ Stop"
                : "🎤"}

        </button>

    );

};

export default VoiceRecorder;