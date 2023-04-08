import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import gameStyles from '@/styles/game.module.css'
import Game from './_game';
import { GameClass, TeamClass, PlayerClass } from '@/public/static/scripts/gameMechanics';
import { useState } from 'react';

export default function Home() {
  const [games, setGames] = useState<GameClass[]>(Array.from({ length: 700 }, _ => new GameClass()))
  function play() {
    let temp = [...games];
    temp.forEach((game) => {
      game.playRound();
    })
    setGames(temp);
  }
  return (
    <>
      <Head>
        <title>Blaseball clone</title>
        <meta name="description" content="A clone of the Blaseball app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <button onClick={play}>Click me!</button>
        <div className={gameStyles.container}>
        {
          games.map((game, i) => <>
          <Game
            homeScore={game.homepoints}
            awayScore={game.awaypoints}
            home={game.home}
            away={game.away}
            id={i}></Game></>)
        }
        </div>
      </main>
    </>
  )
}
