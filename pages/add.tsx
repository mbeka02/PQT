import { useState } from 'react';
import styles from 'styles/add.module.css';

export default function Home() {
    const [teamName, setTeamName] = useState<string>();
    const [teamLocation, setTeamLocation] = useState<string>();
    const [teamStatus, setTeamStatus] = useState<string>();

    function formDataOkay(): boolean {
        return teamName !== undefined && setTeamName !== undefined;
    }

    const handleTeamSubmit = async function (e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (!formDataOkay()) {
          return;
        }
        const formData = {
          'name': teamName,
          'location': teamLocation
        };
      
        fetch('https://blaseballapi.nicolello.repl.co/addTeam', {
          body: JSON.stringify(formData),
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
        }).then(async (r) => setTeamStatus(await r.json()));
      }      

    return <>
        <div className={styles.formWrapper}>
            Team status: {teamStatus}
            <form className={styles.form} action='https://blaseballapi.nicolello.repl.co/addTeam' method='post' content='application/json' onSubmit={handleTeamSubmit}>
                <h1>
                    Add a team
                </h1>
                <label>Name</label>
                <input type="text" name="teamName" placeholder="name..." value={teamName} onChange={(e) => setTeamName(e.target.value)}/>
                <label>Location</label>
                <input type="text" name="teamLocation" placeholder="location..." value={teamLocation} onChange={(e) => setTeamLocation(e.target.value)}/>
                <input type="submit"/>
            </form>
            <form className={styles.form} action='https://blaseballapi.nicolello.repl.co/addPlayer' method='post' content='application/json'>
                <h1>
                    Add a player
                </h1>
                <label htmlFor="home-location">Home Location:</label>
                <input type="text" id="home-location" name="home-location"/>

                <label htmlFor="conditions">Conditions:</label>
                <select id="conditions" name="conditions">
                    <option value="Rainy">Rainy</option>
                    <option value="Sunny">Sunny</option>
                    <option value="Cloudy">Cloudy</option>
                    <option value="Windy">Windy</option>
                </select>

                <label htmlFor="cuisine">Cuisine:</label>
                <input type="text" id="cuisine" name="cuisine"/>

                <label htmlFor="color">Color:</label>
                <input type="text" id="color" name="color"/>

                <label htmlFor="coffee">Coffee:</label>
                <select id="coffee" name="coffee">
                    <option value="Espresso">Espresso</option>
                    <option value="Latte">Latte</option>
                    <option value="Cappuccino">Cappuccino</option>
                    <option value="Americano">Americano</option>
                    <option value="Mocha">Mocha</option>
                </select>

                <label htmlFor="class">Class:</label>
                <input type="text" id="class" name="class"/>

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
                <input type="text" id="vibes" name="vibes"/>

                <label htmlFor="position">Position:</label>
                <input type="text" id="position" name="position"/>

                <label htmlFor="style">Style:</label>
                <input type="text" id="style" name="style"/>

                <label htmlFor="_2pt">2-Pointers:</label>
                <input type="number" id="_2pt" name="_2pt" min="0" max="10"/>

                <label htmlFor="_3pt">3-Pointers:</label>
                <input type="number" id="_3pt" name="_3pt" min="0" max="10"/>

                <label htmlFor="passing">Passing:</label>
                <input type="number" id="passing" name="passing" min="0" max="10"/>
            </form>
        </div>
    </>
}