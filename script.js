const calculateButton = document.getElementsByClassName('calculate');
let serial = 1;

// This function multiply two numbers and return them
function multiply(input1ValueToInt, input2ValueToInt) {
    return input1ValueToInt * input2ValueToInt;
}

// This function converts the centimeter to meter
function convertToMeter(button) {
    const getAreaValue = button.parentElement.querySelector('.area-value');
    const centimeterToMeter = parseFloat(getAreaValue.innerText.split('c')[0]) * 0.01;
    getAreaValue.innerHTML = `${centimeterToMeter.toFixed(2)}m<sup>2</sup>`
}

// This function adds the area and title to right sidebar
function areaCalculation(area, title) {
    const areaCalculationDiv = document.getElementById('area-calculation');
    const parentDiv = document.createElement('div');

    parentDiv.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <p>${serial}.</p>
                <p>${title}</p>
            </div>
            <p class="area-value">${area}cm<sup>2</sup></p>
            <button class="text-white bg-[#1090D8] rounded-[4px] px-[10px] py-[7px]" onclick="convertToMeter(this)">Convert to m<sup>2</sup></button>
        </div>
    `
    // Each time serial will increase by 1
    serial = serial + 1;

    areaCalculationDiv.appendChild(parentDiv);
}

// This function gets the input value
function getValue(getInputElement) {
    let input1 = parseFloat( getInputElement[0].value);
    let input2 = parseFloat(getInputElement[1].value);
    return [input1, input2];
}

// This function calculate the area according to formula
function calculateArea(title, input1ValueToInt, input2ValueToInt) {
    let mul = multiply(input1ValueToInt, input2ValueToInt);
    let area;
    if (title.toLowerCase() === "triangle") {
        area = 0.5 * mul;
    } else if (title.toLowerCase() === "rectangle") {
        area = mul;
    } else if (title.toLowerCase() === "parallelogram") {
        area = mul;
    } else if (title.toLowerCase() === "rhombus") {
        area = 0.5 * mul;
    } else if (title.toLowerCase() === "pentagon") {
        area = 0.5 * mul;
    } else if (title.toLowerCase() === "ellipse") {
        area = 3.1416 * mul;
    }
    return area;
}

// This loop iterate through all the calculate button
for (let button of calculateButton) {
    button.addEventListener('click', function () {
        const getInputElement = this.parentElement.querySelectorAll('input');
        const title = this.parentElement.querySelector('h3').innerText;
        const [value1, value2] = getValue(getInputElement);

        // Checking if input value is null or string
        if (isNaN(value1) || isNaN(value2)) {
            alert('Please enter numbers...');
        } else {
            let area = calculateArea(title, value1, value2);
            areaCalculation(area.toFixed(2), title);
        }
        getInputElement[0].value = '';
        getInputElement[1].value = '';
    })
}
