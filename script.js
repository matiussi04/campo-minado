import Game from "./game.js";

const game = new Game();

const buttonStart = document.querySelector("#start");
const buttonSurrender = document.querySelector("#surrender");
const settings = document.querySelector(".setting-container");
const rowsInput = document.querySelector("#rows");
const columnsInput = document.querySelector("#columns");
const bombsInput = document.querySelector("#bombs");

buttonStart.addEventListener("click",start);
buttonSurrender.addEventListener("click",surrender);

function start(){
    const rows = Number(rowsInput.value);
    const columns = Number(columnsInput.value);
    const bombs = Number(bombsInput.value);

    buttonStart.classList.add("off");
    buttonSurrender.classList.remove("off");
    settings.classList.add("off");


    if (rows > 0){
        game.rows = rows;
    }
    if (columns > 0){
        game.columns = columns;
    }

    game.maxPositions = game.rows * game.columns;

    if (bombs > 0){
        game.bombs = bombs;
    }

    game.start();

    document.querySelectorAll("td").forEach(v => {
        v.addEventListener("click", clickLeft)
        v.addEventListener("contextmenu", clickRight)
    });
}

function surrender(){
    buttonStart.classList.remove("off");
    buttonSurrender.classList.add("off");
    settings.classList.remove("off");

    rowsInput.value = "";
    columnsInput.value = "";
    bombsInput.value = "";

    game.reset();
}

function clickLeft(){
    const id = Number(this.id.substr(3));
    if (game.positions[id].bomb){
        alert("perdeu");
        document.querySelectorAll("td").forEach(v => {
            v.removeEventListener("click",clickLeft);
            v.removeEventListener("contextmenu",clickRight);
            if (game.positions[Number(v.id.substr(3))].bomb){
                v.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/000000/air-raider.png"/>`;
            }
        });
    }
    else{
        if (game.positions[id].numberBombsAround === 0){
            game.checkZeros(id);
        }
        else{
            this.innerHTML = game.positions[id].numberBombsAround;
            game.positions[id].visited = true;
        }
        if (game.checkVictory()){
            document.querySelectorAll("td").forEach(v => {
                v.removeEventListener("click",clickLeft);
                v.removeEventListener("contextmenu",clickRight);
            });
            alert("Booaaaaaaaaaa");
        }
    }
}

function clickRight(){
    if (!game.positions[Number(this.id.substr(3))].visited){
        if (this.innerHTML === ""){
            this.innerHTML = `<img src="https://img.icons8.com/pastel-glyph/64/000000/flag--v2.png"/>`;
        }
        else{
            this.innerHTML = "";
        }
    }
}

window.oncontextmenu = function ()
{
    return false;     // cancel default menu
}