const API_KEY = `9f293c6208014351b2559d020efc8cc3`
const Url1 = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
const Url2 = `https://dazzling-peony-652d49.netlify.app/top-headlines?country=kr`
//http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines //누나api
let newsList = [] //전역변수로 선언 후 아래 함수에서는 재할당하기
const menus = document.querySelectorAll('.menus button') // 버튼 이벤트 카테고리
console.log('mmm', menus)
menus.forEach((menu) =>
   menu.addEventListener('click', (event) => getNewsByCategory(event))
)

//과제 1. 받은 api데이터가 0개라면 화면에 No matches for your search 라는 메세지를 화면에 보여주자

//과제 2. 받은 응답의 코드가 200이 아니라면, (400,401,402 등 ) 받은 에러메세지를 화면에 보여주자.

const fetchDataAndRender = async (requestUrl) => {
   // try/캐치 및 에러 부분 챗gpt도움받아 해결 : 반복되는 코드 한곳에서관리
   try {
      const response = await fetch(requestUrl)
      const data = await response.json()
      if (response.status === 200) {
         if (data.articles.length === 0) {
            throw new Error('No matches for your search')
         }
         newsList = data.articles
         render()
      } else {
         throw new Error(data.message)
      }
      //console.log('Data fetched:', data)
      newsList = data.articles
      render()
   } catch (error) {
      console.log('Error fetching data:', error)
      errorRender(error.message)
   }
}

const getLatestNews = async () => {
   //async-await함수
   const requestUrl = new URL(Url2)
   //console.log('uuu', requestUrl)
   //const response = await fetch(requestUrl) //fetch는 url을 호출해서 인터넷을 긁어 올 수 있는 함수 fetch가 끝나면 response를 받을 수있음
   //const data = await response.json() //json :객체를 텍스트화 시킨 데이터 타입
   //let news = data.article; //함수내에서 먼저 정의하고 확인 후 계속 쓸 변수이기때문에  전역변수로 변경하기
   // newsList = data.articles //->여기서는 재할당만해주면 된다.
   // render() //newsList가 확정되는곳
   // console.log('rrr', response) //rrr Promise { <pending> } -> api는 시간이 걸리는 작업
   // // await하면 기다리게 해줌 비동기함수 - async랑 꼭 같이 사용해야함
   // //데이터 네트워크(인터넷)관련은 시간을 좀 기다려줘야함(await)
   // console.log('ddd', data)
   // console.log('aaa', newsList)
   fetchDataAndRender(requestUrl)
}

const getNewsByCategory = async (event) => {
   const category = event.target.textContent.toLowerCase()
   console.log('category', category) //카테고리 버튼 이벤트
   // const requestUrl = new URL(
   //    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
   // )
   const requestUrl = new URL(
      `https://dazzling-peony-652d49.netlify.app/top-headlines?country=kr&category=${category}`
   )

   // const response = await fetch(requestUrl)
   // const data = await response.json()
   // console.log('DDD', data)
   // newsList = data.articles
   // render()
   await fetchDataAndRender(requestUrl) //함수앞에 await이 안써줘서 에러났었음
}
const getNewsByKeyword = async () => {
   const keyword = document.querySelector('#search-input').value
   console.log('keyword', keyword)
   // const requestUrl = new URL(
   //    `https://newsapi.org/v2/top-headlines?q=${keyword}&country=kr&apiKey=${API_KEY}`
   // )
   const requestUrl = new URL(
      `https://dazzling-peony-652d49.netlify.app/top-headlines?q=${keyword}&country=kr`
   )

   //    const response = await fetch(requestUrl)
   //    const data = await response.json()
   //    console.log('keyword data', data)
   //    newsList = data.articles
   //    render()
   await fetchDataAndRender(requestUrl)
}

// const openSearchBox = () => {
//    let inputArea = document.getElementById('input-area')
//    if (inputArea.style.display === 'inline') {
//       inputArea.style.display = 'none'
//    } else {
//       inputArea.style.display = 'inline'
//    }
// }
//축약

const openSearchBox = () => {
   let inputArea = document.getElementById('input-area')
   inputArea.style.display =
      inputArea.style.display === 'inline' ? 'none' : 'inline'
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
   //console.log(newsHTML)
   document.querySelector('#news-board').innerHTML = newsHTML //어디에 뉴스를 붙일지!
   // array to string 콤마 없애기 join map이랑 같이 사용 "공백"
   //<div>${news.source.name}*${news.publishesAt}</div>
}

const errorRender = (errorMessage) => {
   const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div> `
   document.querySelector('#news-board').innerHTML = errorHTML
}
getLatestNews()

const openNav = () => {
   document.getElementById('mySidenav').style.width = '250px'
}

const closeNav = () => {
   document.getElementById('mySidenav').style.width = '0'
}

//1.메뉴들의 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
