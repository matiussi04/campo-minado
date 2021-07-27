export default class Game{
    constructor(){
        this.rows = 5;
        this.columns = 5;
        this.bombs = 5;
        this.maxPositions = this.rows * this.columns;
        this.positions = [];
        this.gameContainer = document.querySelector(".game");
    }

    start(){
        let HTML = "<table>";      

        this.setBombs();
        this.checkBombsAround();
    
        for(let i = 0 ; i < this.rows ; i++){
            HTML += "<tr>";
            for(let j = 0 ; j < this.columns ; j++){
                const id = i * this.columns + j;
                HTML += `<th id=th-${id}></th>`;
            }
            HTML += "</tr>";
        }
    
        HTML += "</table>";
        this.gameContainer.innerHTML = HTML;
    }

    checkBombsAround(){
        for(let i = 0 ; i < this.maxPositions ; i++){
            const firstRow = i < this.columns;
            const firstColumn = i % this.columns === 0;
            const lastRow = i >= ((this.rows - 1) * this.columns);
            const lastColumn = (i+1) % this.columns === 0;

            if (!this.positions[i].bomb){
                this.positions[i].numberBombsAround = this.checkBombs(i);
            }
        }
    }

    setBombs(){
        for(let i = 0 ; i < (this.maxPositions) ; i++){
            this.positions[i] = {
                bomb: false,
                numberBombsAround: 0,
                visited: false
            };
        }

        for(let i = 0 ; i < this.bombs ; i++){
            let row = random(0,this.rows);
            let column = random(0,this.columns);
    
            while (this.positions[row * this.columns + column].bomb){
                row = random(0,this.rows);
                column = random(0,this.columns);
            }
    
            this.positions[row * this.columns + column].bomb = true;
        }
    }

    checkBombs(id){
        const directions = this.checkDirections(id);
        let bombs = 0;
        for (let i = 0 ; i < directions.length ; i++){
            switch(directions[i]){
                case 1:
                    bombs = this.positions[id - this.columns].bomb ? bombs + 1 : bombs;
                    break;
                case 2:
                    bombs = this.positions[id - this.columns + 1].bomb ? bombs + 1 : bombs;
                    break;
                case 3:
                    bombs = this.positions[id + 1].bomb ? bombs + 1 : bombs;
                    break;
                case 4:
                    bombs = this.positions[id + this.columns + 1].bomb ? bombs + 1 : bombs;
                    break;
                case 5:
                    bombs = this.positions[id + this.columns].bomb ? bombs + 1 : bombs;
                    break;
                case 6:
                    bombs = this.positions[id + this.columns - 1].bomb ? bombs + 1 : bombs;
                    break;
                case 7:
                    bombs = this.positions[id - 1].bomb ? bombs + 1 : bombs;
                    break;
                case 8:
                    bombs = this.positions[id - this.columns - 1].bomb ? bombs + 1 : bombs;
                    break;
            }
        }
        return bombs;
    }

    checkDirections(i){
        const firstRow = i < this.columns;
        const firstColumn = i % this.columns === 0;
        const lastRow = i >= ((this.rows - 1) * this.columns);
        const lastColumn = (i+1) % this.columns === 0;

        if (firstRow){
            if (firstColumn){
                return [3,4,5];
            }
            else{
                if(lastColumn){
                    return [5,6,7];
                }
                else{
                    return [3,4,5,6,7];
                }
            }
        }
        else{
            if(lastRow){
                if(firstColumn){
                    return [1,2,3];
                }
                else{
                    if(lastColumn){
                        return [1,7,8];
                    }
                    else{
                        return [1,2,3,7,8];
                    }
                }
            }
            else{
                if(firstColumn){
                    return [1,2,3,4,5];
                }
                else{
                    if(lastColumn){
                        return [1,5,6,7,8];
                    }
                    else{
                        return [1,2,3,4,5,6,7,8];
                    }
                }
            }
        }
    }

    checkZeros(id){

        if (this.positions[id].bomb){
            return;
        }
        if (this.positions[id].numberBombsAround > 0){
            document.querySelector(`#th-${id}`).innerHTML = this.positions[id].numberBombsAround;
            this.positions[id].visited = true;
            return;
        }
        if (this.positions[id].visited){
            return;
        }
        else{
            this.positions[id].visited = true;
        }

        const directions = this.checkDirections(id);
    
        for (let i = 0 ; i < directions.length ; i++){
            switch(directions[i]){
                case 1:
                    this.checkZeros(id - this.columns);
                    break;
                case 2:
                    this.checkZeros(id - this.columns + 1);
                    break;
                case 3:
                    this.checkZeros(id + 1);
                    break;
                case 4:
                    this.checkZeros(id + this.columns + 1);
                    break;
                case 5:
                    this.checkZeros(id + this.columns);
                    break;
                case 6:
                    this.checkZeros(id + this.columns - 1);
                    break;
                case 7:
                    this.checkZeros(id - 1);
                    break;
                case 8:
                    this.checkZeros(id - this.columns - 1);
                    break;
            }
        }
        document.querySelector(`#th-${id}`).classList.add("zero");
    }

    checkVictory(){
        for (let i = 0 ; i < this.maxPositions ; i++){
            if (!this.positions[i].visited && !this.positions[i].bomb){
                return false;
            }
        }
        return true;
    }

    reset(){
        this.rows = 5;
        this.columns = 5;
        this.bombs = 5;
        this.gameContainer.innerHTML = "";
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}