import styles from 'styles/playerModal.module.css';
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

  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

  const selectPreviousPlayer = () => {
    setSelectedPlayerIndex((prevIndex) =>
      prevIndex === 0 ? player.players.length - 1 : prevIndex - 1
    );
  };

  const selectNextPlayer = () => {
    setSelectedPlayerIndex((prevIndex) =>
      prevIndex === player.players.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={`${styles.playerModal} ${styles.modalTop}`}>
      <h2>
        {player.players[selectedPlayerIndex].first_name}{' '}
        {player.players[selectedPlayerIndex].last_name}
      </h2>
		<strong>Astral Presence:</strong> {player.Astral_Presence}<br/>
		<strong>Resilience:</strong> {player.Resilience}<br/>
		<strong>Radiance:</strong> {player.Radiance}<br/>
		<strong>Resonance:</strong> {player.Resonance}<br/>
		<strong>Dynamism:</strong> {player.Dynamism}<br/>
		<strong>Vibes:</strong> {player.Vibes}<br/>
		<strong>Charm:</strong> {player.Charm}<br/>
		<strong>Observation:</strong> {player.Observation}<br/>
		<strong>Bravery:</strong> {player.Bravery}<br/>
		<strong>Creativity:</strong> {player.Creativity}<br/>
		<strong>Tenacity:</strong> {player.Tenacity}<br/>
		<strong>Intelligence:</strong> {player.Intelligence}<br/>
		<strong>Loyalty:</strong> {player.Loyalty}<br/>
		<strong>Wit:</strong> {player.Wit}<br/>
		<strong>Patience:</strong> {player.Patience}<br/>
		<strong>Artistry:</strong> {player.Artistry}<br/>
		<strong>Technomancy:</strong> {player.Technomancy}<br/>
		<strong>Gravity:</strong> {player.Gravity}<br/>
		<strong>Bioluminescence:</strong> {player.Bioluminescence}<br/>
		<strong>Stink:</strong> {player.Stink}<br/>
		<strong>Rhythm:</strong> {player.Rhythm}<br/>
		<strong>Purple:</strong> {player.Purple}<br/>
		<strong>Dankness:</strong> {player.Dankness}<br/>
		<strong>Savagery:</strong> {player.Savagery}<br/>
		<strong>Cleanliness:</strong> {player.Cleanliness}<br/>
		<strong>Unicorn:</strong> {player.Unicorn}<br/>
		<strong>Thirst:</strong> {player.Thirst}<br/>

		<div>
		  <button onClick={selectPreviousPlayer}>&larr;</button> {/* left arrow */}
		  <button onClick={selectNextPlayer}>&rarr;</button>	 {/* right arrow */}
		</div>

      {/* Add more content and functionality */}
      <button className={styles.closeButton} onClick={hideModalOnClick}>
        Close
      </button>
    </div>
  );
};

export default PlayerModal;
