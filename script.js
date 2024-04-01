const calculate = document.getElementsByClassName('calculate');
const areaCalculationDiv = document.getElementById('area-calculation');
let serial = 1;

// This function multiply two numbers and return them
function multiply(input1ValueToInt, input2ValueToInt) {
    return input1ValueToInt * input2ValueToInt;
}

// This function converts the centimeter to meter
function convertToMeter(button) {
    const getCentimeter = button.previousSibling.previousSibling;
    const getValue = getCentimeter.innerText.split('c')[0];
    const centimeterToMeter = parseFloat(getValue) * 0.01;
    getCentimeter.innerHTML = `${centimeterToMeter.toFixed(2)}m<sub>2</sub>`
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
            <button class="text-white bg-[#1090D8] rounded-[4px] px-[10px] py-[7px]" onclick="convertToMeter(this)">Convert to m<sup>2</sup></button>
        </div>
    `
    // Each time serial will increase by 1
    serial = serial + 1;

    areaCalculationDiv.appendChild(parentDiv);
}

function getValue(cal) {
    // Getting the first input element
    const input1 = cal.previousSibling.previousSibling.firstChild.nextSibling.firstChild.nextSibling;
    // Getting the second input element
    const input2 = cal.previousSibling.previousSibling.lastChild.previousSibling.previousSibling.previousSibling.firstChild.nextSibling;
    // Getting input fields value
    let input1Value = input1.value;
    let input2Value = input2.value;

    return [input1Value, input2Value];
}

// Calculation area depend on title
// Formula will be applied depending on the title
function calculateArea(title, input1ValueToInt, input2ValueToInt) {
    let mul = multiply(input1ValueToInt, input2ValueToInt);
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
    return area;
}

// This loop iterate through all the calculate button
for (let cal of calculate) {
    // Click handler for each loop
    cal.addEventListener('click', function () {
        let value = getValue(cal);
        const title = cal.parentNode.firstChild.nextSibling.nextSibling.nextSibling;

        // Checking if input value is null
        if(value[0] === "" || value[1] === "") {
            alert("Please enter values...");
        } else {
            // Checking if input is string or not a number
            if (isNaN(value[0]) && isNaN(value[1])) {
                alert('Enter numbers only');
            } else {
                // Converting input value to integer
                const input1ValueToInt = Number(value[0]);
                const input2ValueToInt = Number(value[1]);
                let area = calculateArea(title, input1ValueToInt, input2ValueToInt)
                // Add area and title to area calculation div
                areaCalculation(area.toFixed(2), title.innerText);
            }
        }
    })
}
