#!/usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.counter++;
        this.courses = [];
        this.balance = 10000;
    }
    enrollStudent(Course) {
        this.courses.push(Course);
        console.log(`Course have been Added`);
    }
    viewBalance() {
        console.log(`Your Balance: ${this.balance} `);
    }
    payTutionFee(num) {
        this.balance -= num;
        console.log(` Your tution fee have been paid and your total ammount is now ${this.balance}`);
    }
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`student ID: ${this.id}`);
        console.log(`student Course: ${this.courses}`);
        console.log(`Student :`);
    }
}
class StudentManager {
    Students;
    constructor() {
        this.Students = [];
    }
    findStudent(studentID) {
        return this.Students.find(student => student.id == studentID);
    }
    addStudent(name) {
        const student = new Student(name);
        this.Students.push(student);
        console.log(`The student ${student.name} have been added and his Id is ${student.id}`);
    }
    enrollStudent(studentId, Course) {
        const student = this.findStudent(studentId);
        if (student) {
            student.enrollStudent(Course);
            console.log(`The student ${student.name} have been added to the course and his nsme is ${student.name} And his Id is ${student.id}`);
        }
        else {
            console.log(`Cannot find the User`);
        }
    }
    viewBalance(StudentID) {
        const student = this.findStudent(StudentID);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(`Cannot find the User`);
        }
    }
    payTutionfee(studentID, ammount) {
        const student = this.findStudent(studentID);
        if (student) {
            student.payTutionFee(ammount);
        }
        else {
            console.log(`cannnot find the Student`);
        }
    }
    showStatus(StudentID) {
        const student = this.findStudent(StudentID);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(`cannot find the User`);
        }
    }
}
async function main() {
    const management = new StudentManager();
    console.log(`Welcome to Muneeb Ahmed University management System`);
    while (true) {
        let user_option = await inquirer.prompt([
            {
                name: "option",
                message: "plase select any option from below",
                type: "list",
                choices: ['add Student', `Enrolll Student`, `view Balance`, `Pay Tution fee`, `show Status`, `exit`],
            }
        ]);
        switch (user_option.option) {
            case `exit`:
                return false;
                break;
            case `add Student`:
                let newStudent = await inquirer.prompt([
                    {
                        name: "studentname",
                        type: "input",
                        message: "Please enter the name of student",
                    }
                ]);
                management.addStudent(newStudent.studentname);
                break;
            case `Enrolll Student`:
                let enroll = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "input",
                        message: "Please enter the ID of student",
                    },
                    {
                        name: "studentCourse",
                        type: "input",
                        message: "Please enter the Course of student",
                    }
                ]);
                management.enrollStudent(enroll.studentID, enroll.studentCourse);
                break;
            case `view Balance`:
                let StudentBalance = await inquirer.prompt([
                    {
                        name: "ID",
                        message: "PLease Enter the ID",
                        type: "input",
                    }
                ]);
                management.viewBalance(StudentBalance.ID);
                break;
            case `Pay Tution fee`:
                let payfee = await inquirer.prompt([
                    {
                        name: "id",
                        message: "Please Enter the Id of Student",
                        type: "input",
                    },
                    {
                        name: "ammount",
                        type: "input",
                        message: "Now please Enter the ammount of fees"
                    }
                ]);
                management.payTutionfee(payfee.id, payfee.ammount);
                break;
            case `show Status`:
                let status = await inquirer.prompt([
                    {
                        name: "ID",
                        message: "Please Enter the Id of Student",
                        type: "input",
                    }
                ]);
                management.showStatus(status.ID);
                break;
        }
    }
}
main();
