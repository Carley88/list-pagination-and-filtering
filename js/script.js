/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


const studentList = document.querySelector(".student-list").children;

function showPage (page, list) {
  const increment = (page - 1) * 10;
  const indexLow = 0 + increment;
  const indexHigh = 9 + increment;

  for (let i = 0; i < list.length; i++) {
      if (i < indexLow || i > indexHigh) {
        list[i].style.display = "none";
    } else {
      list[i].style.display = ""
    }
  }
}

function appendPageLinks(list) {
  const pagesRequired = Math.ceil(list.length/10);
  const pageDiv = document.querySelector(".page")
  const div = document.createElement("div");
  div.className = 'pagination';
  const ul = document.createElement('ul');
  pageDiv.appendChild(div);
  div.appendChild(ul);

  for (let i = 0; i < pagesRequired; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    ul.appendChild(li);
    li.appendChild(a);
    a.href = "#";
    a.textContent = i + 1;
  }

  ul.addEventListener("click", (event) => {
    const page = event.target.textContent
    showPage(page, list);

  })
}

appendPageLinks(studentList);


// Remember to delete the comments that came with this file, and replace them with your own code comments.
