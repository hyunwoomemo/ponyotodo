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


//로그인폼 제출
loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    paintGreeting();
    saveUserName();
    loginInput.value = '';
    loginForm.classList.add('hidden');
    header.classList.add('active');
    container.classList.add('active');
    body.classList.add('active');
    toDoBtn.style.setProperty('pointer-events','all');
})

//그리팅 그리기
function paintGreeting(){
    userName = loginInput.value;
    greeting.innerText = `Hello, ${userName}`;
    greeting.classList.remove('hidden');
    header.appendChild(greeting);
}

//유저네임 저장
function saveUserName(){
    localStorage.setItem('username', userName);
}

const savedUserName = localStorage.getItem('username');

if( savedUserName === null) {
    greeting.classList.add('hidden');
    loginForm.classList.remove('hidden');
    toDoBtn.style.setProperty('pointer-events','none');

} else {
    greeting.classList.remove('hidden');
    loginForm.classList.add('hidden');
    greeting.innerText = `Hello, ${savedUserName}`;
    header.appendChild(greeting);
    header.classList.add('active');
    container.classList.add('active');
    body.classList.add('active');
    toDoBtn.style.setProperty('pointer-events','all');
}

// 헤더 메뉴 클릭

const headerMenu = document.querySelectorAll('.menuList li a');

for ( i = 0; i < headerMenu.length; i++){
headerMenu[i].addEventListener('click', function(event){
    event.preventDefault();
    for( j = 0; j < headerMenu.length; j++) {
    headerMenu[j].classList.remove('active');
    event.target.classList.add('active');
}
})
}

// 투두 아이템 추가 


toDoBtn.addEventListener('click', function(){
    //오버레이 활성화,투두폼 활성화
    onToDoForm();
    radioUnchecked();
    clearClassificationText();
    clearCheckedDate();
})
    //오버레이 비활성화,투두폼 비활성화
    toDoOverlay.addEventListener('click', function(){
        offToDoForm();
        sideBar.classList.remove('active');
    })

    function onToDoForm(){
        toDoWrapper.classList.add('active');
        toDoOverlay.classList.add('active');
        toDoOverlay.style.zIndex = '9998';
        toDoWrapper.style.zIndex = '9999';
    }

    function offToDoForm(){
        toDoOverlay.classList.remove('active');
        toDoWrapper.classList.remove('active');
        classification.value = '';
        content.value = '';
        title.value = '';
        closingDate.value = '';
        header.style.zIndex = '2';
        toDoSaveBtn.classList.remove('active');
    }

    let toDos = [];
    let checkedClassification = [];

//todo 작성 저장

    for ( var i = 0; i < classification.length; i++){
        classification[i].addEventListener('click', function(){
            clearClassificationText();
            checkedClassification = this.id;
            classificationText = document.createElement('span');
            classfi.appendChild(classificationText);
            classificationText.className ='cft';
            classificationText.innerText =  checkedClassification;
        })
    }
    //분류 초기화
    function clearClassificationText(){
        classificationText.textContent = '';
    }

    function radioUnchecked(){
        for ( i = 0; i < classification.length; i++){
            classification[i].checked = false;
        }
    }

    //제출하면 할 일


    toDoForm.addEventListener('submit', handleToDoSubmit);

    function handleToDoSubmit(event){
        event.preventDefault();
        toDoList.classList.add('active');
        newToDoObj = {
            content: content.value,
            closing: `${closingDateInput.value}`,
            cf :checkedClassification,
            title : title.value,
            id : Date.now(),
        };
        toDos.push(newToDoObj);
        paintToDo(newToDoObj);
        saveToDo();
        offToDoForm();
        calculateTallestSlide();
    }

//todo 리스트 만들기


