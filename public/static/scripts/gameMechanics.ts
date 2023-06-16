
//this appears to be related to the manual player data entry forms
export class PlayerClass {
    playerID: number;
    first_name: string = '';
    last_name: string = '';
    team: string = ''
    homeLocation: string = '';
    conditions: string[] = [];
    cuisine: string =  '';
    color: string = '';
    coffee: string = '';
    class: string = '';
    zodiac: string = '';
    vibes: string = '';
    position: string = '';
    style: string = '';
    _2pt: number = 0;
    _3pt: number = 0;
    passing: number = 0;
    dribbling: number = 0;
    defense: number = 0;
    jumping: number = 0;
    stealing: number = 0;
    blocking: number = 0;
    speed: number = 0;
    stats = {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0
    };
    constructor(id:number, fn:string, ln:string, t:string, h:string, cond:string[], cui:string, col:string, cof:string, cl:string, z:string, v:string, p:string, s:string, _2:number, _3:number, pas:number, d:number, def:number, j:number, st: number, b:number, spd:number) {
        this.playerID = id
        this.first_name = fn;
        this.last_name = ln;
        this.team = t;
        this.homeLocation = h;
        this.conditions = cond;
        this.cuisine = cui;
        this.color = col;
        this.coffee = cof;
        this.class = cl;
        this.zodiac = z;
        this.vibes = v;
        this.position = p;
        this.style = s;
        this._2pt = _2;
        this._3pt = _3;
        this.passing = pas;
        this.dribbling = d;
        this.defense = def;
        this.jumping = j;
        this.stealing = st;
        this.blocking = b;
        this.speed = spd;
        this.stats = {
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0
        };
    }
}


export class TeamClass {
    name;
    players;
    city;
    emoji;
    wins: number = 0;
    losses: number = 0;
    ties: number = 0;
    points: number = 0;
    constructor(name: string, players: PlayerClass[], city: string, animal:string) {
        let animals: string[] = ['lions', 'tigers', 'elephants', 'giraffes', 'monkeys', 'pandas', 'zebras', 'koalas', 'kangaroos', 'hippos', 'crocodiles', 'rhinos', 'penguins', 'whales', 'dolphins', 'octopi'];
        let emojis: string[] = ['🦁','🐯','🐘','🦒','🐵','🐼','🦓','🐨','🦘','🦛','🐊','🦏','🐧','🐋','🐬','🐙'];
        this.emoji = emojis[animals.indexOf(animal) || 0]
        this.city = city;
        this.name = name;
        this.players = players;
    }
}

export class LogClass {
    content: string;
    date: number;
    totalWins: number = 0;
    totalLosses: number = 0;

    constructor(content: string, gameStart: number) {
        this.content = content;
        this.date = new Date().getTime() - gameStart;
    }
}

export class GameClass {
    private conditions: string[] = ['sunny', 'cloudy', 'foggy', 'rainy', 'stormy', 'apocalyptic', 'humid', 'indoors'];
    home: TeamClass;
    away: TeamClass;
    homepoints: number = 0;
    awaypoints: number = 0;
    homerebounds: number = 0;
    awayrebounds: number = 0;
    homeassists: number = 0;
    awayassists: number = 0;
    homesteals: number = 0;
    awaysteals: number = 0;
    homeblocks: number = 0;
    awayblocks: number = 0;
    total_possessions: number; // Represents the total number of possessions in the match. With every play, one possession will be detracted until there are 0 left.
    logs: LogClass[] = [];
    weather: string;
    homeStadium: boolean;
    startTime: number;
    finished: boolean = false;
    homeWon: boolean = false;
    awayWon: boolean = false;
    draw: boolean = false;


// This constructor randomly grabs a home and away team from the TeamClass array
    constructor(teams:TeamClass[]) {
        const homeIndex = Math.round((teams.length - 1) * Math.random())
        this.home = teams[homeIndex];
        const awayIndex = Math.round((teams.length - 1) * Math.random())
        if(homeIndex == awayIndex) {
            homeIndex == teams.length - 1 ? this.away = teams[homeIndex - 1] : this.away = teams[homeIndex + 1];
        } else {
            this.away = teams[awayIndex];
        }

        console.log(this.home);
        console.log(this.away);

        this.home?.players.forEach(p => p.stats = {
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0
        });
        this.away?.players.forEach(p => p.stats = {
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0
        });
        const mean = 100; // statistically average mean possessions per game
        const stdDev = 15; // standard deviation. How much around the mean will 66.6% of data points be.
        this.total_possessions = Math.round(this.gaussianRand(mean, stdDev));
        this.weather = this.conditions[Math.floor(Math.random() * this.conditions.length)]; //this picks a random game condition from the array above
        this.homeStadium = Math.random() < 0.5; //this flips a coin to determine home team
        this.startTime = new Date().getTime()
    }

    // This generates a random number and ensures that it falls along a Gaussian distribution according to the mean and stdDev defined above
    private gaussianRand(mean: number, stdDev: number): number {
        /*
        Quick math lesson! This is a continuous probabilistic distribution using a Gaussian distribution because that's how the scores are distributed.
        With a Gaussian distribution, the stdDev represents how far 66% of the data is from the mean.
        */
        let x1, x2, rad, y1;
        do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
        } while (rad >= 1 || rad === 0);
        const c = Math.sqrt(-2 * Math.log(rad) / rad);
        y1 = x1 * c;
        return mean + y1 * stdDev;
    }

    //This is a function to pull a player from a team at random
    private getRandomPlayer(team: TeamClass):PlayerClass {
        return team.players[Math.round(Math.random() * (team.players.length - 1))]
    }

    //This creates a bunch of generic positive outcome logs
    private generateLog(team: string, num: number, good: boolean, chosenPlayerW ?: PlayerClass, chosenPlayerL ?: PlayerClass) {
        
        const playerNameW = chosenPlayerW ? `${chosenPlayerW.first_name} ${chosenPlayerW.last_name}` : 'a player';
        const playerNameL = chosenPlayerL ? `${chosenPlayerL.first_name} ${chosenPlayerL.last_name}` : 'a player';

        const positiveLogs = [
            `${playerNameW} (${team}) just dunked on ${playerNameL}!`,
            `${playerNameW} (${team}) scores ${num} points over ${playerNameL}!`,
            `${playerNameW} (${team}) makes a fantastic steal from ${playerNameL}!`,
            `${playerNameW} (${team}) scores an easy layup over ${playerNameL}!`,
            `${playerNameW}'s (${team}) defense on ${playerNameL} is impenetrable!`,           
            `${playerNameW} (${team}) makes an incredible block on ${playerNameL}!`,      
            `${playerNameW} (${team}) hits a beautiful jump shot over ${playerNameL}!`,
            `${playerNameW}'s (${team}) passing game is on point!`,
            `${playerNameW} (${team}) makes an impressive move for ${num} points!`,
            `${playerNameW}'s (${team}) fast break leads to an easy ${num} points!`
          ];
    
        //This creates a bunch of generic negative outcome logs
        const negativeLogs = [
            `${playerNameL} (${team}) misses an easy shot, contested by ${playerNameW}!`,
            `${playerNameL} (${team}) turns the ball over to ${playerNameW}!`,
            `${playerNameL} (${team}) commits a costly foul on ${playerNameW}!`,
            `${playerNameL} (${team}) misses an important free throw!`,
            `${playerNameL}'s (${team}) shooting is off tonight!`,
            `${playerNameL}'s (${team}) defense is atrocious!`,
            `${playerNameL}'s (${team}) passing game needs improvement!`,
            `${playerNameL}'s (${team}) shots just aren't falling!`,
            `${playerNameL}'s (${team}) offense is in a rut!`,
            `${playerNameL} (${team}) looks gassed!`
        ];
        
        //select the logs to choose from
        const choices = (good) ? positiveLogs : negativeLogs;

        const index = Math.floor(Math.random() * choices.length)
        
        /*
        //this if statement does the block stat incrementing, mentioned above in positiveLogs[] comments
        if(choices[index] == positiveLogs[4] || choices[index] == positiveLogs[5]) {
            team == 'home' ? this.getRandomPlayer(this.home).blocking += 1 : this.getRandomPlayer(this.away).blocking += 1;
        }
        */

        const res = choices[index]

        this.logs.push(new LogClass(res, this.startTime));
    }

    playRound(): void {
        if (!this.total_possessions) { // if no possessions are left
            this.homeWon = this.homepoints > this.awaypoints;
            this.awayWon = this.awaypoints > this.homepoints;

            if(!this.finished){ // to avoid executing endgame logic more than once; increments W/L/T statistics
                if(this.awayWon) {
                    this.home.wins += 1;
                    this.away.losses += 1;
                } else if(this.homepoints == this.awaypoints) {  //note to self to update this code; ties should not be possible -- if tied, then add possessions and resolve
                    this.draw = true;
                    this.home.ties += 1;
                    this.away.ties += 1;
                } else {
                    this.home.losses += 1;
                    this.away.wins += 1;
                }
            }
            this.finished = true;
            return;
        }

        let points: number = Math.floor(Math.random() * 3) + 1; // either 1, 2, or 3

        let isHomeWinner = Math.random() > 0.5; //flips a coin to determine if home team wins a given possession

        // Choose winner and loser semi-randomly

        /*
        if(this.homepoints + this.awaypoints > 10 && this.homepoints > 0 && this.awaypoints > 0) {
            const p = this.homepoints / this.awaypoints;
            isHomeWinner = Math.random() * p > 0.5;
        }
        */

        const winner: string = isHomeWinner ? 'home' : 'away';
        const loser: string = (winner === 'home') ? 'home' : 'away';

        //  This picks a random player from the team that "won" the possession and gives them their points; it also increments team score by the same point amount
        let chosenPlayerHome;
        let chosenPlayerAway;

        if (winner === "home") {
            this.homepoints += points;
            chosenPlayerHome = this.getRandomPlayer(this.home);
            chosenPlayerAway = this.getRandomPlayer(this.away);
            chosenPlayerHome.stats.points += points;
        } else {
            this.awaypoints += points;
            chosenPlayerAway = this.getRandomPlayer(this.away);
            chosenPlayerHome = this.getRandomPlayer(this.home);
            chosenPlayerAway.stats.points += points;
        }

        
/*
        // This code randomly allocates steals and blocks to the same chosenPlayer; probably want to delete/update this code eventually
        if (Math.random() > 0.8) {
                        // 1 every 5
                        chosenPlayer.stats.steals += 1;
                    }
        else if (Math.random() > 0.8) {
                            // 1 every less than 5
                            chosenPlayer.stats.blocks += 1;
                        }

        // Same random allocation thing here for rebounds; probably want to delete/update this code eventually                
        if(Math.random() > 0.9) {
            chosenPlayer.stats.rebounds += 1;
        }
*/

        // Decide whether to create a good log for the winner
        // or a bad one for the losers
        const good = Math.random() < 0.5;
        if(good) {
            this.generateLog(winner, points, true, chosenPlayerHome, chosenPlayerAway);
        } else {
            this.generateLog(loser, points, false, chosenPlayerAway, chosenPlayerHome);
        }
        this.total_possessions -= 1; // Increments total_possessions down by 1
    }
}
