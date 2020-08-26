const studentList = document.querySelector(".student-list").children;
const paginationDiv = document.createElement("div");
paginationDiv.className = 'pagination';

  function showPage (page, list) {
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
    }

    ul.addEventListener("click", (event) => {
      const page = event.target.textContent;
      showPage(page, list);
    })
  }

function search() {
  const studentNames = document.querySelectorAll("h3");
  const header = document.querySelector("h2");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  header.appendChild(form);
  form.appendChild(input);
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

for (let i = 0; i < studentList.length; i++) {
    if (i > 9) {
      studentList[i].style.display = "none";
    }
  }


appendPageLinks(studentList);
search();
