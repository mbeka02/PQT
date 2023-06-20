import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';

import React from 'react';

interface PlayerModalProps {
  player: PlayerClass;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, hideModalOnClick }) => {
  // Implement the modal component here
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
