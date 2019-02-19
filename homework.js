// -------------------------- Home work-16 --------------------------
// -------------------------- Dashevska Olga --------------------------

//1. Есть класс Planet
// function Planet(name) {
//     this.name = name;
//     this.getName = function () {
//         return 'Planet name is ' + this.name;
//     }
// }
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет
// принимать, кроме name, название спутника (satelliteName). Переопределите метод
// getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку +
// дополнительный текст 'The satellite is' + satelliteName.
// Например:
// var earth = new PlanetWithSatellite('earth', 'moon');
// earth.getName(); // 'Planet name is earth. The satellite is moon’

/**
 * @description - класс Planet 
 * @param {string} name - имя планеты
 */

function Planet (name) {
    this.name = name;
}

Planet.prototype.getName = function () {
    return 'Planet name is ' + this.name;
}

/**
 * @description - класс PlanetWithSatellite наследник класса Planet
 * @param {string} name - имя планеты
 * @param {string} satelliteName - имя спутника
 */
function PlanetWithSatellite(name, satelliteName) {
    Planet.call(this, name); 
    this.getName = function () { return Planet.prototype.getName.call(this) + '. ' + 'The satellite is ' + satelliteName; }
}

PlanetWithSatellite.prototype = Object.create(Planet.prototype);
PlanetWithSatellite.prototype.constructor = PlanetWithSatellite;

let earth = new PlanetWithSatellite('earth', 'moon');
console.log(earth.getName());

// 2. Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод “получить количество этажей” 
//и метод “установить количество этажей”).
// Создайте наследников этого класса: классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование 

// У жилого дома появится свойство “количество квартир на этаже”, а метод “получить количество этажей” должен вернуть 
//объект вида {этажи: 5, всегоКвартир: 5 * количествоКвартир}

// У торгового центра появится свойство “количество магазинов на этаже”, а метод “получить количество этажей” должен вернуть
//объект вида {этажи: 3, всегоМагазинов: 3 * количествоМагазинов}
// От каждого класса создать экземпляр (дом, торговый центр)

/**
 * @description - класс Building
 * @param {string} name - имя дома
 * @param {number} floors - количество этажей
 */
function Building (name, floors) {
    this.name = name; 
    this.floors = floors; 

    this.setFloors = function (floors) { this.floors = floors; }; 
    this.getFloors = function () { return this.floors; }; 
}

/**
 * @description - класс House наследник класса Building
 * @param {string} name - имя дома
 * @param {number} floors -  количество этажей
 * @param {number} flatsOnFloor - количество квартир на этаже
 */
function House (name, floors, flatOnFloor) {
    Building.apply(this, arguments); 

    this.flatOnFloor = flatOnFloor; 
    this.getFloors = {
        floors: this.getFloors(),
        totalFlat: this.floors * this.flatOnFloor
    };
}

/**
 * @description - класс ShoppingCenter наследник класса Building
 * @param {string} name - имя дома
 * @param {number} floors - количество этажей
 * @param {number} shops - количество магазинов
 */
function ShoppingCenter (name, floors, shops) {
    Building.apply(this, arguments); 
    this.shops = shops; 

    this.getFloors = {
        floors:  this.getFloors(),
        totalShop: this.floors * this.shops
    }
}

const house = new House('tower', 5, 5); 
const shop = new ShoppingCenter('shop', 3, 3); 

console.log(house.getFloors);
console.log(shop.getFloors);

//3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию” 
//(метод должен вывести имя и цену). Метод должен быть объявлен с помощью прототипов (Func.prototype...). 
//Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”. 
//Придумайте им по одному свойству, которые будут характерны только для этих экземпляров 
//(например, для офисной мебели - наличие компьютерного стола или шредера). 
//Метод “получить информацию” должен учитывать и добавленное вами новое свойство.
//Задача на переопределение метода у экземпляров класса.


 /**
 * @description - родительский класс Furniture
 * @param {string} name - наименование мебели
 * @param {number} price - стоимость мебели
 */

