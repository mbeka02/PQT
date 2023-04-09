export class PlayerClass {
}

export class TeamClass {
    name;
    constructor(public city: string, public animal: string, public players: PlayerClass[], public playing: PlayerClass[], public points: number = 0) {
        this.name = city + ' ' + animal;
        this.city = city;
        this.animal = animal;
    }
}

export class GameClass {
    private cities: string[] = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Rio de Janeiro', 'Beijing', 'Dubai', 'Toronto', 'Mumbai', 'Cairo', 'Moscow', 'Los Angeles', 'Bangkok', 'Amsterdam', 'Barcelona', 'Berlin', 'Cape Town', 'Chicago', 'Dallas'];
    private animals: string[] = ['lion', 'tiger', 'elephant', 'giraffe', 'monkey', 'panda', 'zebra', 'koala', 'kangaroo', 'hippopotamus', 'crocodile', 'rhinoceros', 'gazelle', 'jaguar', 'lemur', 'penguin', 'seagull', 'whale', 'dolphin', 'octopus'];
    home: TeamClass;
    away: TeamClass;
    homepoints: number = 0;
    awaypoints: number = 0;
    totalpoints: number;
    logs: string[] = [];

    constructor() {
        const homeCity = this.cities[Math.floor(Math.random() * this.cities.length)];
        let awayCity = homeCity;
        while (awayCity === homeCity) {
        awayCity = this.cities[Math.floor(Math.random() * this.cities.length)];
        }
        const homeAnimal = this.animals[Math.floor(Math.random() * this.animals.length)];
        const awayAnimal = this.animals[Math.floor(Math.random() * this.animals.length)];
        this.home = new TeamClass(homeCity, homeAnimal, [], []);
        this.away = new TeamClass(awayCity, awayAnimal, [], []);
        const mean = 102; // statistically average mean points per game
        const stdDev = 10;
        this.totalpoints = Math.round(this.gaussianRand(mean, stdDev));
    }

    // I trust ChatGPT did a good job
    private gaussianRand(mean: number, stdDev: number): number {
        let x1, x2, rad, y1;
        do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
        } while (rad >= 1 || rad === 0);
        const c = Math.sqrt(-2 * Math.log(rad) / rad);
        y1 = x1 * c;
        const result = mean + y1 * stdDev;
        return result;
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

          const choices = (good) ? positiveLogs : negativeLogs;

          const res = choices[Math.floor(Math.random() * choices.length)]

          this.logs.push(res);
          console.log(res);
    }

    playRound(): void {
        if (!this.totalpoints) { // if no points left
            return;
        }
        let points: number = Math.floor(Math.random()) + 2;
        if (this.totalpoints === 5) { // if there are 5 points left they must be 3 and 2
            points = 3;
        }
        if (this.totalpoints === 4) { // similarly, with 4 they must be 2 and 2
            points = 2;
        }
        if (this.totalpoints < 4) { // with 3 or 2, return themselves
            points = this.totalpoints;
        }
        const winner: string = Math.random() < 0.5 ? 'home' : 'away';
        const loser: string = (winner === 'home') ? 'home' : 'away';
        if (winner === "home") {
            this.homepoints += points;
        } else {
            this.awaypoints += points;
        }
        const good = Math.random() < 0.5;
        if(good) {
            this.generateLog(winner, points, true);
        } else {
            this.generateLog(loser, points, false);
        }
        this.totalpoints -= points;
    }
}
