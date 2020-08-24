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



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.