function paintToDo(newToDoObj){
    const date = document.createElement("p");
    const dateText = new Date(newToDoObj.id);
    const dateMonth = String(dateText.getMonth()+1).padStart(2,"0");
    const dateDate = String(dateText.getDate()).padStart(2,"0");
    const dateHours = String(dateText.getHours()).padStart(2,"0");
    const dateMinutes = String(dateText.getMinutes()).padStart(2,"0");
    date.innerText = `${dateMonth}월 ${dateDate}일 ${dateHours}:${dateMinutes}`;
    toDoLi = document.createElement('li');
    const main = document.createElement('span');
    main.innerText = newToDoObj.content;
    const titleContent = document.createElement('span');
    titleContent.innerText = newToDoObj.title;
    const closingDate = document.createElement('span');
    closingDate.innerText = newToDoObj.closing;
    const classification = document.createElement('span');
    classification.innerText = newToDoObj.cf;
    const button = document.createElement("button");
    button.innerText = "삭제";
    const done = document.createElement("button");
    done.innerText = "완료";
    const p = document.createElement("p");
    toDoLi.id = newToDoObj.id;
    toDoLi.appendChild(titleContent);
    toDoLi.appendChild(main);
    toDoLi.appendChild(classification);
    toDoLi.appendChild(closingDate);
    toDoLi.appendChild(button);
    toDoLi.appendChild(done);
    toDoLi.appendChild(date);
    toDoLi.appendChild(p);
    toDoList.appendChild(toDoLi);
    main.classList.add('liMain')
    titleContent.classList.add('liTitle')
    closingDate.classList.add('liClosingDate')
    classification.classList.add('liClassification')
    p.classList.add('timeP');
    p.innerText = elapsed();
    function elapsed(){
        const today = new Date();
        const elapsedTime = Math.trunc((today.getTime()-toDoLi.id) / 1000);
        let elapsedText ="";
        if (elapsedTime < seconds) {
            elapsedText = "방금 전";
        } else if (elapsedTime < minute) {
            elapsedText = elapsedTime + "초 전";
        } else if (elapsedTime < hour) {
            elapsedText = Math.trunc(elapsedTime / minute) + "분 전";
        } else if (elapsedTime < day) {
            elapsedText = Math.trunc(elapsedTime / hour) + "시간 전";
        } else if (elapsedTime < (day * 15)) {
            elapsedText = Math.trunc(elapsedTime / day) + "일 전";
        };
    p.innerText = `${elapsedText}`;
    }
    elapsed();
    button.addEventListener("click", deleteToDo);
    done.addEventListener('click', handleDoneBtn);
}

//완료버튼 기능

function handleDoneBtn(event){
    const doneTitle = event.target.parentElement.childNodes[0].textContent;
    console.log(event.target.parentElement.childNodes[2]);
    const doneMain = event.target.parentElement.childNodes[1].textContent;
    const doneClassification = event.target.parentElement.childNodes[2].textContent;
    const doneClosingDate = event.target.parentElement.childNodes[3].textContent;
    const doneCreateDate = event.target.parentElement.childNodes[6].textContent;
    console.log(event.target.parentElement.childNodes);
    DoneObj = {
        content: doneMain,
        closing: doneCreateDate,
        cf :doneClassification,
        title : doneTitle,
        id : Date.now(),
    };
    
    dones.push(DoneObj);
    saveDone();
    paintDone(DoneObj);
    const toDoLi = event.target.parentElement;
    toDoLi.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(toDoLi.id));
    saveToDo();
    calculateTallestSlide();
}

function saveDone(){
    localStorage.setItem('dones', JSON.stringify(dones));
}

const savedDone = localStorage.getItem('dones');

if(savedDone !== null) {
    const parsedDone = JSON.parse(savedDone);
    dones = parsedDone;
    parsedDone.forEach(paintDone);
}

