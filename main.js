const courseName = document.querySelector('#courseName');
const courseCategory = document.querySelector('#courseCategory');
const coursePrice = document.querySelector('#coursePrice');
const courseDescription = document.querySelector('#courseDescription');
const courseCapacity = document.querySelector('#courseCapacity');
const addBtn = document.querySelector('#click');
const clearBtn = document.querySelector('.clear');
// error messages
const invalidValueName = document.querySelector('.invalid-value.name');
const invalidValueCategory = document.querySelector('.invalid-value.category');
const invalidValuePrice = document.querySelector('.invalid-value.price');
const invalidValueDescription = document.querySelector('.invalid-value.description');
const invalidValueCapacity = document.querySelector('.invalid-value.capacity');
const invalidValue = document.querySelector('.invalid-value');
const input= document.querySelector('.inputs');
let courses = [];

// when refresh the page the code of next block will guarantee save data stored in local storage and display it in table
if (localStorage.getItem("courses") != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

// set values in object to create courses array and set items from FormInputs to local storage
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // patterns 
    const namePattern = /^[A-Z][a-z]{2,10}$/;
    const categoryPattern = /^[A-Za-z ]{3,20}$/;
    const pricePattern = /^[1-9][0-9]*$/;
    const descriptionPattern = /^.{10,50}$/;
    const capacityPattern = /^[1-9][0-9]{0,2}$/;

    // validation 
    if (!namePattern.test(courseName.value)) {
        invalidValueName.textContent = "Ensure it starts with an uppercase letter followed by 2-10 lowercase letters.";
        invalidValueName.classList.remove('d-none');
        courseName.classList.add('is-invalid');
    } else {
        invalidValueName.classList.add('d-none');
        courseName.classList.remove('is-invalid');
        courseName.classList.add('is-valid');

    }

    if (!categoryPattern.test(courseCategory.value)) {
        invalidValueCategory.textContent = "Invalid course category. Use 3-20 alphabetic characters only.";
        invalidValueCategory.classList.remove('d-none');
        courseCategory.classList.add('is-invalid');
    } else {
        invalidValueCategory.classList.add('d-none');
        courseCategory.classList.remove('is-invalid');
        courseCategory.classList.add('is-valid');
    }

    if (!pricePattern.test(coursePrice.value)) {
        invalidValuePrice.textContent = "Invalid course price. Enter a positive number.";
        invalidValuePrice.classList.remove('d-none');
        coursePrice.classList.add('is-invalid');
    } else {
        invalidValuePrice.classList.add('d-none');
        coursePrice.classList.remove('is-invalid');
        coursePrice.classList.add('is-valid');
    }

    if (!descriptionPattern.test(courseDescription.value)) {
        invalidValueDescription.textContent = "Invalid description. It must be between 10-200 characters.";
        invalidValueDescription.classList.remove('d-none');
        courseDescription.classList.add('is-invalid');
    } else {
        invalidValueDescription.classList.add('d-none');
        courseDescription.classList.remove('is-invalid');
        courseDescription.classList.add('is-valid');
    }

    if (!capacityPattern.test(courseCapacity.value)) {
        invalidValueCapacity.textContent = "Invalid capacity. Enter a number between 1 and 999.";
        invalidValueCapacity.classList.remove('d-none');
        courseCapacity.classList.add('is-invalid');
    } else {
        invalidValueCapacity.classList.add('d-none');
        courseCapacity.classList.remove('is-invalid');
        courseCapacity.classList.add('is-valid');
    }


    if (namePattern.test(courseName.value) && categoryPattern.test(courseCategory.value) && pricePattern.test(coursePrice.value) &&
        descriptionPattern.test(courseDescription.value) && capacityPattern.test(courseCapacity.value)) {
        const course = {
            name: courseName.value,
            category: courseCategory.value,
            price: coursePrice.value,
            description: courseDescription.value,
            capacity: courseCapacity.value,
        };

        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
        displayCourses();

        Swal.fire({
            title: "Good job!",
            text: "Course added!",
            icon: "success"
        });
    }
  
});
clearBtn.addEventListener('click', () => {

    invalidValueName.classList.add('d-none');
    invalidValueCategory.classList.add('d-none');
    invalidValuePrice.classList.add('d-none');
    invalidValueDescription.classList.add('d-none');
    invalidValueCapacity.classList.add('d-none');

    courseName.classList.remove('is-invalid', 'is-valid');
    courseCategory.classList.remove('is-invalid', 'is-valid');
    coursePrice.classList.remove('is-invalid', 'is-valid');
    courseDescription.classList.remove('is-invalid', 'is-valid');
    courseCapacity.classList.remove('is-invalid', 'is-valid');
});


function displayCourses() {
    const result = courses.map((course, index) => {
        return `
        <tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        </tr>
        `;
    }).join('');
    document.querySelector('#data').innerHTML = result;
}
