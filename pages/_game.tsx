import style from '../styles/game.module.css'
import { useState } from 'react';
import GameModal from './_gameModal';
import { GameClass, TeamClass, LogClass } from '@/public/static/scripts/gameMechanics';
import modalStyles from 'styles/gameModal.module.css';

function TeamWrapper({team, gameScore, finished, won} : {team: TeamClass, gameScore: number, finished: boolean, won: boolean}) {
    let className = style.team;
    if(finished && won) {
        className = `${style.team} ${style.teamWon}`;
    } else if(finished) {
        className = `${style.team} ${style.teamLost}`;
    }
    return <>
    <div className={className}>
        <p>{team.emoji}</p>
        <div>
            <div>
                <h3>
                    {team.name}
                </h3>
                <p><span>{team.wins}</span>-<span>{team.losses}</span>-<span>{team.ties}</span></p>
            </div>
            <p>Score: {gameScore}</p>
        </div>
    </div>
    </>
}

function LogWrapper({ log } : { log: LogClass }) {
    let seconds = Math.round(log.date / 1000).toString() + "s";
    return <>
    <div className={style.log}>
        <p className={style.logTime}>{seconds}</p>
        <p className={style.logContent}>{log.content}</p>
    </div>
    </>
}

export default function Game({ game, homeScore, awayScore, id } : { game: GameClass, homeScore: number, awayScore: number, id: number }): JSX.Element {
    const [ showModal, setShowModal ] = useState<boolean>(false);

    function showModalOnClick() {
        setShowModal(true);
    }

    function hideModalOnClick() {
        setShowModal(false);
    }

    if(game == undefined || game.home == undefined || game.away == undefined || game == undefined || awayScore == undefined || id == undefined) {
        return <></>;
    }

    return (
        <>
            { showModal && (
                <>
                    <GameModal home={game.home} away={game.away} homeScore={homeScore} awayScore={awayScore} logs={game.logs}/>
                    <button className={modalStyles.button} onClick={hideModalOnClick} type="button">X</button>
                </>
            )}

            <div className={style.wrapper} onClick={showModalOnClick}>
                <h1>{id}</h1>
                <div className={style.contentWrapper}>
                    <div className={style.teamswrapper}>
                        <TeamWrapper team={game.home} gameScore={game.homepoints} finished={game.finished} won={game.homeWon}/>
                        <TeamWrapper team={game.away} gameScore={game.awaypoints} finished={game.finished} won={game.awayWon}/>
                    </div>
                    <div className={style.logs}>
                        {game.logs.length && game.logs.map((l, key) => <LogWrapper log={l} key={key}></LogWrapper>) || <p>No logs available yet...</p>}
                    </div>
                    <div className={style.conditions}>
                        <h3>
                            Game conditions:
                        </h3>
                        <p>
                            Location: {game.homeStadium ? game.home.city + " stadium" : game.away.city + " stadium"}
                        </p>
                        <p>
                            Weather: {game.weather}
                        </p>
                    </div>
                    <div className={style.gameStats}>
                        <table className={style.statsTable}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Home </th>
                                    <th>Away</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Points:</td>
                                    <td>30</td>
                                    <td>60</td>
                                </tr>
                                <tr>
                                    <td>Rebounds:</td>
                                    <td>30</td>
                                    <td>60</td>
                                </tr>
                                <tr>
                                    <td>Assists:</td>
                                    <td>30</td>
                                    <td>60</td>
                                </tr>
                                <tr>
                                    <td>Steals:</td>
                                    <td>30</td>
                                    <td>60</td>
                                </tr>
                                <tr>
                                    <td>Blocks:</td>
                                    <td>30</td>
                                    <td>60</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