function paintDone(DoneObj){
    const date = document.createElement("p");
    const dateText = new Date(DoneObj.id);
    const dateMonth = String(dateText.getMonth()+1).padStart(2,"0");
    const dateDate = String(dateText.getDate()).padStart(2,"0");
    const dateHours = String(dateText.getHours()).padStart(2,"0");
    const dateMinutes = String(dateText.getMinutes()).padStart(2,"0");
    date.innerText = `${dateMonth}월 ${dateDate}일 ${dateHours}:${dateMinutes}`;
    const doneLi = document.createElement('li');
    const main = document.createElement('span');
    main.innerText = DoneObj.content;
    const titleContent = document.createElement('span');
    titleContent.innerText = DoneObj.title;
    const closingDate = document.createElement('span');
    closingDate.innerText = DoneObj.closing;
    const classification = document.createElement('span');
    classification.innerText = DoneObj.cf;
    const button = document.createElement("button");
    button.innerText = "❌";
    doneLi.id = DoneObj.id;
    doneLi.appendChild(titleContent);
    doneLi.appendChild(main);
    doneLi.appendChild(classification);
    doneLi.appendChild(closingDate);
    doneLi.appendChild(date);
    doneLi.appendChild(button);
    DoneList.appendChild(doneLi);
    button.addEventListener('click', deleteDone);
}

function deleteDone(event){
    const li = event.target.parentElement;
    li.remove();
    dones = dones.filter((done) => done.id !== parseInt(li.id));
    saveDone();
}


function handleDeleteBtnEnter(event){
    const li = event.target.parentElement;
    li.classList.add('animated');
}
function handleDeleteBtnLeave(event){
    const li = event.target.parentElement;
    li.classList.remove('animated');
}



function saveToDo(){
    localStorage.setItem("toDos",JSON.stringify(toDos));
}

let savedToDos = localStorage.getItem('toDos');


if ( savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; 
    parsedToDos.forEach(paintToDo);
}

function deleteToDo(event){
                const toDoLi = event.target.parentElement;
                toDoLi.remove();
                toDos = toDos.filter((toDo) => toDo.id !== parseInt(toDoLi.id));
                saveToDo();
            }


rangeInput.addEventListener('input', function(){
    document.documentElement.style.setProperty('--minRangeValue', `${this.value}px`);
    calculateTallestSlide();
})


//sidebar
const sideBtn = document.querySelector('.sideBtn');
const sideBar = document.querySelector('.sidemenu');
const sideMenu4 = document.querySelector('.sidemenu li:nth-of-type(4)');

function displaySideBar(){
    sideBar.classList.toggle('active');
    toDoOverlay.classList.toggle('active');
    toDoWrapper.style.zIndex = '9997';
    sideBar.style.zIndex = '9998';
};


sideBtn.addEventListener('click', function(){
    displaySideBar();
})

sideBar.addEventListener('click', function(){
    displaySideBar();
})

// 분류 저장

classificationAdd.addEventListener('click', function(){
    toDoOverlay.classList.add('active');
    toDoOverlay.style.zIndex = '9998';
    classificationForm.classList.add('active');
    clearClassificationText();
    radioUnchecked();
})

// to do 저장 버튼 활성화 

content.addEventListener('input', function(){
    toDoSaveBtn.classList.add('active');
})

// date 아웃풋


closingDateInput.addEventListener('input', function(){
    checkdDate = document.createElement('span');
    closingDate.appendChild(checkdDate);
    checkdDate.innerText = `${this.value} 까지`;
    checkdDate.classList.add('cft');
})

function clearCheckedDate(){
    checkdDate.innerText = '';
    closingDateInput.value = '';
}

closingDateInput.addEventListener('click', function(){
    clearCheckedDate();
})


// 분류 추가 작업 정리

/* 
    분류 추가 폼에 작성하면
    배열의 형태로 로컬스토리지에 저장한다.
    1. 일 2. 공부 3. 정리 4. 등등으로
    저장된것이 있다고 하면
    투두 작성 폼에 분류탭에 그려준다
    그 다음에 클릭하면 효과 넣어주고
    체크하면 창 닫기 되면서 이거를 오브젝트에 저장한다
*/

// 분류 클릭하면 저장되는 기능 추가

for ( i = 0; i < classificationLabel.length; i++){
    classificationLabel[i].addEventListener('click', function(){
        classificationForm.classList.remove('active');
    })
}

