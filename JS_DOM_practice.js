document.body.insertAdjacentHTML('afterbegin', '<div class = \"wrapper\"></div>');
let parentalDiv = document.querySelector('.wrapper');

function childMaker(name) {
    parentalDiv.insertAdjacentHTML('beforeend', name);
}
childMaker('<div class = "first"></div>');
childMaker('<div class = "second"></div>');
childMaker('<div class = "third"></div>');



function wrapperAppear(a) {
    let i = a;
    let timerId = setInterval(function() {
        document.querySelector('.wrapper').style = 'width: 400px; height: 300px; background: pink; display: flex; flex-flow: row, wrap; justify-content: space-around;padding: 20px;'
        i++
        if (i == 10) { clearInterval(timerId), document.querySelector('.wrapper').style.backgroundColor = 'gray' }
    }, 1000)
}

wrapperAppear(1)

class Creator {
    constructor(width, height, background) {
        this.width = width,
            this.height = height,
            this.background = background
    }
    insertElement(elem) { document.querySelector(elem).style = `width: ${this.width +"px"}; height: ${this.height + "px"}; background: ${this.background}` }
}

setTimeout(function() {
    const square1 = new Creator(100, 100, 'yellow')
    square1.insertElement('.first')
}, 2000);

setTimeout(function() {
    const square2 = new Creator(100, 100, 'green')
    square2.insertElement('.second')
}, 3000);

class Round extends Creator {
    constructor(radius) {
        super(110, 110, "red");
        this.radius = radius;
    }
    insertElement(elem) { document.querySelector(elem).style = `width: ${this.width +"px"}; height: ${this.height + "px"}; background: ${this.background}; borderRadius: ${this.radius + 'px'}` }
}

setTimeout(function() {
    const round1 = new Round(70);
    round1.insertElement('.third')
    let roundElem = document.querySelector('.third');
    roundElem.style.borderRadius = '70px'
}, 4000)



document.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class = "fourth"></div');


setTimeout(function() {
    const quad = new Creator(350, 100, 'blue')
    quad.insertElement('.fourth')
    let div4 = document.querySelector('.fourth');
    div4.style.position = "absolute";
    div4.style.marginTop = '150px';
    div4.innerHTML = "<p style = 'font-size: 40px; text-align: center'>it works!</p>"
}, 5000)