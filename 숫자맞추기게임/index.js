//게임로직정하기
// 랜덤번호 지정 0
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름  go 버튼에 이벤트 넣어줘야함
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가  < 유저번호 Down!!!
//랜덤번호가 > 유저번호 Up!!
//Rest 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가,버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.
// 반응형 ui로 구현

let computerNum = 0
let playButton = document.getElementById('play-button')
let userInput = document.getElementById('user-input')
let resultArea = document.getElementById('result-area')
let resetButton = document.getElementById('reset-button')
let chances = 5
let gameOver = false
let chanceArea = document.getElementById('chance-area')
let history = []

playButton.addEventListener('click', play)
resetButton.addEventListener('click', reset)
userInput.addEventListener('focus', function () {
   userInput.value = ''
})

function pickRandomNumber() {
   computerNum = Math.floor(Math.random() * 100) + 1
   console.log('정답', computerNum)
}

function play() {
   let userValue = userInput.value
   if (userValue < 1 || userValue > 100) {
      resultArea.textContent = '1과 100사이 숫자를 입력해 주세요.'
      return
   }
   if (history.includes(userValue)) {
      resultArea.textContent = '이미 입력한 값입니다. 다른 숫자를 입력하세요.'
      return
   }
   chances--
   chanceArea.textContent = `남은기회 : ${chances}번`
   console.log('chance', chances)

   if (userValue < computerNum) {
      resultArea.textContent = 'UP!!'
   } else if (userValue > computerNum) {
      resultArea.textContent = 'DOWN!!'
   } else {
      resultArea.textContent = '맞췄습니다!!'
      gameOver = true
   }
   history.push(userValue)
   console.log(history)

   if (chances < 1 || gameOver) {
      playButton.disabled = true
   }
}

function reset() {
   userInput.value = ''
   pickRandomNumber()
   resultArea.textContent = '결과값이 여기 나옵니다!'
   chances = 5 // 찬스 초기화
   gameOver = false // 게임 오버 여부 초기화
   playButton.disabled = false // 플레이 버튼 활성화
   chanceArea.textContent = `남은기회 : ${chances}번` // 기회 표시 초기화
   history = [] // 기록 초기화
}

pickRandomNumber()
