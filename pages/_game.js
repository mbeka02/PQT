import style from '../styles/game.module.css'

export default function Game({ homeScore, awayScore, id, home, away }) {
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
    </div>
    </>
}