function Furniture(name, price) {
    this.name = name; 
    this.price = price;
}

Furniture.prototype.getInfo = function () {
    return {
        name: this.name,
        price: this.price
    };
}

/**
 * @desc - класс OfficeFurniture наследник класса Furniture
 * @param {string} name - имя мебели для офиса
 * @param {number} price - цена мебели для офиса
 * @param {boolean} hasCompTable - имеет стол для компьютера или нет
 */
function OfficeFurniture(name, price, hasDeskForComp) {
    Furniture.apply(this, arguments);

    this.hasDeskForComp = hasDeskForComp;
}

OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.constructor = OfficeFurniture;

OfficeFurniture.prototype.getInfo = function () { 
    let info = Furniture.prototype.getInfo.call(this);
    info.hasDeskForComp = this.hasDeskForComp;
    return info;
}

/**
 * @desc - класс HomeFurniture наследник класса Furniture
 * @param {string} name - имя мебели для дома
 * @param {number} price - цена мебели для дома
 * @param {boolean} hasSofa - имеет диван или нет
 */
function HomeFurniture(name, price, hasSofa) {
    Furniture.apply(this, arguments);

    this.hasSofa = hasSofa;
}

HomeFurniture.prototype = Object.create(Furniture.prototype);
HomeFurniture.prototype.constructor = HomeFurniture;

HomeFurniture.prototype.getInfo = function () {
    let info = Furniture.prototype.getInfo.call(this);
    info.hasSofa = this.hasSofa;
    return info;
}

let officeFurniture = new OfficeFurniture('office furniture ', 2900, true);
let homeFurniture = new HomeFurniture('home furniture', 2000, true);

console.log(officeFurniture.getInfo());
console.log(homeFurniture.getInfo());


//4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом “получить информацию”
//(метод должен вывести имя и дату регистрации). 
//Метод должен быть объявлен с помощью прототипов (Func.prototype...)

//Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”.

//У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть true/false, должно быть скрытым).
//Свойства определяются в момент вызова конструктора.

//У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату 
//(например, одну неделю от момента регистрации).

//У классов-наследников метод “получить информацию” должен так же содержать информацию о дополнительных свойствах
//(“суперАдмин” и “срокДействия”)

/**
 * @description - родительский класс User
 * @param {string} name - имя пользователя 
 * @param {data} dateReg - дата регистрации
 */
class User {
    constructor (name, dateReg) {
        this.name = name;
        this.dateReg = dateReg;
    }
}

User.prototype.getInfo = function() { return this.name + ' ' + this.dateReg };

/**
 * @description - класс Admin наследник класса User
 * @param {string} name - имя пользователя 
 * @param {data} dateReg - дата регистрации
 * @param {} superAdmin 
 */

const hiddenSuperAdmin = Symbol();

class Admin extends User {
    constructor (name, dateReg, superAdmin) {
        super (name, dateReg);
        this[hiddenSuperAdmin] = superAdmin;
    }
    getInfo() { return super.getInfo() + (this[hiddenSuperAdmin] ? ' is super admin' : '') }
}

/**
 * @description - класс Guest наследник класса User.
 * @param {string} name - имя пользователя 
 * @param {data} dateReg - дата регистрации в формате 'Dec 25, 1995'
 */
class Guest extends User {
    constructor (name, dateReg) {
        super (name, dateReg);
        // + 1 year
        this.validDate = new Date(dateReg);
        this.validDate.setFullYear(this.validDate.getFullYear() + 1);
    }
    getInfo() { return super.getInfo() + ' ' + this.validDate.toDateString(); }
}

const admin = new Admin ('Olya', '14.08.2014', true);
const guest = new Guest ('Vasya', 'Dec 25, 1995');

console.log(admin.getInfo());
console.log(guest.getInfo());

