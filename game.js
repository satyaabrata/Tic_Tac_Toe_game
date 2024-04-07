let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcon = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let turn_O = true;

const win_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const boxesArray = Array.from(boxes);

boxesArray.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_O) {
            box.innerText = "O";
            turn_O = false;
        } else {
            box.innerText = "X";
            turn_O = true;
        }
        box.disabled = true;

        checkwinner();
    });
});

const checkwinner = () => {
    let isTie = true;
    for (let pattern of win_patterns) {
        let pos1Val = boxesArray[pattern[0]].innerText;
        let pos2Val = boxesArray[pattern[1]].innerText;
        let pos3Val = boxesArray[pattern[2]].innerText;

        if (pos1Val === pos2Val && pos2Val === pos3Val && pos1Val !== "") {
            console.log("Winner", pos1Val);
            showwinner(pos1Val);
            return;
        }
    }

    for (let box of boxesArray) {
        if (box.innerText === "") {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        showtie();
    }
};

const disabledBoxes = () => {
    for (let box of boxesArray) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxesArray) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showwinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msgcon.classList.remove("hide");
    disabledBoxes();
};

const showtie = () => {
    msg.innerText = 'Tie';
    msgcon.classList.remove('hide');
    disabledBoxes();
};

const resetgame = () => {
    turn_O = true;
    enabledBoxes();
    msgcon.classList.add("hide");
};

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
