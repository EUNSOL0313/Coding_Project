const API_KEY = `9f293c6208014351b2559d020efc8cc3`
let news = []

const getLatestNews = async () => {
   //async-await함수
   const url = new URL(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
   )
   //  console.log('uuu', url)
   const response = await fetch(url) //fetch는 url을 호출해서 인터넷을 긁어 올 수 있는 함수 fetch가 끝나면 response를 받을 수있음
   const data = await response.json() //json :객체를 텍스트화 시킨 데이터 타입
   //let news = data.article; //함수내에서 먼저 정의하고 확인 후 계속 쓸 변수이기때문에  전역변수로 변경하기
   news = data.article
   console.log('rrr', response) //rrr Promise { <pending> } -> api는 시간이 걸리는 작업
   // await하면 기다리게 해줌 비동기함수 - async랑 꼭 같이 사용해야함
   //데이터 네트워크(인터넷)관련은 시간을 좀 기다려줘야함(await)
}
getLatestNews()
