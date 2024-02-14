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
let navTaskTabs = document.querySelectorAll('nav a')

navTaskTabs.forEach((menu) =>
   menu.addEventListener('click', (e) => taskTabsIndicator(e.currentTarget))
) //e:이벤트

addButton.addEventListener('click', addTask)

function addTask() {
   if (!taskInput.value) {
      alert('할 일을 입력해 주세요!')
      return
   }

   let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
   }
   taskList.push(task)
   render() //아이템 그려주기
   taskInput.value = '' //할일 입력 후 입력창 공백만들기
}

function render() {
   let resultHTML = '' //스트링변수 생성
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
         resultHTML += `<div class="task task-done2">
          
          <div class = "task-done">${taskList[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-circle-check" style="color: #0752e9; font-size:X-large;"></i></button>
      <button onclick="deleteTask('${taskList[i].id}')"> <i class="fa-solid fa-circle-minus" style="color: #f80d0d; font-size:X-large;"></i></button >
          </div >
        </div > `
      } else {
         resultHTML += `<div class="task">
          
          <div>${taskList[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-circle-check" style="color: #0752e9; font-size:X-large;"></i></button>
      <button onclick="deleteTask('${taskList[i].id}')"> <i class="fa-solid fa-circle-minus" style="color: #f80d0d; font-size:X-large;"></i></button >
          </div >
        </div > `
      }
   }

   document.getElementById('task-board').innerHTML = resultHTML
}

function toggleComplete(id) {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
         taskList[i].isComplete = !taskList[i].isComplete
         break //for문 종료
      }
   }
   render() // 랜더 꼭 실행해줘야함
   console.log(taskList)
}
function deleteTask(id) {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
         taskList.splice(i, 1) //splice(시작점에서,몇개아이템)
         break
      }
   }
   //배열에 있는 아이템을 삭제하는 방법

   //  console.log('삭제하자', id) 처음 삭제 확인
   //  console.log(taskList) 확인하고 ui업뎃필수
   render() //값업뎃 확인하고 ui업뎃하기
}

function taskTabsIndicator(e) {
   underLine.style.left = e.offsetLeft + 'px'
   underLine.style.width = e.offsetWidth + 'px'
   underLine.style.top = e.offsetTop + e.offsetHeight + 'px'
}

function randomIDGenerate() {
   return '_' + Math.random().toString(36).substr(2, 9)
} //이런 과정을 통해서 id생성됨 return은 어떤 함수의 결과물이 다른곳에서 쓰일때 사용, 데이터값에 ID값 부여하는거 아주 중요
