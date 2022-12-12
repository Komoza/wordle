const original_word = 'Смола'.toUpperCase();
let current_word = '';
let curret_try = 1;

function inpJump(el, course) {
    if (course === 'next' && el.value.length == 1 && document.activeElement.id != 'last_letter') {
        el.nextSibling.nextSibling.focus();
    }
    if (course === 'prev' && el.value.length == 0){
        if (document.activeElement.id == 'first_letter') return;
        el.previousElementSibling.focus(); 
    }
}
    
document.addEventListener('keydown', function(event) {
    if (event.code == 'Backspace') {
        current_word = current_word.slice(0, -1)
        inpJump(document.activeElement, 'prev');
        return;
    }
    if (current_word.length != 5) {
        current_word += document.activeElement.value.toUpperCase();
    }
    inpJump(document.activeElement, 'next');
    if (event.code == 'Enter') {
        checkResult();
    }
  });

function checkResult() {
    if (current_word.length < 5) {
        alert('Полностью введите слово');
        return;
    }
    const items = document.querySelectorAll(`.try_${curret_try}`);
    for (let i = 0; i < 5; i++) {
        if (original_word[i] === current_word[i]) {
            setColor(items[i], 'right letter')
        }else if(original_word.indexOf(current_word[i]) != -1) {
            setColor(items[i], 'wrong position');
        }else {
            setColor(items[i], 'wrong letter');
        }
    }
    
    if (current_word === original_word) {
        alert('ПОБЕДА!');
        return;
    }
    curret_try += 1;
    document.activeElement.nextSibling.nextSibling.focus();
    current_word = '';
    
}

function setColor(element, key) {
    if  (key === 'right letter') {
        element.classList.add('right_letter');
    } 
    if (key === 'wrong position') {
        element.classList.add('wrong_position');
    }
    if (key === 'wrong letter') {
        element.classList.add('wrong_letter');
    }
}

