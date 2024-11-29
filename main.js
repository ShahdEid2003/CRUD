const courseName=document.querySelector('#courseName');
const courseCategory=document.querySelector('#courseCategory');
const coursePrice=document.querySelector('#coursePrice');
const courseDescription=document.querySelector('#courseDescription');
const courseCapacity=document.querySelector('#courseCapacity');
const addBtn=document.querySelector('#click');
let courses=[];
// when refresh the page the next block code will gurannte save  data stored in local storge and display it in table 
if(localStorage.getItem("courses")!= null){
    courses=JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}
//set values in object to create courses array and set items from FormInputes to local storge 
addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const course ={
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value,
        capacity: courseCapacity.value,
    };
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    displayCourses();
    Swal.fire({
        title: "Good job!",
        text: "Course added!",
        icon: "success"
      });
});
function displayCourses() {
    const result=courses.map((course,index)=>{
        return`
        <tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course. category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        </tr>
        `;
    }).join('');
    document.querySelector('#data').innerHTML=result;
}
