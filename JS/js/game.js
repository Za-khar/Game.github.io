let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 0; i < 100; i++) {
    let exel = document.createElement('div');
    field.appendChild(exel);
    exel.classList.add('exel');
}

let k = 0;
for (let y = 10; y > 0; y--) {
    for (let x = 1; x <= 10; x++){
        let exel = document.getElementsByClassName('exel');
        exel[k].setAttribute('posX', x);
        exel[k].setAttribute('posY', y);
        k++;
    }
}

function generateSnake() {
    let posX =  Math.round(Math.random() * (10 - 3) + 3);
    let posY =  Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}
   
let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

let mouse;

function createMouse() {
    function generateMouse() {
        let posX =  Math.round(Math.random() * (10 - 3) + 3);
        let posY =  Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    while(mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    }
    mouse.classList.add('mouse');
}

createMouse();

let direction = 'right';
let step = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`;

let score = 0;
input.value = `Your points: ${score}`;

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();


    if(direction == 'right'){
        if(snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left') {
        if(snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'up') {
        if(snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if (direction == 'down') {
        if(snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }
    }
   
    if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Your points: ${score}`;
    }

    if(snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`Game over. Your points: ${score}`);
        }, 200);
        clearInterval(interval);
    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    }

    step = true;

}

let interval = setInterval(move, 150);

window.addEventListener("keydown", function(e) {
    if (step == true){
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left'
            step = false;
        }
        else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            step = false;
        }
        else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            step = false;
        }
        else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            step = false;
        }
    }
});

