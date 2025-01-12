import { PlayerClass } from "@/public/static/scripts/gameMechanics";
import React, { Dispatch, SetStateAction } from "react";
interface PlayerProps {
  hideModalOnClick: () => void;
  // home: PlayerClass[];
  // away: PlayerClass[];
  players: PlayerClass[];
  setSelectedPlayer: Dispatch<SetStateAction<number>>;
  selectedPlayer: number;
}

const PlayerView: React.FC<PlayerProps> = ({
  // home,
  // away,
  setSelectedPlayer,
  hideModalOnClick,
  selectedPlayer,
  players,
}) => {
  return (
    <>
      {players?.map((player, index) => {
        return (
          <div
            className={selectedPlayer === index ? "grid" : "hidden"}
            key={index}
          >
            <button
              className="absolute   left-[2%]   md:-left-[5%] bottom-0 top-0  "
              onClick={() => setSelectedPlayer((prev) => prev - 1)}
              disabled={selectedPlayer === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 0 256 512"
                className="hover:fill-goldenrod md:fill-white fill-black"
              >
                <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
              </svg>
            </button>
            <button
              className="absolute right-[2%]   md:-right-[5%]  bottom-0 top-0"
              onClick={() => setSelectedPlayer((prev) => prev + 1)}
              disabled={selectedPlayer === players.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 0 256 512"
                className="hover:fill-goldenrod md:fill-white fill-black"
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
            <div className="grid md:grid-cols-custom_2  border-solid border-[1px] border-gray-300 w-3/4 justify-self-center md:w-full  ">
              <div className="flex flex-col py-2  border-solid border-r-[1px] border-gray-300 px-3">
                <div className="font-semibold flex  w-3/4 justify-between">
                  Astral Presence -
                  <span className=" font-normal ml-1 ">
                    {player.Astral_Presence}
                  </span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Resilience -
                  <span className=" font-normal ml-1">{player.Resilience}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Radiance -
                  <span className=" font-normal ml-1">{player.Radiance}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Resonance -
                  <span className=" font-normal ml-1">{player.Resonance}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Dynamism -
                  <span className=" font-normal ml-1">{player.Dynamism}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Vibes -
                  <span className=" font-normal ml-1">{player.Vibes} </span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Charm -
                  <span className=" font-normal ml-1">{player.Charm}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Observation -
                  <span className=" font-normal ml-1">
                    {player.Observation}
                  </span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Bravery -
                  <span className=" font-normal ml-1">{player.Bravery} </span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Creativity -
                  <span className=" font-normal ml-1">{player.Creativity}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Tenacity -
                  <span className=" font-normal ml-1">{player.Tenacity}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Intelligence-
                  <span className=" font-normal ml-1">
                    {player.Intelligence}
                  </span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Loyalty-
                  <span className=" font-normal ml-1">{player.Loyalty}</span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Wit-
                  <span className=" font-normal ml-1">{player.Wit} </span>
                </div>
              </div>
              <div className="flex flex-col py-2 px-3">
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Patience-
                  <span className=" font-normal ml-1">{player.Patience}</span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Artistry-
                  <span className=" font-normal ml-1">{player.Artistry}</span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Technomancy-
                  <span className=" font-normal ml-1">
                    {player.Technomancy}
                  </span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Gravity-
                  <span className=" font-normal ml-1">{player.Gravity} </span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Bioluminescence-
                  <span className=" font-normal ml-1">
                    {player.Bioluminescence}
                  </span>
                </div>

                <div className="font-semibold  flex  w-3/4 justify-between">
                  Stink-
                  <span className=" font-normal ml-1">{player.Stink}</span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Rhythm-
                  <span className=" font-normal ml-1">{player.Rhythm}</span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Purple-
                  <span className=" font-normal ml-1">{player.Purple} </span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Dankness-
                  <span className=" font-normal ml-1">{player.Dankness}</span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  <span>Savagery-</span>
                  <span className=" font-normal ml-1">{player.Savagery}</span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Cleanliness-
                  <span className=" font-normal ml-1">
                    {player.Cleanliness}
                  </span>
                </div>
                <div className="font-semibold  flex  w-3/4 justify-between">
                  Unicorn-
                  <span className=" font-normal ml-1">{player.Unicorn} </span>
                </div>
                <div className="font-semibold flex  w-3/4 justify-between">
                  Thirst-
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
