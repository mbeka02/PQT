import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "./_Modal";
import ImageView from "./_imageView";
import PlayerView from "./_playerView";

import {
  GameClass,
  TeamClass,
  LogClass,
  PlayerClass,
} from "@/public/static/scripts/gameMechanics";

// Define the type for the selected log content
interface LogContent {
  text: string;
  imageSrc: string;
}

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
  //handles end game state
  let className;
  if (finished && won) {
    className = ` text-green-800  font-bold `;
  } else if (finished && draw) {
    className = ` text-yellow-500 font-bold `;
  } else if (finished && !won) {
    className = ` text-red-800  font-bold `;
  }

  return (
    <div
      className={`${className}" grid grid-cols-custom_4 gap-2 md:text-sm text-xs"`}
    >
      <div className=" bg-white  p-4 border-solid border-[1px] border-[#9c9c9c]  flex flex-row items-center h-20 md:h-16 gap-4">
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
      <div className="bg-white p-4 uppercase font-semibold border-solid border-[1px] border-[#9c9c9c] h-20 md:h-16 grid justify-center  items-center ">
        <p>Score:</p>
        <p> {gameScore}</p>
      </div>
    </div>
  );
}

// This function defines the box that displays the game logs
function LogWrapper({
  log,
  handleLogButtonClick,
  index,
}: {
  log: LogClass;
  handleLogButtonClick: (logContent: string, index: number) => void;
  index: number;
}) {
  let seconds = Math.round(log.date / 1000).toString() + "s";
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        //pass content and index of the generated log
        handleLogButtonClick(log.content, index);
      }}
    >
      <div className="text-gray-400 md:flex-row flex flex-col md:items-center  cursor-default ease-linear  rounded duration-100 hover:text-[#f8f8ff] hover:bg-[#1c1c1c]">
        <p className="hover:text-[#7fff00] mb-2 text-center min-w-[50px] w-[50px]">
          {seconds}
        </p>
        <p className="mb-2">{log.content}</p>
      </div>
    </div>
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
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [selectedLog, setSelectedLog] = useState<LogContent | null>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedGameScore, setSelectedGameScore] = useState<string>("");
  //Player Modal
  function closePlayerModal() {
    setShowModal(false);
  }
  function openPlayerModal(index: number) {
    setShowModal(true);
    setSelectedPlayer(index);
  }

  //controls expanded view
  function toggleExapnd() {
    setExapnd((prev) => !prev);
  }
  //counts tally for the generated log
  const pointsTally = (arr: number[]) => {
    let sum: number = 0;
    for (let index = 0; index < arr.length; index++) {
      sum += arr[index];
    }
    return sum;
  };

  function handleLogClick(logContent: string, i: number) {
    // Check if logs is defined and is an array with at least one element
    if (game.logs && game.logs.length > 0) {
      // Find the log that matches the clicked content
      const clickedLog = game.logs.find((log) => log.content === logContent);
      //do point tallying  based on the time the log was generated
      const home = pointsTally(game.homepointsArr.slice(0, i + 1));
      const away = pointsTally(game.awaypointsArr.slice(0, i + 1));

      const gameScore = `${home} - ${away}`;

      if (clickedLog) {
        // Check if the clicked log has an associated image
        const imageSrc = clickedLog.imageSrc
          ? clickedLog.imageSrc
          : "https://www.kget.com/wp-content/uploads/sites/2/2023/05/64702907474bb1.35988184.jpeg?w=2560&h=1440&crop=1"; // Use a placeholder image URL here

        // Create the object with the required properties
        const logData: LogContent = {
          text: logContent,
          imageSrc: imageSrc,
        };

        setSelectedLog(logData); // Set the selected log content in the state
        setShowImageModal(true); // Show the Image modal
        setSelectedGameScore(gameScore); //Pass the game score
      }
    }
  }

  function closeImageModal() {
    setShowImageModal(false);
  }

  const handleLogButtonClick = (logContent: string, index: number) => {
    // Call the existing function to show the image modal for the clicked log
    handleLogClick(logContent, index);
  };

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

  return (
    <>
      <div
        className={`${
          expand ? " h-fit  outline outline-black" : " h-[24rem] md:h-[18rem]"
        } bg-[#daa520] w-full md:w-[34rem] p-3 flex  flex-col m-2 ease-in-out duration-700 rounded-sm  text-sm `}
        onClick={toggleExapnd}
      >
        <div className=" md:grid-cols-custom grid grid-cols-custom_2 ">
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
            <div className="bg-white p-3   border-solid border-[1px] border-[#9c9c9c]">
              <p className="font-semibold">
                Location:{" "}
                {game.homeStadium
                  ? game.home.city + " Stadium"
                  : game.away.city + " Arena"}
              </p>
              <h3>Game conditions:</h3>

              <p>Weather: {game.weather}</p>
            </div>
          </div>

          <div className="bg-black border-solid border-[1px]  border-[#9c9c9c] h-[22rem] md:h-[16rem]  text-white overflow-y-scroll grid p-1 mx-2 ">
            {game.logs.length ? (
              game.logs.map((l, key) => (
                <LogWrapper
                  log={l}
                  key={key}
                  handleLogButtonClick={handleLogButtonClick}
                  index={key}
                ></LogWrapper>
              ))
            ) : (
              <p>No logs available yet...</p>
            )}
          </div>
        </div>
        <div className={expand ? " grid" : "hidden"}>
          <table
            className={
              "min-w-full text-center  font-light bg-white my-4 p-2 border-solid border-[1px] border-[#9c9c9c]"
            }
          >
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th className=" py-4 " scope="colgroup">
                  Game Leaders
                </th>
                <th className="py-4 " scope="colgroup">
                  Home
                </th>
                <th className=" py-4  " scope="colgroup">
                  Away
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm text-center">
                <td>Points:</td>
                {/*<td><span>{bestHomePlayerPointsName.toString()}</span></td> */}
                <td>
                  {bestHomePlayerPoints.first_name?.substring(0, 1)}.
                  {bestHomePlayerPoints.last_name}
                  {"   "}
                  {bestHomePlayerPoints.points.toString()}
                </td>

                <td>
                  {bestAwayPlayerPoints.first_name?.substring(0, 1)}.
                  {bestAwayPlayerPoints.last_name} {"   "}
                  {bestAwayPlayerPoints.points.toString()}
                </td>
              </tr>
              <tr className=" cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm">
                <td>Rebounds:</td>
                <td>
                  {bestHomePlayerRebounds.first_name?.substring(0, 1)}.
                  {bestHomePlayerRebounds.last_name} {"   "}
                  {bestHomePlayerRebounds.points.toString()}
                </td>

                <td>
                  {bestAwayPlayerRebounds.first_name?.substring(0, 1)}.
                  {bestAwayPlayerRebounds.last_name} {"   "}
                  {bestAwayPlayerRebounds.points.toString()}
                </td>
              </tr>
              <tr className=" cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm">
                <td>Assists:</td>
                <td className=" ">
                  {bestHomePlayerAssists.first_name?.substring(0, 1)}.
                  {bestHomePlayerAssists.last_name} {"   "}
                  {bestHomePlayerAssists.points.toString()}
                </td>

                <td>
                  {bestAwayPlayerAssists.first_name?.substring(0, 1)}.
                  {bestAwayPlayerAssists.last_name} {"   "}
                  {bestAwayPlayerAssists.points.toString()}
                </td>
              </tr>
              <tr className=" cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm">
                <td>Steals:</td>
                <td>
                  {bestHomePlayerSteals.first_name?.substring(0, 1)}.
                  {bestHomePlayerSteals.last_name} {"   "}
                  {bestHomePlayerSteals.points.toString()}
                </td>

                <td>
                  {bestAwayPlayerSteals.first_name?.substring(0, 1)}.
                  {bestAwayPlayerSteals.last_name} {"   "}
                  {bestAwayPlayerSteals.points.toString()}
                </td>
              </tr>
              <tr className=" cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm">
                <td>Blocks:</td>
                <td>
                  {bestHomePlayerBlocks.first_name?.substring(0, 1)}.
                  {bestHomePlayerBlocks.last_name} {"   "}
                  {bestHomePlayerBlocks.points.toString()}
                </td>

                <td>
                  {bestAwayPlayerBlocks.first_name?.substring(0, 1)}.
                  {bestAwayPlayerBlocks.last_name} {"   "}
                  {bestAwayPlayerBlocks.points.toString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex w-full justify-between">
            <div className="bg-white px-6 grid  border-solid border-[1px] border-[#9c9c9c] w-64  ">
              <div className="font-semibold my-2">Home Roster</div>
              {game.home.players.map((player, index) => (
                <p
                  className="gap-1 cursor-pointer hover:font-semibold "
                  onClick={(e) => {
                    e.stopPropagation();
                    openPlayerModal(index);
                  }}
                  key={index}
                >
                  {player.first_name} {""}
                  {player.last_name}{" "}
                  <span className="font-semibold uppercase mx-1 ">
                    {player.playing && "p"}
                  </span>
                </p>
              ))}
            </div>
            <div className="bg-white px-6  grid border-solid border-[1px] border-[#9c9c9c] w-64">
              <div className="font-semibold my-2">Away Roster</div>
              {game.away.players.map((player, index) => (
                <p
                  className="gap-1 cursor-pointer hover:font-semibold  "
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    openPlayerModal(index + game.away.players.length);
                  }}
                >
                  {player.first_name} {""}
                  {player.last_name}{" "}
                  <span className="font-semibold uppercase mx-1 ">
                    {player.playing && "p"}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <AnimatePresence mode="wait">
          <Modal>
            <PlayerView
              hideModalOnClick={closePlayerModal}
              // home={game.home.players}
              // away={game.away.players}
              players={[...game.home.players, ...game.away.players]}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          </Modal>
        </AnimatePresence>
      )}
      {/* Show Image Modal when required */}
      {showImageModal && selectedLog !== null && (
        <AnimatePresence mode="wait">
          <Modal>
            <ImageView
              content={selectedLog}
              gameScore={selectedGameScore}
              onClose={closeImageModal}
            />
          </Modal>
        </AnimatePresence>
      )}
    </>
  );
}
