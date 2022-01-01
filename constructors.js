//создаем функцию-конструктор, которая образует каркас из неизменных (опционально) свойств объекта и изменяемых, которые задаем как параметры. ВАЖНО! название функций-конструкторов всегда обозначается с большой буквы. Методом this задаем будущие свойства как параметры функции.
// в конструктор в качестве св-ва можно указать другую функцию

function Rock(location, band, members, status, hit) {
    this.genre = 'grunge',
        this.location = location,
        this.bandname = band,
        this.members = members,
        this.status = status,
        this.hit = function() { console.log(`${hit} is the most popular song by ${band}`) }
}
// создаем объекты через ключевое слово new и задаем будущие значения св-в через аргументы конструктора
/*
const aic = new Rock('seattle', 'alice in chains',4,'active', 'would?')
const soundgarden = new Rock('seattle','soundgarden',4,'quit', 'black hole sun')
const nirvana = new Rock('aberdin','nirvana', 3, 'quit', 'lithium')
const pj = new Rock('seattle','pearl jam', 5, 'active', 'even flow')
    
//console.log(aic, soundgarden, nirvana, pj)
    
//вызываем функции-свойства
pj.hit()
aic['hit']()
soundgarden.hit()
nirvana.hit()
*/


// создам еще 1 конструктор
function Dubstep(producer, location) {
    this.producer = producer,
        this.location = location,
        this.favTrack = function(track) { console.log(`my fav track by ${producer} is ${track}`) }
}
//создаем еще объект из конструктора
let kwizma = new Dubstep('kwizma', 'netherlands')
    //console.log(kwizma)
    //проверим работу метода favTrack, вызывая его
kwizma.favTrack('t-rex')

//ниже показан ВЫНОС метода за пределы конструктора с помощью ключевого слова prototype. Этот метод может добавлть в объекты, построенные конструктором  св-ва. Например в kwizma я добавлю жанр. Можно, конечно, было бы каждый раз создавать св-во объекта и через метод св-ва в конструкторе, как это сделано с favTrack, но это каждый раз записывается в память. Эффективнее это делать через метод прототипа ниже
Dubstep.prototype.getGenre = function(genre) { return this.genre = `${genre}` }
kwizma.getGenre('dubstep')
    //проверяем
console.log(kwizma)
    //убедимся в универсальности метода-прототипа, создав переменную check и вызвав тот же метот, но с другим жанром.
    //let check = kwizma
    //check.getGenre('dub')
    //console.log(check)

let widdler = new Dubstep('widdler', 'US Ca')
widdler.favTrack('bad mon')
widdler.getGenre('dub')

// создадим метод объекту widdler
widdler.firstMet = function(set) { console.log(`i first time listened to ${this.producer} in Number ${set} DDD session`) }
    //проверим работу метода. Вызываем - работает
widdler.firstMet(1)
    //с помощью метода bind применим метод к объекту kwizma, в котором, заметь! его вообще не было
console.log(widdler.firstMet.bind(kwizma)(21))