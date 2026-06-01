// Elements
const studentInput = document.getElementById("studentInput");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const studentTableBody = document.getElementById("studentTableBody");
const totalStudents = document.getElementById("totalStudents");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");

// Student Data
let students = JSON.parse(localStorage.getItem("students")) || [];

// Render Students
function renderStudents() {
  studentTableBody.innerHTML = "";
  students.forEach((student, index) => {
    // Create Row
    const row = document.createElement("tr");
    // ID
    const idCell = document.createElement("td");
    idCell.textContent = index + 1;
    // Student Name
    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;
    // Status
    const statusCell = document.createElement("td");

    if (student.isPresent) {
      statusCell.textContent = "Present";
      statusCell.classList.add("present");
    } else {
      statusCell.textContent = "Absent";
      statusCell.classList.add("absent");
    }

    // Attendance Button
    const attendanceCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    if (student.isPresent) {
      toggleBtn.textContent = "Mark Absent";
    } else {
      toggleBtn.textContent = "Mark Present";
    }

    toggleBtn.addEventListener("click", function () {
      toggleAttendance(student.id);
    });

    attendanceCell.appendChild(toggleBtn);

    // Delete Button
    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteStudent(student.id);
    });
    actionCell.appendChild(deleteBtn);

    // Append All Cells
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(attendanceCell);
    row.appendChild(actionCell);

    // Append Row To Table
    studentTableBody.appendChild(row);
  });
  updateSummary();
}

// Add Student
function addStudent() {
  const studentName = studentInput.value.trim();
  if (studentName === "") {
    alert("Please enter student name");
    return;
  }

  const student = {
    id: Date.now(),
    name: studentName,
    isPresent: true,
  };

  students.push(student);
  studentInput.value = "";
  renderStudents();
}

// Toggle Attendance
function toggleAttendance(id) {
  students.forEach(function (student) {
    if (student.id === id) {
      student.isPresent = !student.isPresent;
    }
  });
  renderStudents();
}

// Delete Student
function deleteStudent(id) {
  students = students.filter(function (student) {
    return student.id !== id;
  });
  renderStudents();
}

// Update Summary
function updateSummary() {
  const total = students.length;
  let present = 0;
  students.forEach(function (student) {
    if (student.isPresent) {
      present++;
    }
  });
  const absent = total - present;
  totalStudents.textContent = total;
  presentCount.textContent = present;
  absentCount.textContent = absent;
}

// Save Attendance
function saveAttendance() {
  localStorage.setItem("students", JSON.stringify(students));
  alert("Attendance Saved Successfully");
}

// Event Listeners
addBtn.addEventListener("click", addStudent);
saveBtn.addEventListener("click", saveAttendance);

// Initial Render
renderStudents();
