const calculate = document.getElementsByClassName('calculate');
const areaCalculationDiv = document.getElementById('area-calculation');
let serial = 1;

// This function multiply two numbers and return them
function multiply(input1ValueToInt, input2ValueToInt) {
    return input1ValueToInt * input2ValueToInt;
}

// This function convert the centimeter to meter
function convertToMeter(area, serial) {
    let getIndex = areaCalculationDiv.lastChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
    let getIndexText = getIndex.innerText;
    let index = getIndexText.split(".")[0];

    // Change the innerText of paragraph if serial is matched to index
    if(Number(index) === Number(serial)) {
        let getCentimeter = getIndex.parentNode.nextSibling.nextSibling;
        let centimeter = area * 0.01;
        getCentimeter.innerHTML = `${centimeter.toFixed(2)}m<sup>2</sup>`;
    }
}

// This function adds the area and title to right sidebar
function areaCalculation(area, title) {
    const parentDiv = document.createElement('div');

    parentDiv.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <p>${serial}.</p>
                <p>${title}</p>
            </div>
            <p>${area}cm<sup>2</sup></p>
            <button class="text-white bg-[#1090D8] rounded-[4px] px-[10px] py-[7px]" onclick="convertToMeter(${area}, ${serial})">Convert to m<sup>2</sup></button>
        </div>
    `
    // Each time serial will increase by 1
    serial = serial + 1;

    areaCalculationDiv.appendChild(parentDiv);
}

// This loop iterate through all the calculate button
for (let cal of calculate) {
    // Getting the first input element
    const input1 = cal.previousSibling.previousSibling.firstChild.nextSibling.firstChild.nextSibling;
    // Getting the second input element
    const input2 = cal.previousSibling.previousSibling.lastChild.previousSibling.previousSibling.previousSibling.firstChild.nextSibling;

    // Click handler for each loop
    cal.addEventListener('click', function () {
        const title = cal.parentNode.firstChild.nextSibling.nextSibling.nextSibling;

        // Getting input fields value
        let input1Value = input1.value;
        let input2Value = input2.value;

        // Checking if input value is null
        let isEmptyInput1 = input1Value === "";
        let isEmptyInput2 = input2Value === "";

        if(isEmptyInput1 || isEmptyInput2) {
            alert("Please enter values...");
        } else {
            // Checking if input is string or not a number
            if (isNaN(input1Value) && isNaN(input2Value)) {
                alert('Enter numbers only');
            } else {
                // Converting input value to integer
                const input1ValueToInt = Number(input1Value);
                const input2ValueToInt = Number(input2Value);

                // Call the multiply() function for multiply 2 value
                let mul = multiply(input1ValueToInt, input2ValueToInt);

                // Calculation area depend on title
                // Formula will be applied depending on the title
                let area;
                if(title.innerText.toLowerCase() === "triangle") {
                    area = 0.5 * mul;
                } else if(title.innerText.toLowerCase() === "rectangle") {
                    area = mul;
                } else if(title.innerText.toLowerCase() === "parallelogram") {
                    area = mul;
                } else if(title.innerText.toLowerCase() === "rhombus") {
                    area = 0.5 * mul;
                } else if(title.innerText.toLowerCase() === "pentagon") {
                    area = 0.5 * mul;
                } else if(title.innerText.toLowerCase() === "ellipse") {
                    area = 3.1416 * mul;
                }

                // Add area and title to area calculation div
                areaCalculation(area.toFixed(2), title.innerText);
            }
        }

        // Clear the input field
        input1.value = "";
        input2.value = "";
    })
}
