import style from '../styles/game.module.css'

export default function Game({ homeScore, awayScore, id, home, away, lastLog } : { homeScore: number, awayScore: number, id: number, home: any, away: any, lastLog: string }): JSX.Element {
    if(home === undefined || away === undefined) {
        return <></>;
    }
    let homeName=home.city;
    let awayName=away.city;
    return <>
    <div className={style.wrapper}>
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
                {lastLog}
            </p>
        </div>
    </div>
    </>
}