import style from '../styles/game.module.css'
import { useState } from 'react';
import GameModal from './_gameModal';
import { GameClass, TeamClass } from '@/public/static/scripts/gameMechanics';
import modalStyles from 'styles/gameModal.module.css';

function TeamWrapper({team, gameScore} : {team: TeamClass, gameScore: number}) {
    return <>
    <div className={style.team}>
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

export default function Game({ game, homeScore, awayScore, id, logs } : { game: GameClass, homeScore: number, awayScore: number, id: number, logs: string[] }): JSX.Element {
    const [ showModal, setShowModal ] = useState<boolean>(false);

    function showModalOnClick() {
        setShowModal(true);
    }

    function hideModalOnClick() {
        setShowModal(false);
    }

    if(game.home === undefined || game.away === undefined) {
        return <></>;
    }

    return (
        <>
            { showModal && (
                <>
                    <GameModal home={game.home} away={game.away} homeScore={homeScore} awayScore={awayScore} logs={logs}/>
                    <button className={modalStyles.button} onClick={hideModalOnClick} type="button">X</button>
                </>
            )}

            <div className={style.wrapper} onClick={showModalOnClick}>
                <h1>{id}</h1>
                <div className={style.contentWrapper}>
                    <div className={style.teamswrapper}>
                        <TeamWrapper team={game.home} gameScore={game.homepoints}/>
                        <TeamWrapper team={game.away} gameScore={game.awaypoints}/>
                    </div>
                    <div className={style.logs}>
                        {logs.map((l) => <p>{l}<br/></p>)}
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
                            <tr>
                                <th></th>
                                <th>Home </th>
                                <th>Away</th>
                            </tr>
                            <tr>
                                <th>Points:</th>
                                <td>30</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <th>Rebounds:</th>
                                <td>30</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <th>Assists:</th>
                                <td>30</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <th>Steals:</th>
                                <td>30</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <th>Blocks:</th>
                                <td>30</td>
                                <td>60</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
