let container = document.querySelector('.page');
let listLi = document.querySelectorAll('.student-list > li');
let list = document.querySelector('.student-list');
let userName = document.querySelectorAll('.student-list > li > div > h3');
let userEmail = document.querySelectorAll('.student-list > li > div > .email');
let pageHeader = document.querySelector('.page-header');
let numMaxShow = 10;
let pagesTotal = Math.ceil(listLi.length / numMaxShow);
//let pageNum = document.querySelector('.pagination');
let pageActive = 1;
const maxLi = listLi.length-1;
const searchRepeat = 0;


//add search
let divSearch = document.createElement('div')
divSearch.className = 'student-search';
divSearch.innerHTML = '<input placeholder="Search for students..."><button>Search</button>';
let searchTerm = pageHeader.appendChild(divSearch);


// search student
function searchStudent(searchTerm){
  let itemsFound = 0;
  for (var i = 0; i < listLi.length; i++) {
      console.log(userName[i].textContent.includes(searchTerm));
      if(userName[i].textContent.includes(searchTerm) || userEmail[i].textContent.includes(searchTerm)){

        listLi[i].style.display = 'block';
        itemsFound++;
        document.querySelector('.divNotFound').style.display = 'none';
      }
  }
  if(itemsFound==0){
    let li = document.querySelector('.divNotFound');
    li.style.display = 'block';
    li.innerHTML = 'There are no matched found for "'+searchTerm+'"'+'<br><br><button>Show all</button>';
    let btnShowAll = document.querySelector('.student-list > h3 > button');
    btnShowAll.addEventListener('click',(event)=>{
      document.querySelector('.divNotFound').style.display = 'none';
      reloadList();
      pageNum.style.display = 'block';
    })
  }
}

// Search listener
let btnSearch = document.querySelector('.student-search > button');
btnSearch.addEventListener('click',()=>{
  let searchTerm = document.querySelector('.student-search > input').value;
  removeList();
  pageNum.style.display = 'none';
  searchStudent(searchTerm);
});


// Remove list
  function removeList(){
  for(let i = 0 ; i < listLi.length; i++){
    listLi[i].style.display = 'none';
  }
}

//show ten items
function showList(){
  let numStart = (pageActive*numMaxShow)-numMaxShow;
  let y = numStart + numMaxShow;
  while (numStart < y){
    if(numStart > maxLi){
      break;
    }
    listLi[numStart].style.display = 'block';
    numStart++;
  }
}

// add pagination
function addPagination(){
  if(pagesTotal > 1){
    let ul = document.createElement('ul');
    ul.textContent = '';
    let divUl = pageNum.appendChild(ul);

    for (let i = 0; i < pagesTotal; i++){
      let li = document.createElement('li');
      let divLi = divUl.appendChild(li);
      let a = document.createElement('a');
      a.textContent = i+1;
      a.setAttribute('href','#');
      a.setAttribute('class','');
      divLi.appendChild(a);
    }
  }
}

// Set Active page
function setActivePage(){
  let li = document.querySelectorAll('.student-list>ul,a');
  for(let i = 0 ; i < pagesTotal; i++) {
    li[i].removeAttribute('class');
  }
  li[pageActive-1].setAttribute('class','active');

}


// addPagination
let DivPageNum = document.createElement('div');
DivPageNum.setAttribute('class','pagination');
let pageNum = container.appendChild(DivPageNum);
addPagination();

// Reload list
function reloadList(pageActive){
  removeList();
  showList();
  setActivePage();
}

pageNum.addEventListener('click',(event)=>{
  pageActive = parseInt(event.target.innerHTML);
  reloadList();
})

// Not found content
function addNotFound(){
  let textNotFound = document.createElement('h3');
  textNotFound.innerHTML = 'There are no matched found for "'+searchTerm+'"'+'<br><br><button>Show all</button>';
  let divNotFound = list.appendChild(textNotFound);
  divNotFound.setAttribute('class', 'divNotFound');
  divNotFound.style.display = 'none';

}

// init functions
reloadList();
addNotFound();
