/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
studentList const stores the list containing the students details.
paginationDiv const creates a new div with the class name pagination.
***/
const studentList = document.querySelector(".student-list").children;
const paginationDiv = document.createElement("div");
paginationDiv.className = 'pagination';

/***
showPage function:
Calculates which 10 students will be displayed on the page according to which page number the user has clicked.
@pageParameter is the page number the user has selected.
@listParameter is the list containing the students details.
***/

  function showPage (page, list) {
    //The increment subtracts 1 from the selected page number to cater for the index begining at 0.
    const increment = (page - 1) * 10;
    const indexLow = 0 + increment;
    const indexHigh = 9 + increment;

    for (let i = 0; i < list.length; i++) {
        if (i < indexLow || i > indexHigh) {
          list[i].style.display = "none";
      } else {
        list[i].style.display = "";
      }
    }
  }

/***
appendPageLinks function:
Calculates how many pages are required by dividing the length of the list by 10 & then adds each number to
the bottom of the page.
It then listens for a user clicking on the links, when clicked it calls the showPage function and passes the
page number through the param.
@listParameter is the list containing the students details.
***/

  function appendPageLinks(list) {
    const pagesRequired = Math.ceil(list.length/10);
    const pageDiv = document.querySelector(".page");
    const ul = document.createElement('ul');
    pageDiv.appendChild(paginationDiv);
    paginationDiv.appendChild(ul);

    for (let i = 0; i < pagesRequired; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      ul.appendChild(li);
      li.appendChild(a);
      a.href = "#";
      a.textContent = i + 1;
      if (a.textContent == 1) {
        a.className = "active"
      }
    }

    ul.addEventListener("click", (event) => {
      const pageLinks = document.getElementsByTagName("a");
      for (let i = 0; i < pageLinks.length; i++) {
        pageLinks[i].className = "";
      }
      if (event.target.tagName === "A") {
        const page = event.target.textContent;
        showPage(page, list);
        event.target.className = "active";
      }
    })
  }

/***
search function
Creates a search box at the top of the webpage so that a user can search for specific students.
The search is not case sensitive and allows to find students by only typing 2 or 3 letters of their name.
The results are returned to match the webpage design - only ten per page and the number of page links will
be according to how many results are returned.
If no results are returned a message will be displayed to let the user know & no page links are displayed.
***/

function search() {
  const studentNames = document.querySelectorAll("h3");
  const header = document.querySelector(".page-header");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  header.appendChild(form);
  form.appendChild(input);
  form.className = "student-search"
  form.appendChild(button);

  input.placeholder = "Search Name";
  button.textContent = "Search";

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchWord = input.value.toLowerCase();
    input.value = '';

    for (let i = 0; i < studentNames.length; i++) {
      const studentName = studentNames[i].textContent;
      if (studentName.includes(searchWord) === true) {
        studentList[i].style.display = "";
        studentList[i].dataset.active = "yes";
    } else {
      studentList[i].style.display = "none";
      studentList[i].dataset.active = "";
      }
    }

    const ul = paginationDiv.children;
    paginationDiv.removeChild(ul[0]);
    const activeStudents = document.querySelectorAll('[data-active=yes]');
    const noResultMessage = document.createElement("h2");
    paginationDiv.appendChild(noResultMessage);

    if (activeStudents.length === 0) {
      noResultMessage.textContent = "Search has returned 0 results, please try a different keyword.";
    } else {
      paginationDiv.removeChild(noResultMessage);
      showPage(1, activeStudents);
      appendPageLinks(activeStudents);
    }
  });
}

/***
Loop makes the first 10 students display when the user lands on the webpage.
Calling the appendPageLinks and search functions makes the page links and search bar appear on the webpage.
***/

for (let i = 0; i < studentList.length; i++) {
    if (i > 9) {
      studentList[i].style.display = "none";
    }
  }


appendPageLinks(studentList);
search();
