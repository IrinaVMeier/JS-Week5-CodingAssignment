//Create a menu with options to enter/delete students and then to have the entered students divided 
//into study groups, three people each, drawing students from three different courses with one student per group 
//from each course.

//Create a class named Student with three properties: first name, last name, and
// course.
class Student {
    constructor(firstName, lastName, course) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.course = course;
    }
    describe() {
      return this.firstName + " " + this.lastName + " " + this.course;
    }
  }
  const student1 = new Student("Tom", "Smith", "RUSS101");
  const student2 = new Student("Elizabeth", "Jones", "RUSS201");
  const student3 = new Student("Sarah", "Green", "RUSS301");
  const student4 = new Student("James", "Brown", "RUSS101");
  const student5 = new Student("Victoria", "Williams", "RUSS201");
  console.log(student1.describe());
  console.log(student2.describe());
  console.log(student3.describe());
  console.log(student4.describe());
  console.log(student5.describe());

  //Create a class named StudyGroup with two properties: a group number
  // and an array that holds all the members in each group.
  class StudyGroup {
    constructor(number) {
      this.number = number;
      this.members = [];
    }
    addMember(member) {
      if (member instanceof Student) {
        this.members.push(member);
      } else {
        throw new Error(
          `You can only add an instance of Student. Argument is not a student: ${student}`
        );
      }
    }
    describe() {
      return `Study group ${this.number} has ${this.members.length} members.`;
    }
    courseExists(course) {
      // Checks whether a student from the same course already exists in the group
      for (let i in this.members) {
        if (this.members[i].course == course) {
          return 1;
        }
      }
      //a student from the same course was not found
      return 0;
    }
  }
  const studyGroup1 = new StudyGroup(1);
  console.log(studyGroup1.describe());
  class Menu {
    constructor() {
      this.studyGroups = [];
      // add an array for students without a group
      this.students = [];
    }
    start() {
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
        switch (selection) {
          case "1":
            this.enterStudent();
            break;
          case "2":
            this.createGroups();
            break;
          case "3":
            this.displayGroups();
            break; 
          case "4":
            this.deleteStudent();
            break;           
          default:
            selection = 0;
        }
        selection = this.showMainMenuOptions();
      }
      alert("Goodbye!");
    }
    showMainMenuOptions() {
      return prompt(`
          0) Exit the menu
          1) Add student
          2) Create study groups
          3) Display all study groups
          4) Delete student
          `);
    }
  //Add students with a condition that a student must be in one of the three
  //courses: RUSS101, RUSS201 or RUSS301
  enterStudent() {
      let firstName = prompt("Enter first name for a new student: ");
      let lastName = prompt("Enter last name for the new student: ");
      let course = prompt("Enter course for the new student: ");
      if (course.toUpperCase() != 'RUSS101' && course.toUpperCase() != 'RUSS201'
      && course.toUpperCase() != 'RUSS301') {
        alert('Wrong course number. Enter RUSS101, RUSS201 or RUSS301.');
      } else {
        this.students.push(new Student(firstName, lastName, course));
      }
    }
  // Divide all students into groups of 3, with one student from each course
  createGroups() {
      if (this.students.length == 0) {
        alert('No students added. Add a student.');
        return;
      }
      for (let i in this.students) {
        if (this.studyGroups.length == 0) {
          // if no groups are available, we create the first group and add 
          // the student there
          this.studyGroups.push(new StudyGroup(1));
          this.studyGroups[0].addMember(this.students[i]);
          console.log("added the first group and added one student");
        } else {
          let added = 0;
          // if groups already exist, we iterate through the existing groups to see 
          //if we can add the student there
          for (let j in this.studyGroups) {
            console.log(
              this.studyGroups[j].courseExists(this.students[i].course) +
                " " +
                this.studyGroups[j].members.length
            );
            if (
              this.studyGroups[j].courseExists(this.students[i].course) == 0 &&
              this.studyGroups[j].members.length < 3
            ) {
              // if there is no other student in the group from the same course 
              // and the group has less than 3 members, we add the student
              this.studyGroups[j].addMember(this.students[i]);
              // we take a note that the student was added
              added = 1;
              console.log(
                "The student was added to the existing group" +
                  j +
                  " " +
                  this.studyGroups[j].number +
                  " " +
                  this.students[i].describe()
              );
            }
          }
          // if the student wasn't added to any of the existing groups,
          // we create a new group
          if (added == 0) {
            this.studyGroups.push(new StudyGroup(this.studyGroups.length + 1));
            this.studyGroups[this.studyGroups.length - 1].addMember(
              this.students[i]
            );
            console.log("A new group was created");
          }
        }
      }
    }
  displayGroups() {
      if (this.studyGroups.length > 0) {
        let str = "";
        for (let i in this.studyGroups) {
          console.log(
            "Group " +
              this.studyGroups[i].number +
              " has " +
              this.studyGroups[i].members.length + " students: "
          );
          str =
            str +
            "Group " +
            this.studyGroups[i].number +
            " has " +
            this.studyGroups[i].members.length + " students:" + "\n";
          for (let j in this.studyGroups[i].members) {
            console.log(this.studyGroups[i].members[j].describe());
            str = str + " " + this.studyGroups[i].members[j].describe() + "\n";
          }
        }
        alert(str);
      } else {
        console.log('No groups created. Create a group.');
      }
  }
  deleteStudent() {
      let firstName = prompt("What is the first name of the student you want to delete?");
      let lastName = prompt("What is the last name of the student you want to delete?");
      let isDelete = 0;
      for (let i in this.studyGroups) {
        for (let j in this.studyGroups[i].members) {
          if (
            this.studyGroups[i].members[j].firstName.toUpperCase() ==
              firstName.toUpperCase() &&
            this.studyGroups[i].members[j].lastName.toUpperCase() ==
              lastName.toUpperCase()
          ) {
            this.studyGroups[i].members.splice(j, 1);
            isDelete = 1;
          }
        }
      }
      
      if (isDelete == 0) {
        alert('The student is not found.');
      } else {
        alert('The student is deleted.');
      }
    }
  }
  let menu = new Menu();
  menu.start();