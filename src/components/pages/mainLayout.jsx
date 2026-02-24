import { useRef, useState, useEffect } from 'react';
import './mainLayout.css';

const MainLayout = () => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // États pour l'enregistrement vocal
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);

  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [previewUrl]);

  // Gestion des fichiers joints
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Enregistrement vocal
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);

        const audioFile = new File([blob], `voice_${Date.now()}.webm`, {
          type: 'audio/webm',
        });

        sendVoiceMessage(audioFile);

        // Nettoyage
        audioChunksRef.current = [];
        setIsRecording(false);
        setRecordingTime(0);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Sécurité : arrêt après 3 minutes
      setTimeout(() => {
        if (isRecording) stopRecording();
      }, 180000);
    } catch (err) {
      console.error('Erreur accès microphone :', err);
      alert('Impossible d’accéder au microphone. Vérifiez les permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const sendVoiceMessage = (audioFile) => {
    console.log('Envoi du message vocal :', {
      file: audioFile.name,
      size: audioFile.size,
      type: audioFile.type,
    });

    alert('Message vocal envoyé ! (simulation)');
    setAudioBlob(null);
  };

  // Envoi texte + fichier
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = !message.trim() && !selectedFile;

    if (isEmpty) {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecording();
      }
      return;
    }

    console.log('Envoi texte/fichier :', {
      message: message.trim(),
      file: selectedFile?.name || null,
    });

    setMessage('');
    removeFile();
  };

  const isImage = selectedFile && selectedFile.type.startsWith('image/');

  // État du bouton principal
  const isInputEmpty = !message.trim() && !selectedFile;
  const mainButtonIcon = isRecording
    ? 'stop'
    : isInputEmpty
    ? 'mic'
    : 'arrow_upward_alt';

  const mainButtonClass = isRecording
    ? 'main-btn recording'
    : isInputEmpty
    ? 'main-btn empty'
    : 'main-btn filled';

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container1">
      <p className="ask">Ask</p>

      <div className="chat-footer">
        <form className="chat-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            {/* Fichier joint */}
            {selectedFile && !isRecording && (
              <div className="file-chip">
                {isImage ? (
                  <img
                    src={previewUrl}
                    alt="Prévisualisation"
                    className="chip-preview"
                  />
                ) : (
                  <span className="material-symbols-rounded chip-icon">
                    description
                  </span>
                )}
                <span className="chip-filename">
                  {selectedFile.name.length > 20
                    ? selectedFile.name.slice(0, 17) + '…'
                    : selectedFile.name}
                </span>
                <button
                  type="button"
                  className="chip-remove-btn"
                  onClick={removeFile}
                >
                  ×
                </button>
              </div>
            )}

            {/* Timer vocal */}
            {isRecording && (
              <div className="recording-timer">
                <span className="recording-dot" /> {formatTime(recordingTime)}
              </div>
            )}

            <input
              type="text"
              placeholder={isRecording ? 'Enregistrement en cours...' : 'Message...'}
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isRecording}
            />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*,.pdf,.doc,.docx,.txt,.zip,.xlsx"
            onChange={handleFileChange}
          />

          {/* Bouton attacher */}
          {!isRecording && (
            <button
              type="button"
              className="material-symbols-rounded attach-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              attach_file
            </button>
          )}

          {/* Bouton principal */}
          <button
            type="submit"
            className={`material-symbols-rounded main-btn ${mainButtonClass}`}
            title={
              isRecording
                ? 'Arrêter l’enregistrement'
                : isInputEmpty
                ? 'Enregistrer un message vocal'
                : 'Envoyer'
            }
          >
            {mainButtonIcon}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainLayout;