export class PlayerClass {
    name: string = '';
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
    constructor( n:string, h:string, cond:string[], cui:string, col:string, cof:string, cl:string, z:string, v:string, p:string, s:string, _2:number, _3:number, pas:number, d:number, def:number, j:number, st: number, b:number, spd:number) {
        this.name = n;
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

function createRandomPlayer(n:number): PlayerClass[] {
    const homeLocations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'];
    const conditions = ['Rainy', 'Sunny', 'Cloudy', 'Windy'];
    const cuisines = ['Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian'];
    const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
    const coffees = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha'];
    const classes = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
    const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const vibes = ['Chill', 'Upbeat', 'Mellow', 'Energetic'];
    const positions = ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'];

    let res = [];

    for(let i=0; i<=n; i++) {
        const randomName = Math.random().toString(36).slice(2, 7); // random 5-letter name
        const randomHomeLocation = homeLocations[Math.floor(Math.random() * homeLocations.length)];
        const randomConditions = [conditions[Math.floor(Math.random() * conditions.length)]];
        const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomCoffee = coffees[Math.floor(Math.random() * coffees.length)];
        const randomClass = classes[Math.floor(Math.random() * classes.length)];
        const randomZodiac = zodiacs[Math.floor(Math.random() * zodiacs.length)];
        const randomVibes = vibes[Math.floor(Math.random() * vibes.length)];
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        const randomStyle = '';
        // random numbers from 0 to 10
        const random2pt = Math.floor(Math.random() * 10);
        const random3pt = Math.floor(Math.random() * 10);
        const randomPassing = Math.floor(Math.random() * 10);
        const randomDribbling = Math.floor(Math.random() * 10);
        const randomDefense = Math.floor(Math.random() * 10);
        const randomJumping = Math.floor(Math.random() * 10);
        const randomStealing = Math.floor(Math.random() * 10);
        const randomBlocking = Math.floor(Math.random() * 10);
        const randomSpeed = Math.floor(Math.random() * 10);

        const p = new PlayerClass(randomName, randomHomeLocation, randomConditions, randomCuisine, randomColor, randomCoffee, randomClass, randomZodiac, randomVibes, randomPosition, randomStyle, random2pt, random3pt, randomPassing, randomDribbling, randomDefense, randomJumping, randomStealing, randomBlocking, randomSpeed);
        
        res.push(p);
    }

    return res;
}


export class TeamClass {
    name;
    wins: number = 0;
    losses: number = 0;
    ties: number = 0;
    points: number = 0;
    constructor(public city: string, public animal: string, public emoji: string, public players: PlayerClass[], public playing: PlayerClass[]) {
        this.name = city + ' ' + animal;
        this.city = city;
        this.animal = animal;
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
    private cities: string[] = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Rio de Janeiro', 'Beijing', 'Dubai', 'Toronto', 'Mumbai', 'Cairo', 'Moscow', 'Los Angeles', 'Bangkok', 'Amsterdam', 'Barcelona', 'Berlin', 'Cape Town', 'Chicago', 'Dallas'];
    private animals: string[] = ['lions', 'tigers', 'elephants', 'giraffes', 'monkeys', 'pandas', 'zebras', 'koalas', 'kangaroos', 'hippos', 'crocodiles', 'rhinos', 'penguins', 'whales', 'dolphins', 'octopi'];
    private emojis: string[] = ['🦁','🐯','🐘','🦒','🐵','🐼','🦓','🐨','🦘','🦛','🐊','🦏','🐧','🐋','🐬','🐙'];
    private conditions: string[] = ['sunny', 'cloudy', 'foggy', 'rainy', 'stormy']
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
    totalpoints: number; // Represents the total points of the match. With every play, points will be detracted from this until there are exactly 0 left.
    logs: LogClass[] = [];
    weather: string;
    homeStadium: boolean;
    startTime: number;
    finished: boolean = false;
    homeWon: boolean = false;
    awayWon: boolean = false;

    constructor() {
        const homeCity = this.cities[Math.floor(Math.random() * this.cities.length)];
        // avoid awayCity and homeCity being the same
        let awayCity = homeCity;
        while (awayCity === homeCity) {
        awayCity = this.cities[Math.floor(Math.random() * this.cities.length)];
        }
        const homeAnimalIndex = Math.floor(Math.random() * this.animals.length);
        const homeAnimal = this.animals[homeAnimalIndex];
        const homeEmoji = this.emojis[homeAnimalIndex];
        let animalIndex = Math.floor(Math.random() * this.animals.length);
        while(animalIndex == homeAnimalIndex) {
            animalIndex = Math.floor(Math.random() * this.animals.length);
        }
        const awayAnimal = this.animals[animalIndex];
        const awayEmoji = this.emojis[animalIndex];
        this.home = new TeamClass(homeCity, homeAnimal, homeEmoji, createRandomPlayer(12), createRandomPlayer(6));
        this.away = new TeamClass(awayCity, awayAnimal, awayEmoji, createRandomPlayer(12), createRandomPlayer(6));
        this.home.players.forEach(p => p.stats = {
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0
        })
        const mean = 102; // statistically average mean points per game
        const stdDev = 10; // standard deviation. How much around the mean will 66.6% of data points be.
        this.totalpoints = Math.round(this.gaussianRand(mean, stdDev));
        this.weather = this.conditions[Math.floor(Math.random() * this.conditions.length)];
        this.homeStadium = Math.random() < 0.5;
        this.startTime = new Date().getTime()
    }

    // I trust ChatGPT did a good job
    private gaussianRand(mean: number, stdDev: number): number {
        /*
        Quick math lesson!
        This is a continuous probabilistic distribution using a Gaussian distribution
        Because that's how the scores are distributed.
        With a Gaussian distribution, the stdDev represents how far 66% of the data is from the mean.
        A Gaussian distribution is like the one for the IQ distribution.
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

    private getRandomPlayer(team: TeamClass):PlayerClass {
        return team.players[Math.round(Math.random() * (team.players.length - 1))]
    }

    private generateLog(team: string, num: number, good: boolean) {
        const positiveLogs = [
            `The ${team} team just made an impressive slam dunk!`,
            `The ${team} team scores ${num} points!`,
            `The ${team} team makes a fantastic steal!`,
            `The ${team} team scores an easy layup!`,
            `The ${team} team's defense is on fire!`,
            `The ${team} team makes an incredible block!`,
            `The ${team} team hits a beautiful jump shot!`,
            `The ${team} team's passing game is on point!`,
            `The ${team} team's fans are going wild after that score!`,
            `The ${team} team's fast break leads to an easy ${num} points!`
          ];
          
        const negativeLogs = [
            `The ${team} team misses an easy shot!`,
            `The ${team} team turns over the ball!`,
            `The ${team} team commits a costly foul!`,
            `The ${team} team misses an important free throw!`,
            `The ${team} team's shooting is off tonight!`,
            `The ${team} team's defense is struggling!`,
            `The ${team} team's passing game needs improvement!`,
            `The ${team} team's shots just aren't falling!`,
            `The ${team} team's offense is in a rut!`,
            `The ${team} team's slow pace is hurting their chances!`
        ];
        
        //select the logs to choose from
        const choices = (good) ? positiveLogs : negativeLogs;

        const index = Math.floor(Math.random() * choices.length)
        
        if(choices[index] == positiveLogs[4] || choices[index] == positiveLogs[5]) {
            team == 'home' ? this.getRandomPlayer(this.home).blocking += 1 : this.getRandomPlayer(this.away).blocking += 1;
        }

        const res = choices[index]

        this.logs.push(new LogClass(res, this.startTime));
    }

    playRound(): void {
        if (!this.totalpoints) { // if no points left
            this.homeWon = this.homepoints > this.awaypoints;
            this.awayWon = !this.homeWon;

            if(!this.finished){ // to avoid doing it more than once
                if(this.homeWon) {
                    this.home.wins += 1;
                    this.away.losses += 1;
                } else {
                    this.home.losses += 1;
                    this.away.wins += 1;
                }
            }
            this.finished = true;
            return;
        }
        let points: number = Math.floor(Math.random()) + 2; // either 2 or 3
        if (this.totalpoints === 5) { // if there are 5 points left they must be 3 and 2
            points = 3;
        }
        if (this.totalpoints === 4) { // similarly, with 4 they must be 2 and 2
            points = 2;
        }
        if (this.totalpoints < 4) { // with 3 or 2, return themselves
            points = this.totalpoints;
        }
        // Choose winner and loser randomly
        const winner: string = Math.random() < 0.5 ? 'home' : 'away';
        const loser: string = (winner === 'home') ? 'home' : 'away';
        //  Give them their points, respectively
        let chosenPlayer;
        if (winner === "home") {
            this.homepoints += points;
            chosenPlayer = this.getRandomPlayer(this.home);
        } else {
            this.awaypoints += points;
            chosenPlayer = this.getRandomPlayer(this.away);
        }
        chosenPlayer.stats.points++;
        if (Math.random() > 0.8) {
                        // 1 every 5
                        chosenPlayer.stats.steals += 1;
                    }
        else if (Math.random() > 0.8) {
                            // 1 every less than 5
                            chosenPlayer.stats.blocks += 1;
                        }
        if(Math.random() > 0.9) {
            chosenPlayer.stats.rebounds += 1;
        }
        // Decide whether to create a good log for the winner
        // or a bad one for the losers
        const good = Math.random() < 0.5;
        if(good) {
            this.generateLog(winner, points, true);
        } else {
            this.generateLog(loser, points, false);
        }
        this.totalpoints -= points;
    }
}
