import styles from 'styles/imageModal.module.css';
import React from 'react';

// Updated ImageModal Component
export default function ImageModal({ content, onClose }: { content: { text: string; imageSrc: string }; onClose: () => void }) {
  // Component code...

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1>Log Item</h1>
        <p>{content.text}</p>
        <img src={content.imageSrc} alt="Game Log" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
