//유저가 값을 입력한다(인풋을 가져와서 ID추가하기)
//+버튼을 클릭하면(버튼을 가져와서 클릭이벤트 주기), 할일이 추가된다(tasklist 배열을 만들기).
//delete버튼을 누르면 할일이 삭제된다,
//check버튼을 누르면 할일이 끝나면서  밑줄이 간다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만 나온다.
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let taskList = []

addButton.addEventListener('click', addTask)

function addTask() {
   let taskContent = taskInput.value //taskContent은 taskInput(할일)의 값을 가져옴
   taskList.push(taskContent) //taskContent를 taskList에 push해서 배열생성
   render() //아이템 그려주기
}
function render() {
   //테스크리스트를 그리는 함수
   let resultHTML = '' //스트링변수 생성
   for (let i = 0; i < taskList.length; i++) {
      //taskList의길이만큼 I++하면서 배열안에 있는 아이템하나하나가지고 그려주기
      resultHTML += `<div class="task">
          <div>${taskList[i]}</div>
          <div>
            <button>Check</button>
            <button>Delete</button>
          </div>
        </div>`
   } //그려주기

   document.getElementById('task-board').innerHTML = resultHTML // resultHTML을 붙여넣을거다(innerHTML)
}
