class Course {
    #price = null;

    constructor(title, length, price) {
        this.title = title;
        this.length = length;
        this.#price = price;
    }

    lengthPriceRatio() {
        return this.#price / this.length;
    }

    summary() {
        return `The course ${this.title} is ${this.length} month long and it costs ${this.price}`;
    }

    set price(value) {
        if (value > 4) {
            this.#price = value;
        } else {
            throw "Price cannot be lower than €4";
        }
    }

    get price() {
        return `€${this.#price}`;
    }
}

class PracticalCourse extends Course {
    constructor(title, length, price, numExercises){
        super(title, length, price);
        this.numExercises = numExercises;
    }
}

class TheoreticalCourse extends Course {
    constructor(title, length, price){
        super(title, length, price);
    }

    publish() {
        return `The course ${this.title} is published by NoWhereFound Press © 2022`;
    }
}

const course1 = new Course("Title1", 6, 199.00);
const course2 = new Course("Title2", 9, 299.00);
const course3 = new PracticalCourse("Title3", 9, 299.00, 20);
const course4 = new TheoreticalCourse("Title4", 5, 99.00);

console.table(course1);
console.table(course2);
console.table(course3);
console.table(course4);

course1.price = 129.00;
console.log(course4.publish());

console.log(course3.summary());
console.log(course4.summary());