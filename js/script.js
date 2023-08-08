/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/***
* `showPage` function
* This function will create and insert/append the elements needed to display a "page" of nine students
* iterates through a list (data list) and creates an item for each student to display on the page, inserts the HTML into the ul.
* a max number of students per page is set to 9. Only 9 student items are created for each page.
***/
const studentList = document.querySelector('ul.student-list');

const itemsPerPage = 9;

function showPage(list, page) {
   
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   studentList.innerHTML = '';

   for(let i = 0; i < list.length; i++){

      if(i >= startIndex && i < endIndex){
         
         const student = list[i];
         const studentItem = 
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${student.picture.thumbnail} alt="Profile Picture">
                  <h3 class="name">${student.name.first} ${student.name.last}</h3>
                  <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${student.registered.date}</span>
               </div>
            </li>`;

         studentList.insertAdjacentHTML('beforeend', studentItem);
         
      }

   }      
 }


showPage(data , 1);






/*** 
* `addPagination` function
* This function will create and insert/append the elements needed for the pagination buttons.
* creates a numbered page button depending on how many pages are available with the given list (data list). 
* adds a click event to the page buttons to navigate to each page.
*/

const linkList = document.querySelector('ul.link-list');

function addPagination(list) {
   
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   linkList.innerHTML = '';

   for(let i = 1; i <= numOfPages; i++){
      const button = 
         `<li>
            <button type="button">${i}</button>
         </li>`;
      linkList.insertAdjacentHTML('beforeend', button);

   }

   document.querySelector('button').className = "active";
 
   linkList.addEventListener('click', (e) => {

      if(e.target.tagName === 'BUTTON'){

         document.querySelector('.active').className = '';

         e.target.className = 'active';

         showPage(list, e.target.textContent);
      }
    })   
 }



addPagination(data);


/***
 * 'addSearch' function
 * creates and insterts a search bar for the user to search through students.
 ***/


function addSearch() {

   const header = document.querySelector('header');
   const form = 
         `<label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button" id="submit-button"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`
   
   header.insertAdjacentHTML('beforeend', form);

}

addSearch();


/***
 * 'searchBarResults'
 * takes the search input from the user and compares it to the list of students in data.
 * returns students that matches and adds to new array.
 * the new array is then used to create student items and pagination. 
 * a 'no results' message is display if no student matches the search input.
 ***/
      

const searchInput = document.querySelector('#search');
const submit = document.querySelector('#submit-button');


function searchBarResults(){

      const searchText = searchInput.value.toLowerCase();
      const newArray = [];

      for(let i = 0; i < data.length; i++){
         const student = data[i];
         if(student.name.first.toLowerCase().includes(searchText) || student.name.last.toLowerCase().includes(searchText)){
            newArray.push(student);
         }
      }


      studentList.innerHTML = '';

      if (newArray.length > 0){
         for(let i = 0; i < newArray.length; i++){
            showPage(newArray , 1);
            addPagination(newArray)
         }

      
      } else {
         const noResultsMessage = document.createElement('h1');
         noResultsMessage.innerHTML = '<h1>No Results Found</h1>';
         studentList.appendChild(noResultsMessage);
         linkList.innerHTML = '';
      }
   }

   

searchInput.addEventListener('keyup', searchBarResults);


