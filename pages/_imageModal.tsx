import React from 'react';
import styles from 'styles/imageModal.module.css';

interface ImageModalProps {
  content?: {
    text?: string;
    imageSrc?: string;
  };
  gameScore: string; // New prop for the game score
  onClose: () => void;
}


export default function ImageModal({ content, gameScore, onClose }: ImageModalProps) {
  const imageText = content?.text ?? 'No text available';
  const imageSrc = content?.imageSrc;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1>Game Log: {gameScore}</h1>
        <p>{imageText}</p>
        {imageSrc && <img src={imageSrc} alt="Game Log" />} {/* Render the image only if imageSrc is available */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
