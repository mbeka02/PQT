import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';
import PlayerModal from './_playerModal';
import React, { useState } from 'react';

function Player({ p, onClick }: { p: PlayerClass, onClick: () => void }) {
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
          {p.first_name} {p.last_name} <br />
        </button>
        <br />
      </div>
      {showModal && (
        <PlayerModal player={p} hideModalOnClick={hideModalOnClick} />
      )}
    </>
  );
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
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerClass | undefined>(
    undefined
  );

  function openPlayerModal(player: PlayerClass) {
    setSelectedPlayer(player);
    setShowPlayerModal(true);
  }

  function closePlayerModal() {
    setShowPlayerModal(false);
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
                <Player p={p} key={i} onClick={() => openPlayerModal(p)} />
              ))}
            </div>
          </div>
          <div className={styles.contentAway}>
            <div className={styles.playersScrollbar}>
              <h2>AWAY {awayScore}</h2>
              {away?.players.map((p, i) => (
                <Player p={p} key={i} onClick={() => openPlayerModal(p)} />
              ))}
            </div>
          </div>

          <div className={styles.logs}>
            {logs?.map((e, i) => (
              <p key={i}>{e.content}</p>
            ))}
          </div>
        </div>
      </div>

      {showPlayerModal && selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          hideModalOnClick={closePlayerModal}
        />
      )}
    </>
  );
}
