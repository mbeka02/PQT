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
    <div className={`${styles.playerModal} ${styles.modalTop}`}>
      <h2>{player.first_name} {player.last_name}</h2>
		{player.Astral_Presence}<br/>
		{player.Resilience}<br/>
		{player.Radiance}<br/>
		{player.Resonance}<br/>
		{player.Dynamism}<br/>
		{player.Vibes}<br/>
		{player.Charm}<br/>
		{player.Observation}<br/>
		{player.Bravery}<br/>
		{player.Creativity}<br/>
		{player.Tenacity}<br/>
		{player.Intelligence}<br/>
		{player.Loyalty}<br/>
		{player.Wit}<br/>
		{player.Patience}<br/>
		{player.Artistry}<br/>
		{player.Technomancy}<br/>
		{player.Gravity}<br/>
		{player.Bioluminescence}<br/>
		{player.Stink}<br/>
		{player.Rhythm}<br/>
		{player.Purple}<br/>
		{player.Dankness}<br/>
		{player.Savagery}<br/>
		{player.Cleanliness}<br/>
		{player.Unicorn}<br/>
		{player.Thirst}<br/>
      {/* Add more content and functionality */}
      <button className={styles.closeButton} onClick={hideModalOnClick}>
        Close
      </button>
    </div>
  );
};

export default PlayerModal;
