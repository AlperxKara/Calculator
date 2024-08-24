const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

// Ekranı güncelleyen fonksiyon
function updateDisplay() {
    display.value = displayValue;
}

// Hesaplama fonksiyonu
function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    } else if(operator === '-'){
        return first - second;
    } else if(operator === '*'){
        return first * second;
    } else if(operator === '/'){
        return first / second;
    }

    return second;
}

// Butonlara tıklama olayını dinleyen fonksiyon
keys.addEventListener('click', function(e) {
    const element = e.target;

    // Eğer tıklanan şey bir buton değilse geri dön
    if (!element.matches('button')) return;

    const value = element.value; // Doğru kullanım: element.value

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);
    }

    updateDisplay(); // Ekranı güncelle
});

// Operatör işlemlerini yöneten fonksiyon
function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Sayı girişini yöneten fonksiyon
function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num; // Eğer ikinci değer bekleniyorsa ekranı numara ile değiştir
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Ondalık sayı girişini yöneten fonksiyon
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.'; // Ekranda nokta yoksa ekle
    }
}

// Temizleme fonksiyonu
function clear() {
    displayValue = '0'; // Ekranı sıfırla
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}
