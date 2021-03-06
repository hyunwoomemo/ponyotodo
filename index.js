const loginForm = document.querySelector('#loginForm');
const loginInput = document.querySelector('#loginForm input');
const greeting = document.querySelector('.greeting');
const noticeBox = document.querySelector('.noticeBox');
const header = document.querySelector('header');
const container = document.querySelector('.container');
const body = document.querySelector('body');
const rangeInput = document.querySelector('#rangeInput');
const toDoList = document.querySelector('#toDoList');
const toDoListItem = document.querySelectorAll('#toDoList li');
const classfi = document.querySelector('#classification');
const classificationForm = document.querySelector('#classification .back');
const classificationAdd = document.querySelector('#classification span');
const toDoBtnLi = document.querySelector('#toDoList li:first-of-type');
const toDoBtn = document.querySelector('.toDoAdd');
const toDoOverlay = document.querySelector('.toDoAdd-overlay');
const toDoWrapper = document.querySelector('.toDoWrapper');
const toDoForm = toDoWrapper.querySelector('form');
const classification = document.querySelectorAll('#classification input');
const navBar = document.querySelector('.ListNavBar');
const addBtn = document.querySelector('#add');

const contentsWrapper = document.querySelector('.contentsWrapper');
const slideWrapper = document.querySelector('.slideWrapper');
const successSection = document.querySelector('.ListNavBar ul li:nth-of-type(2)');
const docElem = document.documentElement;

const title = document.querySelector('#content #title');
const content = document.querySelector('#content #contents');

const closingDate = document.querySelector('#closing-date');
const closingDateInput = document.querySelector('#closing-date input');

const classificationLabel = document.querySelectorAll('.back .label');

const addClasification = document.querySelector('#addClasification');

const DoList = document.querySelector('.DoList');

let userName = '';
let classificationText = '';
let checkdDate = '';

const seconds = 1;
const minute = seconds * 60;
const hour = minute * 60;
const day = hour * 24;
let dones = [];

const DoneList = document.querySelector('#doneList');

const toDoSaveBtn = document.querySelector('#content button');

const deleteNoti = document.querySelector('.deleteNoti');
const saveNoti = document.querySelector('.saveNoti');
const successNoti = document.querySelector('.successNoti');

const detailWrite = document.querySelector('.detailWrite');
const detailWrapper = document.querySelector('.detailWrapper');

//???????????? ??????
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  paintGreeting();
  saveUserName();
  loginInput.value = '';
  loginForm.classList.add('hidden');
  header.classList.add('active');
  container.classList.add('active');
  body.classList.add('active');
  toDoBtn.style.setProperty('pointer-events', 'all');
  addBtndisabled();
})

//????????? ?????????
function paintGreeting() {
  userName = loginInput.value;
  greeting.innerText = `Hello, ${userName}`;
  greeting.classList.remove('hidden');
  header.appendChild(greeting);
}

//???????????? ??????
function saveUserName() {
  localStorage.setItem('username', userName);
}

const savedUserName = localStorage.getItem('username');

if (savedUserName === null) {
  greeting.classList.add('hidden');
  loginForm.classList.remove('hidden');
  toDoBtn.style.setProperty('pointer-events', 'none');

} else {
  greeting.classList.remove('hidden');
  loginForm.classList.add('hidden');
  greeting.innerText = `Hello, ${savedUserName}`;
  header.appendChild(greeting);
  header.classList.add('active');
  container.classList.add('active');
  body.classList.add('active');
  toDoBtn.style.setProperty('pointer-events', 'all');
}

// ?????? ?????? ??????

const headerMenu = document.querySelectorAll('.menuList li a');

for (i = 0; i < headerMenu.length; i++) {
  headerMenu[i].addEventListener('click', function (event) {
    event.preventDefault();
    for (j = 0; j < headerMenu.length; j++) {
      headerMenu[j].classList.remove('active');
      event.target.classList.add('active');
    }
  })
}

// ?????? ????????? ?????? 


