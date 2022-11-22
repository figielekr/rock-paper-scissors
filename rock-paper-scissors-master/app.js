//console.log("xxx")
// state
// score
// [;ayer pick
// ai pick

// https://www.youtube.com/watch?v=lfQmsYCDci8 1:40:02


let playerWinsLSKey = "playerWins";
let AIWinsLSKey = "AIWins";
const winningResultMap = {
    Paper: ['Rock'],
    Rock: ['Scissors'],
    Scissors: ['Paper'],
}

let state = {
    playerWins: Number(localStorage.getItem(playerWinsLSKey)),
    AIWins: Number(localStorage.getItem(AIWinsLSKey)),
    playerPick: null,
    AIPick: null,
};

const renderScore = () =>{
    const pointsElement = document.querySelector(".points");
    pointsElement.innerText = state.playerWins- state.AIWins;
};

const bindPickEvents = () => {
    document.querySelectorAll(".options button").forEach(button =>{
        button.addEventListener("click", pick);

    });
    document.querySelector(".result-button").addEventListener("click", reset);
}
const hideOptions = () => {
    const optionsElement = document.querySelector(".options");
    optionsElement.classList.add("slide-left");
    /*setTimeout(() => {
        optionsElement.classList.add("hidden");
    }, 500)*/
    //
}
const showFight = () => {
    const fightElement = document.querySelector(".fight")
    fightElement.classList.add("slide-left");
    fightElement.classList.remove("hidden");
    createElementPickedByPlayer();
    createElementPickedByAI();
    showResult();
}
const showResult = () =>{
    const resultTextElement = document.querySelector(".result-text");
    if (winningResultMap[state.playerPick].includes(state.AIPick)){
        //console.log('playerWins');
        resultTextElement.innerHTML = "You win";
        localStorage.setItem(playerWinsLSKey, state.playerWins+1);
        state = {
            ...state,
            playerWins: state.playerWins+1,
        }
    }
        else if (winningResultMap[state.AIPick].includes(state.playerPick)){
            //console.log('playerLose')
        resultTextElement.innerHTML = "You lose";
        localStorage.setItem(AIWinsLSKey, state.AIWins+1);
        state = {
            ...state,
            AIWins: state.AIWins + 1,
        }
        }

        else {
        resultTextElement.innerHTML = "Draw";
        /*console.log('draw')*/
        }

    console.log(state);
    setTimeout(renderResult, 300);
    renderScore();
}
const renderResult = () => {
    document.querySelector(".result").classList.add("shown");
    document.querySelector(".pick.ai").classList.add("moved");
    document.querySelector(".pick.player").classList.add("moved");
}

const createElementPickedByPlayer = () => {
    const playerPick = state.playerPick;

    const pickContainerElement = document.querySelector(".pick__container--player");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createElementPickElement(playerPick));
}
createElementPickedByAI = () => {
    const AIPick = state.AIPick;

    const pickContainerElement = document.querySelector(".pick__container--ai");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createElementPickElement(AIPick));
}
const createElementPickElement = (option) => {
    const pickElement = document.createElement("div");
    //console.log(option);
    pickElement.classList.add("button", `button--${option}`);

    //console.log("button", `button--${option}`)

    const imageContainerElement = document.createElement("div");
    imageContainerElement.classList.add("button_image-container");

    //console.log(`./images/icon-${option}.svg`)

    const imgElement = document.createElement("img");
    //imgElement.src = "./images/icon-" + playerPick + ".svg";
    imgElement.src = `./images/icon-${option}.svg`;
    imgElement.alt = option;

    imageContainerElement.appendChild(imgElement);

    pickElement.appendChild(imageContainerElement);

    return pickElement;
}
const pickByPlayer = (pickedOption) => {
    state = {
        ...state,
        playerPick: pickedOption,
    }
}
const pickByAI = () => {
    const options = ["Rock", "Paper", "Scissors"];
    const AIPick = options [Math.floor(Math.random() * options.length)];
    state = {
        ...state,
        AIPick,
    }
}
const pick = (e) => {
    pickByPlayer(e.currentTarget.dataset.pick);
    //console.log(e.target);
    //console.log(state);
    pickByAI();
    hideOptions();
    showFight();
}
const reset = () => {
    const fightElement = document.querySelector(".fight")
    fightElement.classList.remove("slide-left");
    const optionsElement = document.querySelector(".options");
    optionsElement.classList.remove("slide-left");
}
const init = () => {
    renderScore();
    bindPickEvents();
}

init();