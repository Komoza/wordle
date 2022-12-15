import { words } from "./words.js";

const h1  = document.querySelectorAll('h1');
const h2  = document.querySelectorAll('h2');
let original_word = '';
function generateNewWord() {
    original_word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    // console.log(original_word)
}
generateNewWord();

const buttons = document.querySelectorAll('button');
const objLvl = document.getElementById('level');
const new_game = document.querySelectorAll('.new_game');
let current_word = '';
let current_try = 1;
let current_level = 1;

for (let i = 0; i < buttons.length; ++i) {
    buttons[i].addEventListener('click', function(event) {
        if (buttons[i].classList.contains('clear')){
            inpJump(document.activeElement, 'prev');
            current_word = current_word.slice(0, -1);
            document.activeElement.value = '';
            return;
        }
        if (current_word.length !=5 && buttons[i].innerText != 'ПРОВЕРИТЬ СЛОВО') {
            document.activeElement.value = buttons[i].innerText;
            current_word += buttons[i].innerText.toUpperCase(); 
            inpJump(document.activeElement, 'next');
        }
        if (buttons[i].innerText == 'ПРОВЕРИТЬ СЛОВО' && current_word.length === 5) {
            checkResult();
        } 
    })
}

objLvl.innerText = `Уровень ${current_level}`; 

function inpJump(el, course) {
    if (course === 'next' && el.value.length == 1 && document.activeElement.id != 'last_letter') {
        el.nextSibling.nextSibling.focus();
    }
    if (course === 'prev' && el.value.length == 0){
        if (document.activeElement.id == 'first_letter') return;
        el.previousElementSibling.focus(); 
    }
}
    
document.addEventListener('keydown', function drawLetter(event) {
    if (event.code == 'Backspace') {
        current_word = current_word.slice(0, -1);
        inpJump(document.activeElement, 'prev');
        return;
    }
    if (current_word.length !=5 && event.code != 'Enter' && event.key.search(/[А-яЁё]/) != -1) {
        current_word += event.key.toUpperCase(); 
        inpJump(document.activeElement, 'next');
    }
    if (event.code == 'Enter' && current_word.length === 5) {
        checkResult();
    }
  });

  document.addEventListener('keyup', function(event) {
    if (current_word.length !=5 && event.code != 'Enter' && event.code != 'Backspace' && event.key.search(/[А-яЁё]/) === -1) {
        document.activeElement.value = '';
    }
  });

function checkResult() {
    if (current_word.length < 5) {
        return;
    }
    if (words.includes(current_word.toUpperCase()) == false) {
        alert('Такого слова не существует');
        return;
    }
    const items = document.querySelectorAll(`.try_${current_try}`);
    let array_origWord = original_word.split('');
    let array_currWord = current_word.split('');
    for (let i = 0; i < 5; i++) {
        if (array_origWord[i] === array_currWord[i]) {
            setColor(items[i], 'right letter');
            setColorBtn(items[i].value, 'right letter')
            array_origWord[i] = i;
            array_currWord[i] = i + 5;
        }
    }
    for (let i = 0; i < 5; i++) {
        if(array_origWord.includes(array_currWord[i])) {
            setColor(items[i], 'wrong position');
            setColorBtn(items[i].value, 'wrong position')
            array_origWord[array_origWord.indexOf(array_currWord[i])] = i + 100;
        }else if(typeof array_currWord[i] != 'number') {
            setColor(items[i], 'wrong letter');
            setColorBtn(items[i].value, 'wrong letter')
        }
    }

    if (current_word === original_word) {
        current_level += 1;
        current_word = '';
        objLvl.innerText = `Уровень ${current_level}`; 
        current_try = 1;
        new_game[0].focus();
        cleanScreen();
        generateNewWord();
        return;
    }
    if (current_try != 6) {
        current_try += 1;
        document.activeElement.nextSibling.nextSibling.focus();
        current_word = '';
    }else {
        alert(`Было загадано ${original_word}\nВы дошли до ${current_level} уровня`);
        current_level = 1;
        current_word = '';
        objLvl.innerText = `Уровень ${current_level}`;
        current_try = 1;
        new_game[0].focus();
        cleanScreen();
        generateNewWord();
    }
    
}

function setColor(element, key) {
    if  (key === 'right letter') {
        element.classList.remove('wrong_position');
        element.classList.add('right_letter');
    } 
    if (key === 'wrong position') {
        element.classList.add('wrong_position');
    }
    if (key === 'wrong letter') {
        element.classList.add('wrong_letter');
    }
}
function setColorBtn(word, key) {
    for (let i = 0; i < buttons.length; ++i) {
        if (buttons[i].innerText === word.toUpperCase() && buttons[i].classList != 'right_letter') {
            setColor(buttons[i], key);
        }
    }
}
document.addEventListener('mouseup', function(event) {
    const current_cell = document.querySelectorAll(`.try_${current_try}`);
    for (let i = 0; i < 5; i++) {
        if (current_cell[i].value != '' && current_cell[i].id === 'last_letter') {
            current_cell[i].focus();
            return;
        }
        if (current_cell[i].value === '') {
           current_cell[i].focus();
           return; 
        }
    }
})

function cleanScreen(){
    for (let i = 1; i < 7; i++) {
        const items = document.querySelectorAll(`.try_${i}`);
            for(let j = 0; j < 5; j++) {
                items[j].classList.remove('right_letter');
                items[j].classList.remove('wrong_position');
                items[j].classList.remove('wrong_letter');
                items[j].value = '';
            }
    }
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].classList.remove('right_letter');
        buttons[i].classList.remove('wrong_position');
        buttons[i].classList.remove('wrong_letter');
    }
    
}

