import style from "../styles/game.module.css";
import { useState } from "react";
import GameModal from "./_gameModal";
import {
  GameClass,
  TeamClass,
  LogClass,
  PlayerClass,
} from "@/public/static/scripts/gameMechanics";
import modalStyles from "styles/gameModal.module.css";

// This function defines the box that displays each team's location, name, W/L record and game score
function TeamWrapper({
  team,
  gameScore,
  finished,
  won,
  draw,
}: {
  team: TeamClass;
  gameScore: number;
  finished: boolean;
  won: boolean;
  draw: boolean;
}) {
  /* let className = style.team;
  if (finished && won) {
    className = `${style.team} ${style.teamWon}`;
  } else if (finished && draw) {
    className = `${style.team} ${style.teamdraw}`;
  } else if (finished && !won) {
    className = `${style.team} ${style.teamLost}`;
  }*/
  return (
    <div className="grid grid-cols-custom gap-3">
      <div className="bg-white  p-4 border-solid border-[1px] border-[#9c9c9c]  flex flex-row items-center ">
        <p>{team.emoji}</p>
        <div>
          <div>
            <h3>
              {team.city}
              <br></br>
              {team.name}
            </h3>
            <p>
              <span>{team.wins}</span>-<span>{team.losses}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 uppercase font-semibold border-solid border-[1px] border-[#9c9c9c] ">
        <p>Score: {gameScore}</p>
      </div>
    </div>
  );
}

// This function defines the box that displays the game logs
function LogWrapper({ log }: { log: LogClass }) {
  let seconds = Math.round(log.date / 1000).toString() + "s";
  return (
    <>
      <div className={style.log}>
        <p className={style.logTime}>{seconds}</p>
        <p className={style.logContent}>{log.content}</p>
      </div>
    </>
  );
}

export default function Game({
  game,
  homeScore,
  awayScore,
}: {
  game: GameClass;
  homeScore: number;
  awayScore: number;
}) {
  const [showModal, setShowModal] = useState(false);
  const [expand, setExapnd] = useState(false);

  function showModalOnClick() {
    setShowModal(true);
  }

  function hideModalOnClick() {
    setShowModal(false);
  }
  //controls expanded view
  function toggleExapnd() {
    setExapnd((prev) => !prev);
  }

  if (
    !game ||
    !game.home ||
    !game.away ||
    homeScore === undefined ||
    awayScore === undefined
  ) {
    return null;
  }

  const getBestPlayerStat = (
    players: PlayerClass[],
    stat: "points" | "rebounds" | "assists" | "steals" | "blocks"
  ) => {
    const maxPointsPlayer = players.reduce((maxPlayer, player) => {
      return player.stats[stat] > maxPlayer.stats[stat] ? player : maxPlayer;
    }, players[0]);

    console.log(maxPointsPlayer.first_name);
    return {
      first_name: maxPointsPlayer.first_name,
      last_name: maxPointsPlayer.last_name,
      points: maxPointsPlayer.stats[stat],
    };
  };

  const bestHomePlayerPoints = getBestPlayerStat(game.home.players, "points");
  const bestHomePlayerRebounds = getBestPlayerStat(
    game.home.players,
    "rebounds"
  );
  const bestHomePlayerAssists = getBestPlayerStat(game.home.players, "assists");
  const bestHomePlayerSteals = getBestPlayerStat(game.home.players, "steals");
  const bestHomePlayerBlocks = getBestPlayerStat(game.home.players, "blocks");

  const bestAwayPlayerPoints = getBestPlayerStat(game.away.players, "points");
  const bestAwayPlayerRebounds = getBestPlayerStat(
    game.away.players,
    "rebounds"
  );
  const bestAwayPlayerAssists = getBestPlayerStat(game.away.players, "assists");
  const bestAwayPlayerSteals = getBestPlayerStat(game.away.players, "steals");
  const bestAwayPlayerBlocks = getBestPlayerStat(game.away.players, "blocks");

  console.log(expand);

  return (
    <>
      {showModal && (
        <div className={modalStyles.modalWrapper}>
          <button
            className={modalStyles.closeButton}
            onClick={hideModalOnClick}
            type="button"
          >
            X
          </button>
          <GameModal
            home={game.home}
            away={game.away}
            homeScore={homeScore}
            awayScore={awayScore}
            logs={game.logs}
          />
        </div>
      )}
      <div
        className={`${
          expand ? " h-fit" : " h-[26rem]"
        } bg-[#daa520] w-[34rem] p-3 flex  flex-col m-2 ease-in-out duration-700 rounded-sm`}
        // onClick={showModalOnClick}
      >
        <div className=" grid-cols-custom grid ">
          <div className="  grid gap-3 mx-2">
            <TeamWrapper
              team={game.home}
              gameScore={game.homepoints}
              finished={game.finished}
              won={game.homeWon}
              draw={game.draw}
            />
            <TeamWrapper
              team={game.away}
              gameScore={game.awaypoints}
              finished={game.finished}
              won={game.awayWon}
              draw={game.draw}
            />
            <div className="bg-white p-4 border-solid border-[1px] border-[#9c9c9c]">
              <p className="font-semibold">
                Location:{" "}
                {game.homeStadium
                  ? game.home.city + " Stadium"
                  : game.away.city + " Arena"}
              </p>
              <h3>Game conditions:</h3>

              <p>Weather: {game.weather}</p>
            </div>
            <button onClick={toggleExapnd}>expand</button>
          </div>

          <div className="bg-black border-solid border-[1px]  border-[#9c9c9c] h-[24rem]  text-white overflow-y-scroll grid p-1 mx-2">
            {game.logs.length ? (
              game.logs.map((l, key) => (
                <LogWrapper log={l} key={key}></LogWrapper>
              ))
            ) : (
              <p>No logs available yet...</p>
            )}
          </div>

          <div className={expand ? " grid" : "hidden"}>
            <table
              className={
                /*style.statsTable*/ expand ? style.statsTable : "hidden"
              }
            >
              <thead>
                <tr>
                  <th>Game Leaders</th>
                  <th>Home</th>
                  <th>Away</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Points:</td>
                  {/*<td><span>{bestHomePlayerPointsName.toString()}</span></td> */}
                  <td>
                    {bestHomePlayerPoints.first_name.substring(0, 1)}.
                    {bestHomePlayerPoints.last_name}
                  </td>
                  <td>{bestHomePlayerPoints.points.toString()}</td>
                  <td>
                    {bestAwayPlayerPoints.first_name.substring(0, 1)}.
                    {bestAwayPlayerPoints.last_name}
                  </td>
                  <td>{bestAwayPlayerPoints.points.toString()}</td>
                </tr>
                <tr>
                  <td>Rebounds:</td>
                  <td>
                    {bestHomePlayerRebounds.first_name.substring(0, 1)}.
                    {bestHomePlayerRebounds.last_name}
                  </td>
                  <td>{bestHomePlayerRebounds.points.toString()}</td>

                  <td>
                    {bestAwayPlayerRebounds.first_name.substring(0, 1)}.
                    {bestAwayPlayerRebounds.last_name}
                  </td>
                  <td>{bestAwayPlayerRebounds.points.toString()}</td>
                </tr>
                <tr>
                  <td>Assists:</td>
                  <td>
                    {bestHomePlayerAssists.first_name.substring(0, 1)}.
                    {bestHomePlayerAssists.last_name}
                  </td>
                  <td>{bestHomePlayerAssists.points.toString()}</td>
                  <td>
                    {bestAwayPlayerAssists.first_name.substring(0, 1)}.
                    {bestAwayPlayerAssists.last_name}
                  </td>
                  <td>{bestAwayPlayerAssists.points.toString()}</td>
                </tr>
                <tr>
                  <td>Steals:</td>
                  <td>
                    {bestHomePlayerSteals.first_name.substring(0, 1)}.
                    {bestHomePlayerSteals.last_name}
                  </td>
                  <td>{bestHomePlayerSteals.points.toString()}</td>
                  <td>
                    {bestAwayPlayerSteals.first_name.substring(0, 1)}.
                    {bestAwayPlayerSteals.last_name}
                  </td>
                  <td>{bestAwayPlayerSteals.points.toString()}</td>
                </tr>
                <tr>
                  <td>Blocks:</td>
                  <td>
                    {bestHomePlayerBlocks.first_name.substring(0, 1)}.
                    {bestHomePlayerBlocks.last_name}
                  </td>
                  <td>{bestHomePlayerBlocks.points.toString()}</td>
                  <td>
                    {bestAwayPlayerBlocks.first_name.substring(0, 1)}.
                    {bestAwayPlayerBlocks.last_name}
                  </td>
                  <td>{bestAwayPlayerBlocks.points.toString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
