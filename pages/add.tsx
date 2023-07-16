import { useState } from "react";
import styles from "styles/add.module.css";

export default function Home() {
  const [teamName, setTeamName] = useState<string>();
  const [teamLocation, setTeamLocation] = useState<string>();

  const teamSchema = {
    id: "INTEGER",
    city: "TEXT",
    name: "TEXT",
    image: "BLOB",
    animal: "TEXT",
  };

  function handleTeamSubmit(event: any) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const form = event.target;
    const formData = new FormData(form);

    // Convert the form data to JSON
    const jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    const jsonData = JSON.stringify(jsonObject);

    // Send the form data to the API endpoint
    fetch("https://pqt-waltahhh.replit.app/addTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      // .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log(error);
      });
  }

  const handlePlayerSubmit = async function (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    // Get the form data
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert the form data to a JSON object
    const data: { [key: string]: string | number } = {};
    const intKeys: { [key: string]: boolean } = {
      team_id: true,
      _2pt: true,
      _3pt: true,
      passing: true,
      dribbling: true,
      defense: true,
      jumping: true,
      steals: true,
      blocks: true,
      speed: true,
    };

    formData.forEach((value: FormDataEntryValue, key: string) => {
      data[key] = intKeys[key]
        ? parseInt(value as string, 10)
        : (value as string);
    });

    // Send the JSON request to the server
    fetch("https://pqt-waltahhh.replit.app/addPlayer", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          className="hidden"
          action="https://pqt-waltahhh.replit.app/addTeam"
          method="post"
          content="application/json"
          onSubmit={(e) => handleTeamSubmit(e)}
        >
          <h1>Add a team</h1>
          <label>
            Id <input type="text" name="id" placeholder="id..." />
          </label>

          <label>City</label>
          <input type="text" name="city" placeholder="city..." />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="name..." />
          <label htmlFor="animal">Animal</label>
          <input type="text" name="animal" placeholder="animal..." />
          <input type="submit" />
        </form>
        <form
          className="grid w-2/3  "
          action="https://pqt-waltahhh.replit.app/addPlayer"
          method="post"
          content="application/json"
          onSubmit={handlePlayerSubmit}
        >
          <h1 className="text-2xl font-semibold my-4">Add a player</h1>

          <div className="grid lg:grid-cols-custom_2  border-solid border-t-[1px] border-black ">
            <div className="grid mx-6 border-solid  border-r-[1px] border-black ">
              <div className="grid">
                <label className="font-semibold" htmlFor="player-name">
                  {" "}
                  Name{" "}
                </label>
                <input
                  type="text"
                  id="player-name"
                  name="name"
                  className=" h-6 w-1/2  rounded border-2  border-black border-solid "
                />
              </div>

              <div className="grid">
                <label htmlFor="team_id" className="font-semibold">
                  Team ID
                </label>
                <input
                  type="number"
                  id="team_id"
                  name="team_id"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="home_location" className="font-semibold">
                  {" "}
                  Home Location
                </label>
                <input
                  type="text"
                  id="home-location"
                  name="home_location"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="conditions" className="font-semibold">
                  Conditions{" "}
                </label>
                <select
                  id="conditions"
                  name="conditions"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                >
                  <option value="Rainy">Rainy</option>
                  <option value="Sunny">Sunny</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Windy">Windy</option>
                </select>
              </div>

              <div className="grid">
                <label className="font-semibold" htmlFor="cuisine">
                  {" "}
                  Cuisine
                </label>
                <input
                  type="text"
                  id="cuisine"
                  name="cuisine"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="color" className="font-semibold">
                  {" "}
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="coffee" className="font-semibold">
                  Coffee
                </label>
                <select
                  id="coffee"
                  name="coffee"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                >
                  <option value="Espresso">Espresso</option>
                  <option value="Latte">Latte</option>
                  <option value="Cappuccino">Cappuccino</option>
                  <option value="Americano">Americano</option>
                  <option value="Mocha">Mocha</option>
                </select>
              </div>

              <div className="grid">
                <label htmlFor="class" className="font-semibold">
                  {" "}
                  Class
                </label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="zodiac" className="font-semibold">
                  Zodiac
                </label>
                <select
                  id="zodiac"
                  name="zodiac"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                >
                  <option value="Aries">Aries</option>
                  <option value="Taurus">Taurus</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Leo">Leo</option>
                  <option value="Virgo">Virgo</option>
                  <option value="Libra">Libra</option>
                  <option value="Scorpio">Scorpio</option>
                  <option value="Sagittarius">Sagittarius</option>
                  <option value="Capricorn">Capricorn</option>
                  <option value="Aquarius">Aquarius</option>
                  <option value="Pisces">Pisces</option>
                </select>
              </div>

              <div className="grid">
                <label htmlFor="vibes" className="font-semibold">
                  {" "}
                  Vibes
                </label>
                <input
                  type="text"
                  id="vibes"
                  name="vibes"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>
            </div>
            <div className="grid mx-6">
              <div className="grid">
                <label htmlFor="position" className="font-semibold">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>
              <div className="grid">
                <label htmlFor="style" className="font-semibold">
                  {" "}
                  Style
                </label>
                <input
                  type="text"
                  id="style"
                  name="style"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>
              <div className="grid">
                <label htmlFor="_2pt" className="font-semibold">
                  {" "}
                  2-Pointers{" "}
                </label>
                <input
                  type="number"
                  id="_2pt"
                  name="_2pt"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="_3pt" className="font-semibold">
                  3-Pointers
                </label>
                <input
                  type="number"
                  id="_3pt"
                  name="_3pt"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="passing" className="font-semibold">
                  {" "}
                  Passing
                </label>
                <input
                  type="number"
                  id="passing"
                  name="passing"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="dribbling" className="font-semibold">
                  {" "}
                  Dribbling
                </label>
                <input
                  type="number"
                  id="dribbling"
                  name="dribbling"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="defense" className="font-semibold">
                  {" "}
                  Defense{" "}
                </label>
                <input
                  type="number"
                  id="defense"
                  name="defense"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="jumping" className="font-semibold">
                  Jumping
                </label>
                <input
                  type="number"
                  id="jumping"
                  name="jumping"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="steals" className="font-semibold">
                  {" "}
                  Steals{" "}
                </label>
                <input
                  type="number"
                  id="steals"
                  name="steals"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="blocks" className="font-semibold">
                  {" "}
                  Blocks{" "}
                </label>
                <input
                  type="number"
                  id="blocks"
                  name="blocks"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>

              <div className="grid">
                <label htmlFor="speed" className="font-semibold">
                  {" "}
                  Speed{" "}
                </label>
                <input
                  type="number"
                  id="speed"
                  name="speed"
                  min="0"
                  max="10"
                  className=" h-6 w-1/2 rounded border-2  border-black border-solid"
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className=" mx-8   -translate-x-4 justify-self-center bg-black text-white grid rounded mt-3 justify-center items-center w-32 h-10 font-semibold p-2 hover:cursor-pointer "
          />
        </form>
      </div>
    </>
  );
}
