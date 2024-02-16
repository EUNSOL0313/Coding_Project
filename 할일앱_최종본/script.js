//유저가 값을 입력한다(인풋을 가져와서 ID추가하기)
//+버튼을 클릭하면(버튼을 가져와서 클릭이벤트 주기), 할일이 추가된다(tasklist 배열을 만들기).
//delete버튼을 누르면 할일이 삭제된다,
//check버튼을 누르면 할일이 끝나면서  밑줄이 간다.
//-1. check버튼을 클릭하는 순간 isComplete false=>true바꾸기
//-2. true이면 끝난걸로 간주하고 밑줄 보여주기
//-3. false이면 안끝난 걸로 간주하고 그대로보여주기
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만 나온다.
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.querySelector('#task-input')
let addButton = document.querySelector('#add-button')
let taskList = []
let underLine = document.querySelector('#under-line')
let tabs = document.querySelectorAll('.task-tabs div')
let mode = 'all' //전역변수로 변경해줘여햠 초기값은 모두이기때문에
let filterList = [] //전역변수로 변경
let date = document.querySelector('#date')
let currentDate = getCurrentDate()
date.textContent = currentDate // 현재 날짜 불러오고 현재 날짜 출력하기

// let navTaskTabs = document.querySelectorAll('nav a')

// navTaskTabs.forEach((menu) =>
//    menu.addEventListener('click', (e) => taskTabsIndicator(e.currentTarget))
// ) //e:이벤트

//언더라인
tabs.forEach((menu) =>
   menu.addEventListener('click', (e) => horizontalIndicator(e))
)
function horizontalIndicator(e) {
   underLine.style.left = e.currentTarget.offsetLeft + 'px'
   underLine.style.width = e.currentTarget.offsetWidth + 'px'
   underLine.style.top =
      e.currentTarget.offsetTop + (e.currentTarget.offsetHeight - 4) + 'px'
}

for (let i = 1; i < tabs.length; i++) {
   tabs[i].addEventListener('click', (e) => {
      filter(e)
   })
}

// task 공백방지
addButton.addEventListener('click', (e) => {
   if (taskInput.value.length == 0) {
      alert('할일을 입력해주세요.')
   } else {
      addTask()
      filter()
   }
})

// 엔터누름 할일추가
taskInput.addEventListener('keyup', (e) => {
   if (e.key === 'Enter') {
      if (taskInput.value.length !== 0) {
         addTask()
         filter()
      } else {
         alert('할일을 입력해주세요.')
      }
   }
})

// 현재 날짜 불러오기
function getCurrentDate() {
   return new Date().toLocaleDateString()
}

function addTask() {
   let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
   }
   taskList.push(task)
   taskInput.value = '' // 입력한 값 초기화
   render() //아이템 그려주기
}

function render() {
   let list = []
   if (mode === 'all') {
      // all: taskList 보여줌
      list = taskList
      console.log(mode)
   } else {
      //ongoing, done : filterList 보여줘야함
      // else if (mode === 'ongoing' || mode === 'done')
      list = filterList
      console.log(mode)
   }

   let resultHTML = '' //스트링변수 생성

   for (let i = 0; i < list.length; i++) {
      if (list[i].isComplete == true) {
         resultHTML += `<div class="task task-done-box">
          <div class = "task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check" style="color: #0752e9; font-size:X-large;"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-circle-minus" style="color: #f80d0d; font-size:X-large;"></i></button>
          </div >
        </div > `
      } else {
         resultHTML += `<div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle-check" style="color: #0752e9; font-size:X-large;"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-circle-minus" style="color: #f80d0d; font-size:X-large;"></i></button >
          </div >
        </div > `
      }
      taskInput.value = ''
   }

   document.getElementById('task-board').innerHTML = resultHTML // resultHTML을 붙여넣을거다(innerHTML)
}

function toggleComplete(id) {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
         taskList[i].isComplete = !taskList[i].isComplete //true->!taskList[i].isComplete : 스위치 처럼 체크되돌리기할때사용
         break //for문 종료
      }
   }

   console.log('체크리스트', taskList)
   filter()
}

function deleteTask(id) {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
         taskList.splice(i, 1)
         break
      }
   }
   filter()
}

function filter(e) {
   filterList = []
   if (e) {
      mode = e.target.id
   }
   if (mode === 'all') {
   } else if (mode === 'ongoing') {
      for (let i = 0; i < taskList.length; i++) {
         if (taskList[i].isComplete === false) {
            filterList.push(taskList[i])
         }
      }
   } else if (mode === 'done') {
      for (let i = 0; i < taskList.length; i++) {
         if (taskList[i].isComplete === true) {
            filterList.push(taskList[i])
         }
      }
   }
   render()
}
function randomIDGenerate() {
   return '_' + Math.random().toString(36).replace(/\./g, '')
}
// //function filter(e) {
//   if (e) {
//     mode = e.target.id;
//     underLine.style.width = e.target.offsetWidth + "px";
//     underLine.style.left = e.target.offsetLeft + "px";
//     underLine.style.top =
//       e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
//   } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가

//   filterList = [];
//   if (mode === "ongoing") {
//     for (let i = 0; i < taskList.length; i++) {
//       if (taskList[i].isComplete == false) {
//         filterList.push(taskList[i]);
//       }
//     }
//   } else if (mode === "done") {
//     for (let i = 0; i < taskList.length; i++) {
//       if (taskList[i].isComplete) {
//         filterList.push(taskList[i]);
//       }
//     }
//   }
//   render();
// }
