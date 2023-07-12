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
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <form
          className={styles.form}
          action="https://pqt-waltahhh.replit.app/addTeam"
          method="post"
          content="application/json"
          onSubmit={(e) => handleTeamSubmit(e)}
        >
          <h1>Add a team</h1>
          <label>Id</label>
          <input type="text" name="id" placeholder="id..." />
          <label>City</label>
          <input type="text" name="city" placeholder="city..." />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="name..." />
          <label htmlFor="animal">Animal</label>
          <input type="text" name="animal" placeholder="animal..." />
          <input type="submit" />
        </form>
        <form
          className={styles.form}
          action="https://pqt-waltahhh.replit.app/addPlayer"
          method="post"
          content="application/json"
          onSubmit={handlePlayerSubmit}
        >
          <h1>Add a player</h1>
          <div className={styles.playerFormOne}>
            <label htmlFor="player-name">Name</label>
            <input type="text" id="player-name" name="name" />
            <label htmlFor="player-name">Team ID</label>
            <input type="number" id="team_id" name="team_id" />
            <label htmlFor="home_location">Home Location:</label>
            <input type="text" id="home-location" name="home_location" />

            <label htmlFor="conditions">Conditions:</label>
            <select id="conditions" name="conditions">
              <option value="Rainy">Rainy</option>
              <option value="Sunny">Sunny</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Windy">Windy</option>
            </select>

            <label htmlFor="cuisine">Cuisine:</label>
            <input type="text" id="cuisine" name="cuisine" />

            <label htmlFor="color">Color:</label>
            <input type="text" id="color" name="color" />

            <label htmlFor="coffee">Coffee:</label>
            <select id="coffee" name="coffee">
              <option value="Espresso">Espresso</option>
              <option value="Latte">Latte</option>
              <option value="Cappuccino">Cappuccino</option>
              <option value="Americano">Americano</option>
              <option value="Mocha">Mocha</option>
            </select>

            <label htmlFor="class">Class:</label>
            <input type="text" id="class" name="class" />

            <label htmlFor="zodiac">Zodiac:</label>
            <select id="zodiac" name="zodiac">
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

            <label htmlFor="vibes">Vibes:</label>
            <input type="text" id="vibes" name="vibes" />

            <label htmlFor="position">Position:</label>
            <input type="text" id="position" name="position" />

            <label htmlFor="style">Style:</label>
            <input type="text" id="style" name="style" />

            <label htmlFor="_2pt">2-Pointers:</label>
            <input type="number" id="_2pt" name="_2pt" min="0" max="10" />

            <label htmlFor="_3pt">3-Pointers:</label>
            <input type="number" id="_3pt" name="_3pt" min="0" max="10" />

            <label htmlFor="passing">Passing:</label>
            <input type="number" id="passing" name="passing" min="0" max="10" />

            <label htmlFor="dribbling">Dribbling:</label>
            <input
              type="number"
              id="dribbling"
              name="dribbling"
              min="0"
              max="10"
            />

            <label htmlFor="defense">Defense:</label>
            <input type="number" id="defense" name="defense" min="0" max="10" />

            <label htmlFor="jumping">Jumping:</label>
            <input type="number" id="jumping" name="jumping" min="0" max="10" />

            <label htmlFor="steals">Steals:</label>
            <input type="number" id="steals" name="steals" min="0" max="10" />

            <label htmlFor="blocks">Blocks:</label>
            <input type="number" id="blocks" name="blocks" min="0" max="10" />

            <label htmlFor="speed">Speed:</label>
            <input type="number" id="speed" name="speed" min="0" max="10" />

            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
}
