import styles from "styles/gameModal.module.css";
import {
  TeamClass,
  LogClass,
  PlayerClass,
} from "@/public/static/scripts/gameMechanics";
import PlayerModal from "./_playerModal";
import React, { useState } from "react";
import ImageModal from "./_imageModal";

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
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerClass | undefined>(
    undefined
  );

  // Define the selected log state with the LogContent type
  const [selectedLog, setSelectedLog] = useState<LogContent | null>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedGameScore, setSelectedGameScore] = useState<string>("");

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
      const gameScore = `${homeScore} - ${awayScore}`;

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
        setSelectedGameScore(gameScore); //Pass the game score
      }
    }
  }

  function closeImageModal() {
    setShowImageModal(false);
  }

  function handleLogButtonClick(logContent: string) {
    // Call the existing function to show the image modal for the clicked log
    handleLogClick(logContent);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h1>
          {home && home.city && home.name}
          &nbsp;vs&nbsp;
          {away && away.city && away.name}
        </h1>
        <div className="flex flex-row flex-wrap justify-between m-2 flex-grow-0 ">
          <div className={styles.contentHome}>
            <div className={styles.playersScrollbar}>
              <h2>HOME {homeScore}</h2>
              {home?.players.map((p, i) => (
                <Player player={p} key={i} onClick={() => openPlayerModal(p)} />
              ))}
            </div>
          </div>
          <div className={styles.contentAway}>
            <div className={styles.playersScrollbar}>
              <h2>AWAY {awayScore}</h2>
              {away?.players.map((p, i) => (
                <Player player={p} key={i} onClick={() => openPlayerModal(p)} />
              ))}
            </div>
          </div>

          {/* Render the logs and attach a click event handler */}
          <div className={styles.logs}>
            {logs?.map((e, i) => (
              // Wrap the log text and button inside a container div
              <div className="flex gap-2" key={i}>
                <p>{e.content}</p>
                <button onClick={() => handleLogClick(e.content)}>View</button>
              </div>
            ))}
          </div>

          {/* Show Image Modal when required */}
          {showImageModal && selectedLog !== null && (
            <ImageModal
              content={selectedLog}
              gameScore={selectedGameScore}
              onClose={closeImageModal}
            />
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

function Player({
  player,
  onClick,
}: {
  player: PlayerClass;
  onClick: () => void;
}) {
  return (
    <>
      <div>
        Player:
        <button onClick={onClick}>
          {player.first_name} {player.last_name}
        </button>
      </div>
    </>
  );
}