toDoBtn.addEventListener('click', function () {
  //???????????? ?????????,????????? ?????????
  onToDoForm();
  radioUnchecked();
  clearClassificationText();
  clearCheckedDate();
})
//???????????? ????????????,????????? ????????????
toDoOverlay.addEventListener('click', function () {
  offToDoForm();
  sideBar.classList.remove('active');
})

function onToDoForm() {
  toDoWrapper.classList.add('active');
  toDoOverlay.classList.add('active');
  toDoOverlay.style.zIndex = '9998';
  toDoWrapper.style.zIndex = '9999';
  content.focus();
  content.value = '';
}


function offToDoForm() {
  toDoOverlay.classList.remove('active');
  toDoWrapper.classList.remove('active');
  classification.value = '';
  content.value = '';
  closingDate.value = '';
  header.style.zIndex = '2';
  toDoSaveBtn.classList.remove('active');
  detailWrapper.classList.remove('active');
}

let toDos = [];
let checkedClassification = [];

//todo ?????? ??????

for (var i = 0; i < classification.length; i++) {
  classification[i].addEventListener('click', function () {
    clearClassificationText();
    checkedClassification = this.id;
    classificationText = document.createElement('span');
    classfi.appendChild(classificationText);
    classificationText.className = 'cft';
    classificationText.innerText = checkedClassification;
  })
}
//?????? ?????????
function clearClassificationText() {
  classificationText.textContent = '';
}

function radioUnchecked() {
  for (i = 0; i < classification.length; i++) {
    classification[i].checked = false;
  }
}

//???????????? ??? ???


toDoForm.addEventListener('submit', handleToDoSubmit);

function handleToDoSubmit(event) {
  event.preventDefault();
  toDoList.classList.add('active');
  newToDoObj = {
    content: content.value,
    closing: `${closingDateInput.value}`,
    cf: checkedClassification,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDo();
  offToDoForm();
  addBtnActive();
  saveNotification();
  detailWrapper.classList.remove('active');
}

//todo ????????? ?????????


function paintToDo(newToDoObj) {
  const date = document.createElement("p");
  const dateText = new Date(newToDoObj.id);
  const dateMonth = String(dateText.getMonth() + 1).padStart(2, "0");
  const dateDate = String(dateText.getDate()).padStart(2, "0");
  const dateHours = String(dateText.getHours()).padStart(2, "0");
  const dateMinutes = String(dateText.getMinutes()).padStart(2, "0");
  date.innerText = `${dateMonth}??? ${dateDate}??? ${dateHours}:${dateMinutes}`;
  toDoLi = document.createElement('li');
  const main = document.createElement('span');
  main.innerText = newToDoObj.content;
  const closingDate = document.createElement('span');
  closingDate.innerText = newToDoObj.closing;
  const classification = document.createElement('span');
  classification.innerText = newToDoObj.cf;
  const button = document.createElement("button");
  button.innerText = "??????";
  const done = document.createElement("button");
  done.innerText = "??????";
  const p = document.createElement("p");
  toDoLi.id = newToDoObj.id;
  toDoLi.appendChild(main);
  toDoLi.appendChild(classification);
  toDoLi.appendChild(closingDate);
  toDoLi.appendChild(button);
  toDoLi.appendChild(done);
  toDoLi.appendChild(date);
  toDoLi.appendChild(p);
  toDoList.appendChild(toDoLi);
  main.classList.add('liMain')
  closingDate.classList.add('liClosingDate')
  classification.classList.add('liClassification')
  p.classList.add('timeP');
  p.innerText = elapsed();
  function elapsed() {
    const today = new Date();
    const elapsedTime = Math.trunc((today.getTime() - toDoLi.id) / 1000);
    let elapsedText = "";
    if (elapsedTime < seconds) {
      elapsedText = "?????? ???";
    } else if (elapsedTime < minute) {
      elapsedText = elapsedTime + "??? ???";
    } else if (elapsedTime < hour) {
      elapsedText = Math.trunc(elapsedTime / minute) + "??? ???";
    } else if (elapsedTime < day) {
      elapsedText = Math.trunc(elapsedTime / hour) + "?????? ???";
    } else if (elapsedTime < (day * 15)) {
      elapsedText = Math.trunc(elapsedTime / day) + "??? ???";
    };
    p.innerText = `${elapsedText}`;
  }
  elapsed();
  /*     setInterval(elapsed,1000); */
  button.addEventListener("click", deleteToDo);
  done.addEventListener('click', handleDoneBtn);
}

//???????????? ??????

function handleDoneBtn(event) {
  const doneMain = event.target.parentElement.childNodes[0].textContent;
  const doneClassification = event.target.parentElement.childNodes[1].textContent;
  const doneClosingDate = event.target.parentElement.childNodes[2].textContent;
  const doneCreateDate = event.target.parentElement.childNodes[5].textContent;
  console.log(event.target.parentElement.childNodes);
  DoneObj = {
    content: doneMain,
    closing: doneCreateDate,
    cf: doneClassification,
    id: Date.now(),
  };

  dones.push(DoneObj);
  saveDone();
  paintDone(DoneObj);
  const toDoLi = event.target.parentElement;
  toDoLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(toDoLi.id));
  saveToDo();
  addBtnUpdate();
  successNotification();
}

