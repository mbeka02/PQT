import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';
import PlayerModal from './_playerModal';
import React, { useState } from 'react';
import ImageModal from './_imageModal';

export default function GameModal({
  home,
  away,
  homeScore,
  awayScore,
  logs,
}: {
  home: TeamClass | undefined;
  away: TeamClass | undefined;
  homeScore: number | undefined;
  awayScore: number | undefined;
  logs: LogClass[] | undefined;
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerClass | undefined>(undefined);

  /* experimenting with imageModal here */
  const [selectedLog, setSelectedLog] = useState<string>(''); // State to store the selected log content
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  function openPlayerModal(player: PlayerClass) {
    setSelectedPlayer(player);
  }

  function closePlayerModal() {
    setSelectedPlayer(undefined);
  }


/* experimenting with imageModal here */
  function handleLogClick(logContent: string) {
    setSelectedLog(logContent); // Set the selected log content in the state
    setShowImageModal(true); // Show the Image modal
  }

  function closeImageModal() {
    setShowImageModal(false);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.teamswrapperModal}>
          <h1>
            {home && home.city && home.name}
            &nbsp;vs&nbsp;
            {away && away.city && away.name}
          </h1>
          <div className={styles.contentHome}>
            <div className={styles.playersScrollbar}>
              <h2>HOME {homeScore}</h2>
              {home?.players.map((p, i) => (
                <Player
                  player={p}
                  key={i}
                  onClick={() => openPlayerModal(p)}
                />
              ))}
            </div>
          </div>
          <div className={styles.contentAway}>
            <div className={styles.playersScrollbar}>
              <h2>AWAY {awayScore}</h2>
              {away?.players.map((p, i) => (
                <Player
                  player={p}
                  key={i}
                  onClick={() => openPlayerModal(p)}
                />
              ))}
            </div>
          </div>

          {/* Render the logs and attach a click event handler */}
          <div className={styles.logs}>
            {logs?.map((e, i) => (
              <p key={i} onClick={() => handleLogClick(e.content)}>
                {e.content}
              </p>
            ))}
          </div>

      
          {/* Show Image Modal when required */}
      {showImageModal && (
        <ImageModal content={selectedLog} onClose={closeImageModal} />
      )}

        </div>
      </div>
      {selectedPlayer && (
        <PlayerModal
          players={[selectedPlayer]}
          hideModalOnClick={closePlayerModal}
        />
      )}
    </>
  );
}

function Player({ player, onClick }: { player: PlayerClass; onClick: () => void }) {
  return (
    <>
      <div>
        Player:
        <button onClick={onClick}>{player.first_name} {player.last_name}</button>
      </div>
    </>
  );
}
