import styles from 'styles/gameModal.module.css';
import { TeamClass, LogClass, PlayerClass } from '@/public/static/scripts/gameMechanics';

function Player({ p }: {p:PlayerClass}) {
    return <>
    <div>
        Player: {p.first_name} {p.last_name} <br/>
        <br/>
    </div>
    </>
}

export default function GameModal({ home, away, homeScore, awayScore, logs }: { home: TeamClass | undefined, away: TeamClass | undefined, homeScore: number | undefined, awayScore: number | undefined, logs:LogClass[] | undefined}) {
    return <>
    <div className={ styles.wrapper }>
         <div className={ styles.teamswrapperModal}>
                <h1>
                    {home && home.city && home.name}
                    &nbsp;vs&nbsp;
                    {away && away.city && away.name}
                </h1>
                <h3>
                    {homeScore}
                    |
                    {awayScore}
                </h3>
            <div className={ styles.content }>
                <div className={styles.playersScrollbar}>
                    {home?.players.map((p, i) => <Player p={p} key={i}/>)}
                </div>
                <div className={ styles.logs }>
                    {logs?.map((e, i) => <p key={i}>{e.content}</p>)}
                </div>
            </div>
        </div>
    </div>
    </>;
}