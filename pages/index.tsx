import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Game from "./_game";
import Player from "./_player";
import {
  GameClass,
  PlayerClass,
  TeamClass,
} from "@/public/static/scripts/gameMechanics";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Blob } from "buffer";

interface APITeamData {
  [key: string]: {
    team: {
      id: number;
      city: string;
      name: string;
      image: Blob;
      animal: string;
    };
    players: PlayerClass[];
  };
}

export default function Home({
  teams,
  player,
}: {
  teams: APITeamData;
  player: any;
}) {
  const [games, setGames] = useState<GameClass[]>();
  const [num, setNum] = useState<number>(10);
  const [t, setT] = useState<TeamClass[]>([]);
  console.log(player);

  useEffect(() => {
    let res: TeamClass[] = [];
    teams &&
      Object.keys(teams).forEach((k: string) => {
        res.push(
          new TeamClass(
            teams[k].team.name,
            teams[k].players,
            teams[k].team.city,
            teams[k].team.animal
          )
        );
      });
    setT(res);
    setGames(Array.from({ length: 10 }, (_) => new GameClass(res)));
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [teams]);

  if (!Object.keys(teams).length) {
    return (
      <>
        <h1>
          The server returned null teams! This is likely because it doesn&apos;t
          have enough data. Please run &apos;python3 generate.py&apos; to
          generate 2000 random players and their relative teams
        </h1>
      </>
    );
  }

  function doTimes(times: number, f: Function) {
    for (let i = 0; i < times; i++) {
      f();
    }
  }

  function reset() {
    setGames([]);
    updateNumber(num);
  }

  function play() {
    let temp = games == undefined ? [] : [...games];
    temp.forEach((game) => {
      game.playRound();
    });
    setGames(temp);
  }

  function updateNumber(num: number) {
    setGames(Array.from({ length: num * multiplier }, (_) => new GameClass(t)));
    setNum(num);
  }

  const MAXSIZE = 100;
  const multiplier = MAXSIZE / 100;
  return (
    <>
      <Head>
        <title>PQT</title>
        <meta name="description" content="A Blasketball simulation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.commandCenter}>
          <div className="grid  gap-1">
            <div className="flex w-full gap-2 items-center">
              <button
                onClick={play}
                className="bg-goldenrod p-1 w-28 h-8 rounded flex justify-center items-center text-white font-semibold"
              >
                Play a round
              </button>
              <button
                onClick={() => doTimes(5, play)}
                className="bg-goldenrod p-2 w-10 h-8 rounded flex justify-center items-center text-white font-semibold"
              >
                x5
              </button>
              <button
                onClick={() => doTimes(15, play)}
                className="bg-goldenrod p-2 w-10 h-8 rounded flex justify-center items-center text-white font-semibold"
              >
                x15
              </button>
            </div>
            <label className="font-semibold">{num * multiplier}</label>
            <input
              type="range"
              id="number"
              onChange={function (e: any) {
                updateNumber(parseInt(e.target.value));
              }}
              value={num}
              className="accent-goldenrod "
            />
            <button
              onClick={reset}
              className="bg-goldenrod p-2 w-24 h-8 rounded flex justify-center items-center text-white font-semibold justify-self-center"
            >
              Reset
            </button>
            <Link href="/add" className="hidden">
              Click me to go add players/teams
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly">
          <Player playerInfo={player} />
          {games?.map((game, index) => (
            <>
              <Game
                game={game}
                homeScore={game.homepoints}
                awayScore={game.awaypoints}
                key={index}
              ></Game>
            </>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    let teams: APITeamData | undefined = undefined;
    let player;

    await fetch("https://pqt-waltahhh.replit.app/get25teams")
      .then((response) => response.json())
      .then((data) => (teams = data))
      .catch((err) => console.log(err));

    await fetch(`https://pqt-waltahhh.replit.app/player/test`)
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then((data) => {
            // The response was a JSON object
            // Process your data as an object
            player = data;
          });
        } else {
          return response.json().then((text) => {
            // The response wasn't a JSON object
            // Process your text as a String
            player = text;
          });
        }
      })

      .catch((err) => console.log(err));

    if (teams == undefined || typeof teams === undefined) {
      throw new Error("Team data undefined");
    }

    if (player === undefined || typeof player === undefined) {
      throw new Error("Player data undefined");
    }

    return {
      props: {
        teams,
        player,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        teams: {},
        player: {},
      },
    };
  }
}
