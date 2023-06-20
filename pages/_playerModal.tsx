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
		Astral_Presence: {player.Astral_Presence}<br/>
		Resilience: {player.Resilience}<br/>
		Radiance: {player.Radiance}<br/>
		Resonance: {player.Resonance}<br/>
		Dynamism: {player.Dynamism}<br/>
		Vibes: {player.Vibes}<br/>
		Charm: {player.Charm}<br/>
		Observation: {player.Observation}<br/>
		Bravery: {player.Bravery}<br/>
		Creativity: {player.Creativity}<br/>
		Tenacity: {player.Tenacity}<br/>
		Intelligence: {player.Intelligence}<br/>
		Loyalty: {player.Loyalty}<br/>
		Wit: {player.Wit}<br/>
		Patience: {player.Patience}<br/>
		Artistry: {player.Artistry}<br/>
		Technomancy: {player.Technomancy}<br/>
		Gravity: {player.Gravity}<br/>
		Bioluminescence: {player.Bioluminescence}<br/>
		Stink: {player.Stink}<br/>
		Rhythm: {player.Rhythm}<br/>
		Purple: {player.Purple}<br/>
		Dankness: {player.Dankness}<br/>
		Savagery: {player.Savagery}<br/>
		Cleanliness: {player.Cleanliness}<br/>
		Unicorn: {player.Unicorn}<br/>
		Thirst: {player.Thirst}<br/>
      {/* Add more content and functionality */}
      <button className={styles.closeButton} onClick={hideModalOnClick}>
        Close
      </button>
    </div>
  );
};

export default PlayerModal;
