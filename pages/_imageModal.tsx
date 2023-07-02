import styles from 'styles/imageModal.module.css';
import React from 'react';

// Updated ImageModal Component
export default function ImageModal({ content, onClose }: { content: string; onClose: () => void }) {
  // Component code...

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1>Log Item</h1>
        <p>{content}</p>
        {/* You can add a placeholder image here or leave it out for now */}
        <img src={"https://www.kget.com/wp-content/uploads/sites/2/2023/05/64702907474bb1.35988184.jpeg?w=2560&h=1440&crop=1"} alt="Game Log" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