function saveDone() {
  localStorage.setItem('dones', JSON.stringify(dones));
}

const savedDone = localStorage.getItem('dones');

if (savedDone !== null) {
  const parsedDone = JSON.parse(savedDone);
  dones = parsedDone;
  parsedDone.forEach(paintDone);
}

function paintDone(DoneObj) {
  const date = document.createElement("p");
  const dateText = new Date(DoneObj.id);
  const dateMonth = String(dateText.getMonth() + 1).padStart(2, "0");
  const dateDate = String(dateText.getDate()).padStart(2, "0");
  const dateHours = String(dateText.getHours()).padStart(2, "0");
  const dateMinutes = String(dateText.getMinutes()).padStart(2, "0");
  date.innerText = `${dateMonth}??? ${dateDate}??? ${dateHours}:${dateMinutes}`;
  const doneLi = document.createElement('li');
  const main = document.createElement('span');
  main.innerText = DoneObj.content;
  const closingDate = document.createElement('span');
  closingDate.innerText = DoneObj.closing;
  const classification = document.createElement('span');
  classification.innerText = DoneObj.cf;
  const button = document.createElement("button");
  button.innerText = "???";
  doneLi.id = DoneObj.id;
  doneLi.appendChild(main);
  doneLi.appendChild(classification);
  doneLi.appendChild(closingDate);
  doneLi.appendChild(date);
  doneLi.appendChild(button);
  DoneList.appendChild(doneLi);
  button.addEventListener('click', deleteDone);
}

function deleteDone(event) {
  const li = event.target.parentElement;
  li.remove();
  dones = dones.filter((done) => done.id !== parseInt(li.id));
  saveDone();
}


function handleDeleteBtnEnter(event) {
  const li = event.target.parentElement;
  li.classList.add('animated');
}
function handleDeleteBtnLeave(event) {
  const li = event.target.parentElement;
  li.classList.remove('animated');
}



function saveToDo() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

let savedToDos = localStorage.getItem('toDos');


if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
  addBtn.classList.add('active');
  toDoBtn.classList.remove('active');
  addBtnUpdate();
}

function deleteToDo(event) {
  const toDoLi = event.target.parentElement;
  toDoLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(toDoLi.id));
  saveToDo();
  addBtnUpdate();
  deleteNotification();
}

function deleteNotification() {
  deleteNoti.classList.add('active');
  setTimeout(deleteNotificationOff, 2000);
}

function deleteNotificationOff() {
  deleteNoti.classList.remove('active');
}

function saveNotification() {
  saveNoti.classList.add('active');
  setTimeout(saveNotificationOff, 2000);
}

function saveNotificationOff() {
  saveNoti.classList.remove('active');
}

function successNotification() {
  successNoti.classList.add('active');
  setTimeout(successNotificationOff, 2000);
}

function successNotificationOff() {
  successNoti.classList.remove('active');
}

rangeInput.addEventListener('input', function () {
  document.documentElement.style.setProperty('--minRangeValue', `${this.value}px`);
})


//sidebar
const sideBtn = document.querySelector('.sideBtn');
const sideBar = document.querySelector('.sidemenu');
const sideMenu4 = document.querySelector('.sidemenu li:nth-of-type(4)');

