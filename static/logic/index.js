const helloP = document.querySelector("#hello");
const delay = ms => new Promise(res => setTimeout(res, ms));

let greet_message = "Thank you for visiting my portfolio";

const Greet = async () => {
    for (let i = 0; i < greet_message.length; i++){
        await delay(50);
        helloP.innerHTML += greet_message[i];
    }
};

Greet();