import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';
import PlayerModal from './_playerModal';
import React, { useState } from 'react';
import ImageModal from './_imageModal';

// Define the type for the selected log content
interface LogContent {
  text: string;
  imageSrc: string;
}

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

  // Define the selected log state with the LogContent type
  const [selectedLog, setSelectedLog] = useState<LogContent | null>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  function openPlayerModal(player: PlayerClass) {
    setSelectedPlayer(player);
  }

  function closePlayerModal() {
    setSelectedPlayer(undefined);
  }


function handleLogClick(logContent: string) {
  // Check if logs is defined and is an array with at least one element
  if (logs && logs.length > 0) {
    // Find the log that matches the clicked content
    const clickedLog = logs.find((log) => log.content === logContent);

    if (clickedLog) {
      // Check if the clicked log has an associated image
      const imageSrc = clickedLog.imageSrc
        ? clickedLog.imageSrc
        : "https://www.kget.com/wp-content/uploads/sites/2/2023/05/64702907474bb1.35988184.jpeg?w=2560&h=1440&crop=1"; // Use a placeholder image URL here

      // Create the object with the required properties
      const logData: LogContent = {
        text: logContent,
        imageSrc: imageSrc,
      };
      setSelectedLog(logData); // Set the selected log content in the state
      setShowImageModal(true); // Show the Image modal
    }
  }
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
                  // Attach the click event handler to each log item
                  <p key={i} onClick={() => handleLogClick(e.content)}>
                    {e.content}
                  </p>
                ))}
              </div>

              {/* Show Image Modal when required */}
              {showImageModal && selectedLog !== null && (
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
