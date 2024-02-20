const API_KEY = `9f293c6208014351b2559d020efc8cc3`
const url1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
const url2 = 'https://https://dazzling-peony-652d49.netlify.app/top-headlines' //누나api
let news = [] //전역변수로 선언 후 아래 함수에서는 재할당하기

const getLatestNews = async () => {
   //async-await함수
   const requestUrl = new URL(url2)
   console.log('uuu', requestUrl)
   const response = await fetch(requestUrl) //fetch는 url을 호출해서 인터넷을 긁어 올 수 있는 함수 fetch가 끝나면 response를 받을 수있음
   const data = await response.json() //json :객체를 텍스트화 시킨 데이터 타입
   //let news = data.article; //함수내에서 먼저 정의하고 확인 후 계속 쓸 변수이기때문에  전역변수로 변경하기
   news = data.article //->여기서는 재할당만해주면 된다.
   console.log('rrr', response) //rrr Promise { <pending> } -> api는 시간이 걸리는 작업
   // await하면 기다리게 해줌 비동기함수 - async랑 꼭 같이 사용해야함
   //데이터 네트워크(인터넷)관련은 시간을 좀 기다려줘야함(await)
   console.log('ddd', data)
   console.log('aaa', news)
}
getLatestNews()
