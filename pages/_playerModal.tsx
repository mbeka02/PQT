import styles from 'styles/gameModal.module.css';
import { PlayerClass } from '@/public/static/scripts/gameMechanics';
import React from 'react';

interface PlayerModalProps {
  player: PlayerClass | undefined;
  hideModalOnClick: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, hideModalOnClick }) => {
  // Handle case when player object is undefined
  if (!player) {
    return null; // or return a placeholder component/message
  }

  return (
    <div className={styles.playerModal}>
      <h2>{player.first_name} {player.last_name}</h2>
      {/* Add more content and functionality */}
      <button className={styles.closeButton} onClick={hideModalOnClick}>
        Close
      </button>
    </div>
  );
};

export default PlayerModal;
