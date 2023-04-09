import styles from 'styles/gameModal.module.css';
import { TeamClass } from '@/public/static/scripts/gameMechanics';
import { useState } from 'react';

export default function GameModal({ home, away, homeScore, awayScore, logs }: { home: TeamClass | undefined, away: TeamClass | undefined, homeScore: number | undefined, awayScore: number | undefined, logs:string[] | undefined}) {
    const [ hidden, setHidden ] = useState<boolean>(false);
    function close() {
        setHidden(true);
    }
    if(hidden) {
        return <></>
    }
    return <>
    <div className={ styles.wrapper }>
        <button type="button" onClick={close}>X</button>
        <div className={ styles.content }>
            <h1>
                {home && home.name}
                vs
                {away && away.name}
            </h1>
            <h3>
                {homeScore}
                |
                {awayScore}
            </h3>
        </div>
    </div>
    </>
}