function displaySideBar() {
  sideBar.classList.toggle('active');
  toDoOverlay.classList.toggle('active');
  toDoWrapper.style.zIndex = '9997';
  sideBar.style.zIndex = '9998';
};

sideBtn.addEventListener('click', function () {
  displaySideBar();
})

sideBar.addEventListener('click', function () {
  displaySideBar();
})

// ?????? ??????

classificationAdd.addEventListener('click', function () {
  toDoOverlay.classList.add('active');
  toDoOverlay.style.zIndex = '9998';
  classificationForm.classList.add('active');
  clearClassificationText();
  radioUnchecked();
})

// to do ?????? ?????? ????????? 

content.addEventListener('input', function () {
  toDoSaveBtn.classList.add('active');
})

// date ?????????


closingDateInput.addEventListener('input', function () {
  checkdDate = document.createElement('span');
  closingDate.appendChild(checkdDate);
  checkdDate.innerText = `${this.value} ??????`;
  checkdDate.classList.add('cft');
})

function clearCheckedDate() {
  checkdDate.innerText = '';
  closingDateInput.value = '';
}

closingDateInput.addEventListener('click', function () {
  clearCheckedDate();
})


// ?????? ???????????? ???????????? ?????? ??????

for (i = 0; i < classificationLabel.length; i++) {
  classificationLabel[i].addEventListener('click', function () {
    classificationForm.classList.remove('active');
  })
}

//????????? ?????? ??? ????????? ???????????? ??????

classificationForm.addEventListener('click', function () {
  classificationForm.classList.remove('active');
})

//???????????? ?????? ????????? ??????

window.addEventListener('scroll', function () {
  if (this.scrollY > 200) {
    header.classList.remove('active');
  } else {
    header.classList.add('active');
  }
});

//add ??????

addBtn.addEventListener('click', function () {
  onToDoForm();
})

//?????? ??????

const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('toDos');
  localStorage.removeItem('username');
})

// ????????? ?????? ??? ????????? ?????? ?????? ?????? ?????? ???????????? ??????

function addBtnUpdate() {
  if (toDos.length === 0) {
    addBtndisabled();
  } else {
    addBtnActive();
  }
}

function addBtndisabled() {
  addBtn.classList.remove('active');
  toDoBtn.classList.add('active');
  toDoBtnLi.classList.add('active');
}

function addBtnActive() {
  addBtn.classList.add('active');
  toDoBtn.classList.remove('active');
  toDoBtnLi.classList.remove('active');
}

addBtnUpdate();

document.body.addEventListener('keydown', function (event) {
  if (event.keyCode === 40 && event.ctrlKey) {
    onToDoForm();
  }
}
)

// ?????? ?????? ??????

const arrow = document.querySelector('#arrow');

detailWrite.addEventListener('click', function () {
  detailWrapper.classList.toggle('active');
})

function toDosAllDelete() {
  localStorage.removeItem('toDos');
  location.reload();
}

document.body.addEventListener('keydown', function (event) {
  if (event.keyCode === 46 && event.ctrlKey) {
    toDosAllDelete();
  }
})

// ??????

const captions = document.querySelectorAll('.liMain');

const myArray = [];
let counter = 1;

for (const caption of captions) {
  myArray.push({
    id: counter++,
    text: caption.textContent,
  });
}

// ??? ????????? ??????

const showCard = document.querySelector('.show-grid');
const showList = document.querySelector('.show-list');

showCard.addEventListener('click', () => {
  toDoList.classList.remove('listview');
  toDoList.classList.add('cardview');
  rangeInput.classList.add('active');
})

showList.addEventListener('click', () => {
  toDoList.classList.add('listview');
  toDoList.classList.remove('cardview');
  rangeInput.classList.remove('active');
})

content.addEventListener('keydown', (event) => {
  if( event.keyCode === 9 ){
    detailWrapper.classList.toggle('active');
  }
})

content.addEventListener('keydown', (event) => {
  if( event.keyCode === 9){
    classificationForm.classList.add('active');
  }
})
