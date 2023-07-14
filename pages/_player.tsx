import { PlayerClass } from "@/public/static/scripts/gameMechanics";
import React, { Dispatch, SetStateAction } from "react";
interface PlayerProps {
  hideModalOnClick: () => void;
  home: PlayerClass[];
  away: PlayerClass[];
  setSelectedPlayer: Dispatch<SetStateAction<number>>;
  selectedPlayer: number;
}

const PlayerView: React.FC<PlayerProps> = ({
  home,
  away,
  setSelectedPlayer,
  hideModalOnClick,
  selectedPlayer,
}) => {
  const players = home.concat(away);

  return (
    <>
      {players.map((player, index) => {
        return (
          <div
            className={selectedPlayer === index ? "grid" : "hidden"}
            key={index}
          >
            <button
              className="absolute  -left-[5%]  bottom-0 top-0  "
              onClick={() => setSelectedPlayer((prev) => prev - 1)}
              disabled={selectedPlayer === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 0 256 512"
                fill="white"
              >
                <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
              </svg>
            </button>
            <button
              className="absolute  -right-[5%]  bottom-0 top-0"
              onClick={() => setSelectedPlayer((prev) => prev + 1)}
              disabled={selectedPlayer === players.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                fill="white"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
              </svg>
            </button>
            <button
              onClick={hideModalOnClick}
              className="absolute right-4 top-1 h-4 w-4 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="hover:fill-red-500"
              >
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </button>
            <div className="grid grid-cols-custom_3">
              <div>
                <img alt="avatar" src="/default.png" className="w-4/5" />
              </div>
              <div className="grid   p-2">
                <div className="grid  w-full justify-start">
                  <h2 className="font-semibold">
                    {player.first_name} {player.last_name}
                  </h2>
                </div>
                <div className="">{player.team}</div>
                <div className="flex  w-full  gap-4">
                  <div className="font-semibold">Stats</div>
                  <div className="grid grid-cols-custom_2  w-1/2">
                    <div>
                      <div>{player.stats.points} PPG</div>
                      <div>{player.stats.rebounds} RPG</div>
                      <div>{player.stats.assists} APG</div>
                    </div>
                    <div>
                      <div>{player.stats.blocks} BPG</div>
                      <div> {player.stats.steals} SPG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-custom_2  border-solid border-[1px] border-gray-300 ">
              <div className="flex flex-col py-2  border-solid border-r-[1px] border-gray-300 px-3">
                <div className="font-semibold">
                  Astral Presence:
                  <span className=" font-normal ml-1">
                    {player.Astral_Presence}
                  </span>
                </div>
                <div className="font-semibold">
                  Resilience:{" "}
                  <span className=" font-normal ml-1">{player.Resilience}</span>
                </div>
                <div className="font-semibold">
                  Radiance:
                  <span className=" font-normal ml-1">{player.Radiance}</span>
                </div>
                <div className="font-semibold">
                  Resonance:
                  <span className=" font-normal ml-1">{player.Resonance}</span>
                </div>
                <div className="font-semibold">
                  Dynamism:
                  <span className=" font-normal ml-1">{player.Dynamism}</span>
                </div>
                <div className="font-semibold">
                  Vibes:
                  <span className=" font-normal ml-1">{player.Vibes} </span>
                </div>
                <div className="font-semibold">
                  Charm:
                  <span className=" font-normal ml-1">{player.Charm}</span>
                </div>
                <div className="font-semibold">
                  Observation:
                  <span className=" font-normal ml-1">
                    {player.Observation}
                  </span>
                </div>
                <div className="font-semibold">
                  Bravery :
                  <span className=" font-normal ml-1">{player.Bravery} </span>
                </div>
                <div className="font-semibold">
                  Creativity:
                  <span className=" font-normal ml-1">{player.Creativity}</span>
                </div>
                <div className="font-semibold">
                  Tenacity:
                  <span className=" font-normal ml-1">{player.Tenacity}</span>
                </div>
                <div className="font-semibold">
                  Intelligence:
                  <span className=" font-normal ml-1">
                    {player.Intelligence}
                  </span>
                </div>
                <div className="font-semibold">
                  Loyalty:
                  <span className=" font-normal ml-1">{player.Loyalty}</span>
                </div>
                <div className="font-semibold">
                  Wit:
                  <span className=" font-normal ml-1">{player.Wit} </span>
                </div>
              </div>
              <div className="flex flex-col py-2 px-3">
                <div className="font-semibold">
                  Patience:
                  <span className=" font-normal ml-1">{player.Patience}</span>
                </div>
                <div className="font-semibold">
                  Artistry:
                  <span className=" font-normal ml-1">{player.Artistry}</span>
                </div>
                <div className="font-semibold">
                  Technomancy:
                  <span className=" font-normal ml-1">
                    {player.Technomancy}
                  </span>
                </div>
                <div className="font-semibold">
                  Gravity:
                  <span className=" font-normal ml-1">{player.Gravity} </span>
                </div>
                <div className="font-semibold">
                  Bioluminescence:
                  <span className=" font-normal ml-1">
                    {player.Bioluminescence}
                  </span>
                </div>

                <div className="font-semibold">
                  Stink:
                  <span className=" font-normal ml-1">{player.Stink}</span>
                </div>
                <div className="font-semibold">
                  Rhythm:
                  <span className=" font-normal ml-1">{player.Rhythm}</span>
                </div>
                <div className="font-semibold">
                  Purple:
                  <span className=" font-normal ml-1">{player.Purple} </span>
                </div>
                <div className="font-semibold">
                  Dankness:
                  <span className=" font-normal ml-1">{player.Dankness}</span>
                </div>
                <div className="font-semibold">
                  Savagery:
                  <span className=" font-normal ml-1">{player.Savagery}</span>
                </div>
                <div className="font-semibold">
                  Cleanliness:
                  <span className=" font-normal ml-1">
                    {player.Cleanliness}
                  </span>
                </div>
                <div className="font-semibold">
                  Unicorn:
                  <span className=" font-normal ml-1">{player.Unicorn} </span>
                </div>
                <div className="font-semibold">
                  Thirst:
                  <span className=" font-normal ml-1">{player.Thirst} </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlayerView;
