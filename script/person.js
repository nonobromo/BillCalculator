class Person {
    static currentId = 1;

    constructor(fName, ammount, tip) {
        if (typeof fName !== "string" || fName.length < 2) {
            throw new Error("Persons name must be at least two characters");
        }

        if (typeof ammount !== "number" || ammount <= 0) {
            throw new Error("Please Enter a Valid Number");
        }

        this.fName = fName;
        this.ammount = ammount;
        this.id = Person.currentId++;
        this.tip = tip
    }
}

class PersonManger {
    #persons = [];
    #ammount = 0;
    #tip = 0;

    getPersons() {
        return [...this.#persons];
    }

    getPerson(id) {
        const found = this.#persons.find((person) => person.id === id);

        if (!found) {
            throw new Error("No person found");
        }
        return found;
    }

    addPerson(text, ammount) {
        if (typeof text !== "string" || typeof ammount !== "number" || text.length < 2){
            throw new Error ("Invalid ammount or name length")
        }

        const newPerson = new Person(text, ammount, this.calculateTip(ammount));

        this.#persons = [...this.#persons, newPerson];
        return newPerson;
    }

    calculateTotal(){
        this.#ammount = 0;
        this.#persons.forEach((p) =>{
            this.#ammount += p.ammount;
        })
        return this.#ammount
    }

    calculateTip(ammount){
        this.#tip = 0;
        this.#tip = Math.round(ammount / 100 * 10)
        return this.#tip;
    }

    removePerson(id) {
        const removedPerson = this.getPerson(id);

        this.#persons = this.#persons.filter((person) => person.id !== id);
        this.calculateTotal()
        return removedPerson;
    }

    clearPersons() {
        this.#persons = [];
    }
}


export {PersonManger}