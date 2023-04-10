import style from '../styles/game.module.css'
import { useState } from 'react';
import GameModal from './_gameModal';
import modalStyles from 'styles/gameModal.module.css';

export default function Game({ homeScore, awayScore, id, home, away, logs } : { homeScore: number, awayScore: number, id: number, home: any, away: any, logs: string[] }): JSX.Element {
    const [ showModal, setShowModal ] = useState<boolean>(false);

    function showModalOnClick() {
        setShowModal(true);
    }

    function hideModalOnClick() {
        setShowModal(false);
    }

    if(home === undefined || away === undefined) {
        return <></>;
    }

    let homeName=home.city;
    let awayName=away.city;

    return (
        <>
            { showModal && (
                <>
                    <GameModal home={home} away={away} homeScore={homeScore} awayScore={awayScore} logs={logs}/>
                    <button className={modalStyles.button} onClick={hideModalOnClick} type="button">X</button>
                </>
            )}

            <div className={style.wrapper} onClick={showModalOnClick}>
                <h1>{id}</h1>
                <div className={style.contentWrapper}>
                    <div>
                        <h3>
                            {homeName}
                        </h3>
                        <p>
                            {homeScore}
                        </p>
                    </div>
                    <div>
                        <h3>
                            {awayName}
                        </h3>
                        <p>
                            {awayScore}
                        </p>
                    </div>
                </div>
                <div className={style.logs}>
                    <p>
                        {logs[logs.length-1]}
                    </p>
                </div>
            </div>
        </>
    );
}
