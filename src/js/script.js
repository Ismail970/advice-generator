import "regenerator-runtime";

const diceBtn = document.querySelector(".dice-btn");
const qouteId = document.getElementById("id");
const qouteText = document.getElementById("quote");
const loader = document.querySelector(".loader");

const init = function (id = "", text = "") {
    loader.classList.toggle("hidden");
    qouteText.classList.toggle("to-text");
    qouteId.textContent = id;
    qouteText.textContent = text;
};

const getAdvice = async function () {
    try {
        init();
        const res = await fetch("https://api.adviceslip.com/advice");
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        const { id, advice } = data.slip;

        init(id, advice);
    } catch (err) {
        init("404", err.message);
        qouteText.classList.add("to-text");
    }
};

diceBtn.addEventListener("click", getAdvice);
window.addEventListener("load", getAdvice);