const hambuger = document.querySelector('.hambuger');
const hambuger1 = document.querySelector('.hambuger span:first-of-type');
const hambuger2 = document.querySelector('.hambuger span:nth-of-type(2)');
const hambuger3 = document.querySelector('.hambuger span:last-of-type');



hambuger.addEventListener('click', function(){
    hambuger1.style.setProperty('transform','rotate(45deg)');
    hambuger1.style.setProperty('top','50%');
    hambuger2.style.setProperty('display','none');
    hambuger3.style.setProperty('transform','rotate(-45deg)');
    hambuger3.style.setProperty('top','50%');
})

//분류창 한번 더 누르면 없어지는 기능

classificationForm.addEventListener('click', function(){
    classificationForm.classList.remove('active');
})

//스크롤시 헤더 스타일 변경

window.addEventListener('scroll', function(){
    if(this.scrollY > 10){
        header.classList.add('change');
    } else {
        header.classList.remove('change');
    };
});

//사이드바



// 리스트 nav bar 


successSection.addEventListener('click', function(){
    docElem.scrollTop = 0;
})

// 컨텐츠 wrapper 의 높이 지정
const doList = document.querySelectorAll('.DoList');
const slideCount = doList.length;
let topHeight = 0;

function calculateTallestSlide(){

for ( i = 0; i < slideCount; i++){
    if(doList[i].offsetHeight > topHeight){
        topHeight = doList[i].offsetHeight;
    }
}

container.style.height = `${topHeight+50}px`;
contentsWrapper.style.height = `${topHeight+50}px`;
slideWrapper.style.height = `${topHeight+50}px`;
}

calculateTallestSlide();
console.log(topHeight);


// range input 활성화 버튼

const settingBtn = document.querySelector('.fa-gear');

settingBtn.addEventListener('click', function(){
    rangeInput.classList.toggle('active');
})

/* // 완료, 삭제 버튼

const deleteBtn = document.querySelector('#toDoList button:first-of-type');

contentsWrapper.addEventListener('mouseenter', function(){
    contentsWrapper.classList.add('overflow');
})

contentsWrapper.addEventListener('mouseleave', function(){
    contentsWrapper.classList.remove('overflow');
}) */

const leftBtn = document.querySelector('#leftBtn');
const rightBtn = document.querySelector('#rightBtn');

rightBtn.addEventListener('click', function(){
    docElem.scrollTop = 0;
})

rightBtn.addEventListener('click', function(){
    docElem.scrollTop = 0;
})
leftBtn.addEventListener('click', function(){
    docElem.scrollTop = 0;
})

let currentIndex = 0;

const moveSlideWidth = slideWrapper.offsetWidth;

// 슬라이드가 있으면 가로로 배열하기

for ( i = 0; i < slideCount; i++){
    doList[i].style.left = `${i*100}%`
}

// 슬라이드 이동 함수

function goToSlide(idx){
    slideWrapper.classList.add('animated');
    slideWrapper.style.left = `${idx*-100}%`;
    currentIndex = idx;
}

// 버튼 기능 업데이트 함수

function updateNav(){
    //처음일 때
    if(currentIndex === 0){
        leftBtn.classList.add('disabled');
    } else {
        leftBtn.classList.remove('disabled');
    }

    //마지막일 때
    if(currentIndex === slideCount-1){
        rightBtn.classList.add('disabled');
    } else {
        rightBtn.classList.remove('disabled');
    }
}

//버튼을 클릭하면 슬라이드 이동시키기

leftBtn.addEventListener('click',function(){
    if( currentIndex === 0){
        goToSlide(slideCount-1);
    } else {
        goToSlide(currentIndex - 1);
    }
})

rightBtn.addEventListener('click',function(){
    if( currentIndex === slideCount-1){
        goToSlide(0);
    } else {
        goToSlide(currentIndex + 1);
    }
})

goToSlide(0);


addBtn.addEventListener('click', function(){
    onToDoForm();
})