// Display error message if box is not supplied by FlexBox
function getErrorMessage() {
    return "Box type not cannot be supplied by FlexBox";
};

// Display the range value below the slider
function getSliderValue(){
    let slider = document.getElementById("range");
    let output = document.getElementById("grade");
    output.innerHTML = slider.value;
    
    slider.oninput = function() {
      output.innerHTML = this.value;
    }
}
getSliderValue();


// Get Colour printing selection from radio dial; returns String
function getColourPrinting() {
    let colourPrinting = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    return colourPrinting;
}

// Get Reinforced bottom if the user selects the checkbox; return Boolean
function getReinforcedBottom() {
    let reinforcedBottom = document.querySelector('#bottom').checked; 
    return reinforcedBottom;
}

// Get Reinforced corners if the user selects the checkbox; return Boolean
function getReinforcedCorners() {
    let reinforcedCorners = document.querySelector('#corners').checked;
    return reinforcedCorners;
}

// Get Sealable tops if the user selects the checkbox; return Boolean
function getSealableTops() {
    let SealableTops = document.querySelector('#sealed').checked;
        return SealableTops;
    }

// Get Meter Squared from the size of the box selected by the user
function getMeterSquared() {
        let length = document.getElementById("length").value;
        let width = document.getElementById("width").value;
        let height = document.getElementById("height").value;
        let meterSq = parseFloat(length) * parseFloat(height) * parseFloat(width);
        console.log(length, width, height);
        return meterSq;
    }

// Get grade price of box from the range selected by the user
    function getGradePrice() {
        let grade = document.getElementById("range").value;
        const cost = [0.55, 0.65, 0.82, 0.98, 1.5];
        let gradePrice = 0;
        gradePrice = cost[grade - 1];
        return gradePrice;
    }
// Get percentage of extras added to box
    function getExtrasPercent() {

        let totalPercent = 0;
        if (getReinforcedBottom()) {
            totalPercent += 13;
        }
        if (getReinforcedCorners()) {
            totalPercent += 12;
        }
        if (getSealableTops()) {
            totalPercent += 10;
        }
        if (getColourPrinting() == "One Colour") {
            totalPercent += 12;

        }
        if (getColourPrinting() == "Two Colours") {
            totalPercent += 15;
        }
        return (totalPercent / 100);
      
    }
// Box Price after percentage addition and grade has been taken into account
    function setBoxPrice() {
       let boxPrice = getMeterSquared() * getGradePrice();
       let percentIncrease = boxPrice * getExtrasPercent();
       if(percentIncrease > 0){
          boxPrice += percentIncrease;
       }
        return boxPrice;
    }
// Quantity of boxes selected by user
    function getQuantity() {
        let quantity = document.getElementById("quantity"); // = number; quantity of boxes 1 to 200k
        let strQuantity = quantity.options[quantity.selectedIndex].text;

        return (strQuantity.match(/\d+/)[0]);
    }
// Get the Type of the box; return Error if not supplied by FlexBox
    function setBoxType() {
        let boxType = 0;
        let grade = document.getElementById("range").value;

        if (grade <3 && getColourPrinting() === "No Colour" && !getReinforcedBottom() && !getReinforcedCorners()) {
            boxType = 1;
        }
       
        else if (grade >= 2 && grade <= 4 && getColourPrinting() === "One Colour" && !getReinforcedBottom() && !getReinforcedCorners()) {
            boxType = 2;
        }
    
        else if (grade >= 2 && grade <=5 && getColourPrinting() === "Two Colours" && !getReinforcedBottom() && !getReinforcedCorners()) {
            boxType = 3;
        }
        
        else if (grade >= 2 && grade <=5 && getColourPrinting() === "Two Colours" && getReinforcedBottom() && !getReinforcedCorners()) {
            boxType = 4;
        }
        else if (grade >=3 && grade <=5 && getColourPrinting() === "Two Colours" && getReinforcedBottom() && getReinforcedCorners()) {
            boxType = 5;
        }

        else{
            return getErrorMessage();
        }
        return boxType;
    }

// Get quantity of boxes times it by box price and return total price
    function setQuantityTimesPrice() {
        let totalBoxPrice = getQuantity() * setBoxPrice();
        totalBoxPrice = Math.round((totalBoxPrice + Number.EPSILON) * 100) / 100;
        return totalBoxPrice.toFixed(2);
}   

// Adding Box Type, Quantity and Price to Shopping Basket
function addBoxToCart() {
    const table = document.getElementById("box-order");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let boxType = setBoxType();
    let quantity = getQuantity();
    let price = setQuantityTimesPrice();
    if(boxType != getErrorMessage()){
    cell1.textContent = boxType;
    cell2.textContent = quantity;
    cell3.textContent = "£" + price;
    }
    else 
    {
      alert(getErrorMessage());
    }
}
 

function getBasketPrice() {
    let getTotalPrice = document.getElementById("total-price").textContent;  
    let getBoxPrice = setQuantityTimesPrice();
    let stripGetTotalPrice = getTotalPrice;
    if(getTotalPrice.length >1){
    stripGetTotalPrice = getTotalPrice.substring(1);
    }   

    let parseTotalPrice = parseFloat(stripGetTotalPrice, 10);
    let parseBoxPrice = parseFloat(getBoxPrice, 10);

    parseTotalPrice += parseBoxPrice;
    return parseTotalPrice;
}

function updateBasketPrice() {
    let basketPrice = getBasketPrice();
    let decimalBasketPrice = Math.round((basketPrice + Number.EPSILON) * 100) / 100;
    let stringBasketPrice = String(decimalBasketPrice.toFixed(2));
    document.getElementById("total-price").textContent = "£" + stringBasketPrice;
}


    // Reset the page button on click
function resetPage(){
    document.getElementById("length").value = "";
    document.getElementById("width").value = "";
    document.getElementById("height").value = "";
    document.getElementById("range").value = 1;
    document.getElementById("corners").checked = false;
    document.getElementById("bottom").checked = false;
    document.getElementById("sealed").checked = false;
    document.getElementById("quantity").selectedIndex = 0;
    window.scrollTo(0,0);
// Reset Radio Button for Colour Printing
    let ele = document.getElementsByName("flexRadioDefault");
  for(let i=1;i<ele.length;i++)
    {
     ele[i].checked = false;
     ele[0].checked = true;
    }
   }

   document.getElementById("btn").onclick = function ()
    {
        addBoxToCart();
        updateBasketPrice();
        resetPage();
        getSliderValue();
    }