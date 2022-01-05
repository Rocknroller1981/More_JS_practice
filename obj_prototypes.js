//Этот объект будет прототипом
const rock = {
    subgenre: 'grunge'
}
rock.genre = "alternative" // добавим еще свойство

//создаем обычный объект и через Object.create(ПРОТОТИП) берем оттуда св-ва genre и subgenre. Дополняем объект собственными свойствами в т.ч. в виде св-в могут быть еще объекты и функции как в примере ниже
let band = Object.create(rock);
band['location'] = 'Seattle WA';
band.bandname = 'Pearl Jam'
band.members = { vocalist: 'eddie vedder' }
band.members.guitar = 'mike mccready' //в т.ч. так можно добавить св-во во внутренний объект members
    //добавим метод (функция, которая работает со св-м объекта), которая возвращает, например, имя вокалиста, используюя ключевое слово this, которое указывает на конкретный контекст вызова функции. Если не детализировать какое именно св-во, а просто указать this, то вернет весь объект целиком.
band.getBand = function() { return (`the name of the ${this.bandname} vocalist is ${this.members.vocalist}`) }
band.favSong = function(song) { console.log(`my fav song by ${this.bandname} is '${song}'`) }
    //console.log(band)
band.favSong('even flow')

//вызываем функцию. Конкретно в этом случае вернув значение в новую переменную и выводим ее в консоль. В принципе, можно было бы не создавать переменную, а сразу выводить в консоль. 
let check = band.getBand();
console.log(check)

//проверем наличие свойства в объекте true or false
//console.log('members' in band)

//переберем объект band и убедимся, что в свойствах видно и св-ва прототипа
//for (let key in band){console.log(key)}

//а вот метод для проверки есть ли у искомого объекта прототип
//console.log(Object.getPrototypeOf(band))

//теперь выясним есть ли у объекта собственные свойста
/*
for (let key in band){
if (band.hasOwnProperty(key)){console.log(key)}
}
*/

// создадим еще объект, заменим в нем членов банды, и вызовем метод getBand. Кстати, прототипом этого объекта стал объект band
let band2 = Object.create(band);
band2.location = 'San Diego CA';
band2.bandname = 'Stone Temple Pilots'
band2.members.vocalist = 'scott weiland'
band2.members.guitar = 'dean deleo'
    //console.log(band2)
    //console.log(band2.getBand())

//for (let key in band2){console.log(band2[key])}


// ниже пример отработки метода bind. суть его в том, чтобы в любом последующем объекте ПРИВЯЗАТЬ созданный в объекте -прототипе метод и применить его на стороннем объекте, не создавая каждый раз заново
console.log(band.favSong.bind(band2)('plush'))
console.log(band.getBand.bind(band2)())
    // ниже вариант отработки метода call
console.log(band.favSong.call(band2, 'plush'))
console.log(band.getBand.call(band2))
    // и метода apply
console.log(band.favSong.apply(band2, ['plush']))
    // можно и через переменную на примере call
let final = band.getBand.call(band2)
console.log(final)

function Electro(band, location, found) {
    this.genre = 'electronic'
    this.origins = 'disco'
    this.subgenre = 'bigbeat'
    this.band = band
    this.location = location
    this.found = found
}

const chemical = new Electro('the chemical brothers', 'UK', 1992)
chemical.getTrack = function(track) { console.log(`my favourite track by ${this.band} is ${track}`) }
console.log(chemical)
chemical.getTrack('got glint?')


const prodigy = new Electro('the prodigy', 'UK', 1991)

chemical.getTrack.bind(prodigy)('poison')
Electro.prototype.lastListen = function(year) { console.log(`i listened ${this.band} last time in ${year}`) }
chemical.lastListen(2021)
prodigy.lastListen(2020)

//ниже работаем с прототипным наследованием и полиморфизмом. Создаем дочерний конструктор TripHop со своими свойствами

function TripHop(band, hit) {
    this.band = band
    this.hit = hit
}

//затем создадим делигирующую связь между функциями-конструкторами 
TripHop.prototype = new Electro()
    // создаем объект
const massive = new TripHop('massive attack', 'angel')
    //console.log(massive)
    // т.к. связь установлена, то работают методы первого конструктора Electro
chemical.getTrack.bind(massive)('angel')
    //и вынесенный метод тожде, при этом мы изменили исполняемый код (другой текст выводится в консоль)
TripHop.prototype.lastListen = function(year) { console.log(`i listened TO ${this.band} last time in ${year} quite a time, innit?`) }
massive.lastListen(2018)

function Devices(type, item, current, power) {
    this.type = type
    this.item = item
    this.current = current
    this.power = power
}

const tv = new Devices('electric', 'TV', 220, 400)
tv.location = 'livingroom'
tv.screen = '50 inches'
tv.plugIn = function() { console.log(`now your ${this.item} is plugged in and can be used`) }


const dvd = new Devices('electric', 'DVD', 220, 150)
dvd.location = "bedroom"
dvd.color = "gray"
dvd.insertDisc = function(film) { return `let's watch ${film}`, console.log(`let's watch ${film} by Guy Ritchie`) }


Devices.prototype.currentStrength = function() { console.log(`your ${this.item} consumes amperage of ${(this.power / this.current).toFixed(2)} amps`) }


function Laptop(brand, os) {
    this.brand = brand
    this.os = os
}
Laptop.prototype = new Devices('electric', 'laptop', 20, 60)
const laptop = new Laptop('honor', 'windows11')
laptop.getCharged = function(charge) { console.log(`the battery of your ${this.item} has a charge of ${charge}%`) }


Laptop.prototype.currentStrength = function() { console.log(`your ${this.item} consumes amperage of ${(this.power / this.current).toFixed(2)} amps. This ain't that much. isn't it?`) }

//изучаем электроприборы
console.log(tv)
console.log(dvd)
console.log(laptop)

//включаем в розетку телек и двд
tv.plugIn()
tv.plugIn.bind(dvd)()

//проверяем зарядку ноутбука
laptop.getCharged(70)

//включаем фильм на двд
dvd.insertDisc('Snatch')

//считаем потребляемую силу тока телека и двд
tv.currentStrength()
dvd.currentStrength()
laptop.currentStrength()