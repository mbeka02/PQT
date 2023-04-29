import { useState } from 'react';
import styles from 'styles/add.module.css';

export default function Home() {
    const [teamName, setTeamName] = useState<string>();
    const [teamLocation, setTeamLocation] = useState<string>();

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
        }).then(async (r) => (await r.json()));
    }

    const handlePlayerSubmit = async function (e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
    
        // Get the form data
        const form = e.currentTarget;
        const formData = new FormData(form);
    
        // Convert the form data to a JSON object
        const data: { [key: string]: string | number } = {};
        formData.forEach((value, key) => {
            if (key === '_2pt' || key === '_3pt' || key === 'passing' || key === 'dribbling' || key === 'defense' || key === 'jumping' || key === 'steals' || key === 'blocks' || key === 'speed') {
                data[key] = parseInt(value as string);
            } else {
                data[key] = value as string;
            }
        });
    
        // Send the JSON request to the server
        fetch('https://blaseballapi.nicolello.repl.co/addPlayer', {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (r) => {
            console.log(await r.json());
        });
    };
    

    return <>
        <div className={styles.formWrapper}>
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
            <form className={styles.form} action='https://blaseballapi.nicolello.repl.co/addPlayer' method='post' content='application/json' onSubmit={handlePlayerSubmit}>
                <h1>
                    Add a player
                </h1>
                <div className={styles.playerFormOne}>
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

                <input type="button" id="next" value="Next"/>

                <label htmlFor="style">Style:</label>
                <input type="text" id="style" name="style"/>

                <label htmlFor="_2pt">2-Pointers:</label>
                <input type="number" id="_2pt" name="_2pt" min="0" max="10"/>

                <label htmlFor="_3pt">3-Pointers:</label>
                <input type="number" id="_3pt" name="_3pt" min="0" max="10"/>

                <label htmlFor="passing">Passing:</label>
                <input type="number" id="passing" name="passing" min="0" max="10"/>

                <label htmlFor="dribbling">Dribbling:</label>
                <input type="number" id="dribbling" name="dribbling" min="0" max="10"/>

                <label htmlFor="defense">Defense:</label>
                <input type="number" id="defense" name="defense" min="0" max="10"/>

                <label htmlFor="jumping">Jumping:</label>
                <input type="number" id="jumping" name="jumping" min="0" max="10"/>

                <label htmlFor="steals">Steals:</label>
                <input type="number" id="steals" name="steals" min="0" max="10"/>

                <label htmlFor="blocks">Blocks:</label>
                <input type="number" id="blocks" name="blocks" min="0" max="10"/>

                <label htmlFor="speed">Speed:</label>
                <input type="number" id="speed" name="speed" min="0" max="10"/>

                <input type="submit" value="Submit"/>

                </div>
            </form>
        </div>
    </>
}