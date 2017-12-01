class Users {
    constructor(){
        this.users= [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
       // var user = this.users.filter((user) => user.id === id)[0]
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(room){
        var users = this.users.filter((user) => user.room === room);            //ES6 syntax-- instead of return stmt
        var nameArray = users.map((user) => user.name);

        return nameArray;
    }
}

module.exports = {Users};


// ----- Example -----
// class Person {
//     constructor(name, age){
//         //console.log(name, age); instead we use this keyword
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old `;
//     }
// }


// //create instance on class
// var me = new Person('Arjun', 24);
// var description = me.getUserDescription();
// console.log(description);