import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';
import PlayerModal from './_playerModal';
import React, { useState } from 'react';


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
                <Player key={i} p={p} />
              ))}
            </div>
          </div>
          <div className={styles.contentAway}>
            <div className={styles.playersScrollbar}>
              <h2>AWAY {awayScore}</h2>
              {away?.players.map((p, i) => (
                <Player key={i} p={p} />
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
    </>
  );
}

function Player({ p }: { p: PlayerClass }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        Player:
        <button
          className={styles.playerLink}
          onClick={() => setShowModal(true)}
        >
          {p.first_name} {p.last_name} <br />
        </button>
        <br />
      </div>
      {showModal && (
        <PlayerModal player={p} hideModalOnClick={() => setShowModal(false)} />
      )}
    </>
  );
}
