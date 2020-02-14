//Nguyễn Vũ

var storage = require("node-persist");

storage.initSync({
	dir : "listStudents",
	ttl : false
});

//functions sử lý học sinh

var students = {
	name : "",
	id : ""
};

function getAllStudents() {
	var students=storage.getItemSync('students' );

	if(typeof students==="undefined"){
		return [];
	}

	return students;
}


function getStudent(studentId){
	var students=getAllStudents();

	for (var i = 0; i < students.length; i++) {
		if(students[i].id===studentId){
			return students[i];
			break;
		}
	}
}


function addStudent(studentName,studentId){
	var students = getAllStudents();
	students.push({
		name : studentName,
		id : studentId
	});

	storage.setItemSync("students",students);
}


function removeStudent(studentId){
	var students = getAllStudents();

	for (var i = 0; i < students.length; i++) {
		if(students[i].id===studentId){
			students.splice(i,1);
		}
	}

	storage.setItemSync("students",students);
}

function editStudent(studentName,studentId){
	var students = getAllStudents();

	for (var i = 0; i < students.length; i++) {
		if (students[i].id===studentId) {
			students[i].name=studentName;
		}
	}

	storage.setItemSync("students",students);
}

function showStudent(){
	var students = getAllStudents();

	for (var i = 0; i < students.length; i++) {
		console.log("Tên sinh viên : "+students[i].name+"\n"+"Mã số sinh viên : "+students[i].id+"\n");
	}
}


//khởi tạo giá trị nhập vào

var yargs = require('yargs');

var argv = yargs
				.command('show',"show a list students",function(yargs){

				})
				.command('add',"add a student",function(yargs){
					return yargs.options({
						id : {
							demand : true,
							type : "number"
						},
						name :{
							demand : true,
							type : "string"
						}
					});

				})
				.command('edit',"edit a student",function(yargs){
					return yargs.options({
						id :{
							demand : true,
							type : "number"
						},
						name :{
							demand : true,
							type :"string"
						}
					});

				})
				.command('delete',"delete a student",function(yargs){
					return yargs.options({
						id :{
							demand : true,
							type : "number"
						}
					});					
				})
				.argv;

var data = argv._[0];

if (data==="show") {
	showStudent();
	console.log("Show the list Successfully!");
}
else if (data === "add") {
	addStudent(argv.name,argv.id);
	showStudent();
	console.log("Add the student Successfully!");
}
else if (data === "edit") {
	editStudent(argv.name,argv.id);
	showStudent();
	console.log("Edit the student Successfully!");
}
else if (data === "delete") {
	removeStudent(argv.id);
	showStudent();
	console.log("Delete the student Successfully!");
}
else  {
	console.log("ERROR: command not found ! ");
}



