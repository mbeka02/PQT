import styles from "styles/playerModal.module.css";
import { PlayerClass } from "@/public/static/scripts/gameMechanics";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";

interface PlayerModalProps {
  hideModalOnClick: () => void;
  home: PlayerClass[];
  away: PlayerClass[];
  setSelectedPlayer: Dispatch<SetStateAction<number>>;
  selectedPlayer: number;
}
//animation
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 35,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};
const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
const PlayerModal: React.FC<PlayerModalProps> = ({
  home,
  away,
  setSelectedPlayer,
  hideModalOnClick,
  selectedPlayer,
}) => {
  const players = home.concat(away);

  return (
    //account for user trying to go to non-existant index , fix onClick evts
    <Backdrop>
      <motion.div
        className="   m-auto grid h-4/5 w-4/5  rounded bg-white  p-4 lg:h-xxl   lg:w-1/2 z-10 relative"
        variants={dropIn}
      >
        {players.map((player, index) => {
          return (
            <div
              className={selectedPlayer === index ? "grid" : "hidden"}
              key={index}
            >
              <button
                className="absolute  -left-[5%]  bottom-0 top-0  "
                onClick={() => setSelectedPlayer((prev) => prev - 1)}
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
                  <img alt="avatar" src="/default.png" />
                </div>
                <div className="grid justify-start  py-3 px-2 ">
                  <h2 className="font-semibold">
                    {player.first_name} {player.last_name}
                  </h2>
                  <div className="">{player.team}</div>
                </div>
              </div>
              <div className="grid grid-cols-custom_2 ">
                <div className="flex flex-col py-2">
                  <div>
                    Astral Presence:<span>{player.Astral_Presence}</span>
                  </div>
                  <div>Resilience:{player.Resilience} </div>
                  <div>
                    Radiance:<span>{player.Radiance}</span>
                  </div>
                  <div>
                    Resonance:<span>{player.Resonance}</span>
                  </div>
                  <div>
                    Dynamism: <span>{player.Dynamism}</span>
                  </div>
                  <div>
                    Vibes:<span>{player.Vibes} </span>
                  </div>
                  <div>
                    Charm: <span>{player.Charm}</span>
                  </div>
                  <div>
                    Observation:<span>{player.Observation}</span>
                  </div>
                  <div>
                    Bravery:<span>{player.Bravery} </span>
                  </div>
                  <div>
                    Creativity:<span>{player.Creativity}</span>
                  </div>
                  <div>
                    Tenacity:<span>{player.Tenacity}</span>
                    <span></span>
                  </div>
                  <div>
                    Intelligence:<span>{player.Intelligence}</span>
                  </div>
                  <div>
                    Loyalty:<span>{player.Loyalty}</span>
                  </div>
                  <div>
                    Wit:<span>{player.Wit} </span>
                  </div>
                </div>
                <div>
                  <div>
                    Patience:<span>{player.Patience}</span>
                  </div>
                  <div>
                    Artistry: <span>{player.Artistry}</span>
                  </div>
                  <div>
                    Technomancy:<span>{player.Technomancy}</span>
                  </div>
                  <div>
                    Gravity: <span>{player.Gravity} </span>
                  </div>
                  <div>
                    Bioluminescence: <span>{player.Bioluminescence}</span>
                  </div>

                  <div>
                    Stink:<span>{player.Stink}</span>
                  </div>
                  <div>
                    Rhythm:<span>{player.Rhythm}</span>
                  </div>
                  <div>
                    Purple:<span>{player.Purple} </span>
                  </div>
                  <div>
                    Dankness:<span>{player.Dankness} </span>
                  </div>
                  <div>
                    Savagery:<span>{player.Savagery} </span>
                  </div>
                  <div>
                    Cleanliness:<span>{player.Cleanliness} </span>
                  </div>
                  <div>
                    Unicorn:<span>{player.Unicorn} </span>
                  </div>
                  <div>
                    Thirst:<span>{player.Thirst} </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </Backdrop>
  );
};

export default PlayerModal;
