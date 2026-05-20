const BASE_URL = "https://open.er-api.com/v6/latest";


const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }


    const URL = `${BASE_URL}/${fromCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.rates[toCurr.value];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


for(let select of dropdowns){ //for of loop is used to iterate over the dropdowns
    for(let currCode in countryList){ 
        let newOption = document.createElement("option"); 
        newOption.innerText = `${countryList[currCode].countryName} (${currCode})`;
        newOption.value = currCode; 
        if(select.name === "from" && currCode === "USD"){ //if the name of the select is "from" and the current code is "USD", then the option will be selected by default
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});
}


const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode].countryCode;
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc ;
}

const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

btn.addEventListener("click", (evt) => {
    evt.preventDefault();

    console.log("button clicked");

    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});