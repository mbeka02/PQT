import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';

function Player({ p }: {p:PlayerClass}) {
    return <>
    <div>
        2pt: {p._2pt} <br/>
        3pt: {p._3pt} <br/>
        passing: {p.passing} <br/>
        dribbling: {p.dribbling} <br/>
        defense: {p.defense} <br/>
        jumping: {p.jumping} <br/>
        stealing: {p.stealing} <br/>
        blocking: {p.blocking} <br/>
        speed: {p.speed} <br/>
    </div>
    </>
}

export default function GameModal({ home, away, homeScore, awayScore, logs }: { home: TeamClass | undefined, away: TeamClass | undefined, homeScore: number | undefined, awayScore: number | undefined, logs:LogClass[] | undefined}) {
    return <>
    <div className={ styles.wrapper }>
        <div className={ styles.content }>
            <h1>
                {home && home.name}
                &nbsp;vs&nbsp;
                {away && away.name}
            </h1>
            <h3>
                {homeScore}
                |
                {awayScore}
            </h3>
            <div className={styles.playersScrollbar}>
                {home?.players.map((p) => <Player p={p}/>)}
            </div>
            <div className={ styles.logs }>
                {logs?.map((e, i) => <p key={i}>{e.content}</p>)}
            </div>
        </div>
    </div>
    </>
}