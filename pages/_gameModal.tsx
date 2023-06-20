import styles from 'styles/gameModal.module.css';
import { PlayerClass } from '@/public/static/scripts/gameMechanics';
import React, { useState } from 'react';

interface PlayerProps {
  player: PlayerClass;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  const [showModal, setShowModal] = useState(false);

  function showModalOnClick() {
    setShowModal(true);
  }

  function hideModalOnClick() {
    setShowModal(false);
  }

  return (
    <>
      <div>
        Player:
        <button className={styles.playerLink} onClick={showModalOnClick}>
          {player.first_name} {player.last_name} <br />
        </button>
        <br />
      </div>
      {showModal && (
        <PlayerModal player={player} hideModalOnClick={hideModalOnClick} />
      )}
    </>
  );
};

interface PlayerModalProps {
  player: PlayerClass;
  hideModalOnClick: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  player,
  hideModalOnClick,
}) => {
  return (
    <div className={styles.playerModal}>
      <h2>{player.first_name} {player.last_name}</h2>
      <div className={styles.playerDetails}>
        <p>Astral Presence: {player.Astral_Presence}</p>
        <p>Resilience: {player.Resilience}</p>
        {/* Add more player details */}
      </div>
      <button className={styles.closeButton} onClick={hideModalOnClick}>
        Close
      </button>
    </div>
  );
};

const GameModal: React.FC = () => {
  // Example usage of Player and PlayerModal components
  const player: PlayerClass = {
    first_name: 'John',
    last_name: 'Doe',
    Astral_Presence: 80,
    Resilience: 90,
    // Add more player details
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.teamswrapperModal}>
        <h1>Game Modal</h1>
        <div className={styles.contentHome}>
          <div className={styles.playersScrollbar}>
            <h2>HOME</h2>
            <Player player={player} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
