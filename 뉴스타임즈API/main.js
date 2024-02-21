const API_KEY = `9f293c6208014351b2559d020efc8cc3`
const url1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
const url2 = `https://dazzling-peony-652d49.netlify.app/top-headlines?country=kr`
//http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines //누나api
let newsList = [] //전역변수로 선언 후 아래 함수에서는 재할당하기

//1. moment('20111031', 'YYYYMMDD').fromNow()<- 날짜랜더
//2. 노소스표시

const getLatestNews = async () => {
   //async-await함수
   const requestUrl = new URL(url1)
   console.log('uuu', requestUrl)

   const response = await fetch(requestUrl) //fetch는 url을 호출해서 인터넷을 긁어 올 수 있는 함수 fetch가 끝나면 response를 받을 수있음
   const data = await response.json() //json :객체를 텍스트화 시킨 데이터 타입
   //let news = data.article; //함수내에서 먼저 정의하고 확인 후 계속 쓸 변수이기때문에  전역변수로 변경하기
   newsList = data.articles //->여기서는 재할당만해주면 된다.
   render() //newsList가 확정되는곳
   console.log('rrr', response) //rrr Promise { <pending> } -> api는 시간이 걸리는 작업
   // await하면 기다리게 해줌 비동기함수 - async랑 꼭 같이 사용해야함
   //데이터 네트워크(인터넷)관련은 시간을 좀 기다려줘야함(await)
   console.log('ddd', data)
   console.log('aaa', newsList)
}
const openSearchBox = () => {
   let inputArea = document.getElementById('input-area')
   if (inputArea.style.display === 'inline') {
      inputArea.style.display = 'none'
   } else {
      inputArea.style.display = 'inline'
   }
}

const searchNews = () => {
   let keyword = document.getElementById('search-input').value
   page = 1
   url = new URL(
      `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
   )
   getNews()
}
const render = () => {
   //render는 newsList가 확정되어야 쓸수 있다.
   const newsHTML = newsList
      .map(
         (news) => `<div class="row news">
            <div class="col-lg-4">
               <img class="news-img-size" src="${
                  news.urlToImage ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
               }" />
            </div>
            <div class="col-lg-8">
               <h2>${news.title}</h2>
               <p>
                  ${
                     news.description == null || news.description == ''
                        ? '내용없음'
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + '...'
                        : news.description
                  }
               </p>
               <div>${news.source.name || 'no source'}  ${moment(
            news.published_date
         ).fromNow()}</div>
            </div>
         </div>`
      ) //뭘보여줄건데
      .join(' ')
   console.log(newsHTML)
   document.querySelector('#news-board').innerHTML = newsHTML //어디에 뉴스를 붙일지!
   // array to string 콤마 없애기 join map이랑 같이 사용 "공백"
   //<div>${news.source.name}*${news.publishesAt}</div>
}

getLatestNews()

const openNav = () => {
   document.getElementById('mySidenav').style.width = '250px'
}

const closeNav = () => {
   document.getElementById('mySidenav').style.width = '0'
}
