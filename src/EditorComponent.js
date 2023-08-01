import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import mic from "../src/asset/mic.png";
import micMute from "../src/asset/mute-mic.png";

export default function Editor(){
    const [micActive, setMicActive] = useState(false);
    const [EditorNotes, setNotes] = useState('Hello from CKEditor 5!');
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
    useEffect(()=>{
        if(transcript) {
            setNotes(transcript);
        }
        if(micActive){
            SpeechRecognition.startListening();
        } else {
            SpeechRecognition.stopListening();
        }
    })
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleMic = () => {
        setMicActive(!micActive);
    }
    return (
    <div className='editor-wrapper container p-9'>
        <p className='mb-4'> Testing Ckeditor with speech recognization !</p>
        <div className='flex flex-start'>
        <button className="relative mb-2 bg-gray hover:bg-gray py-2 px-4 rounded border"
        onClick={handleMic}>
            <span className={"absolute flex h-3 w-3 custom-recording "+(listening?'':' hidden')}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            {micActive && (<img src={mic} alt='mic' width={24} />)}
            {!micActive && (<img src={micMute} alt='mic' width={24} />)}
        </button>
        </div>
        <CKEditor
            editor={ ClassicEditor }
            data={EditorNotes}
            onInit={ editor => {
                console.log( 'Editor is ready to use!', editor.state );
            } }
        />
    </div>
    );
}
