const original_word = 'Смола'.toUpperCase();
let current_word = '';

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
    if (current_word === original_word) {
        alert('ПОБЕДА!');
    }
}