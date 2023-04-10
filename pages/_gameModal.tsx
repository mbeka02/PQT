import styles from 'styles/gameModal.module.css';
import { TeamClass } from '@/public/static/scripts/gameMechanics';

export default function GameModal({ home, away, homeScore, awayScore, logs }: { home: TeamClass | undefined, away: TeamClass | undefined, homeScore: number | undefined, awayScore: number | undefined, logs:string[] | undefined}) {
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
            <div className={ styles.logs }>
                {logs?.map((e) => <p>{e}</p>)}
            </div>
        </div>
    </div>
    </>
}