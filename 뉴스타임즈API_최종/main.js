const API_KEY = `9f293c6208014351b2559d020efc8cc3`
let url = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
const Url1 = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
const Url2 = `https://dazzling-peony-652d49.netlify.app/top-headlines?country=kr`
//http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines //누나api
let newsList = [] //전역변수로 선언 후 아래 함수에서는 재할당하기
const menus = document.querySelectorAll('.menus button') // 버튼 이벤트 카테고리
console.log('mmm', menus)
menus.forEach((menu) =>
   menu.addEventListener('click', (event) => getNewsByCategory(event))
)

let totalResults = 0
let page = 1
const pageSize = 10 //고정값
const groupSize = 5 //고정값

const fetchDataAndRender = async (url) => {
   try {
      url.searchParams.set('page', page)
      url.searchParams.set('pageSize', pageSize)
      const response = await fetch(url)
      const data = await response.json()
      if (response.status === 200) {
         if (data.articles.length === 0) {
            console.log('aaa', data)
            paginationRender()
            throw new Error('No matches for your search')
         }
         console.log('bbb', data)
         newsList = data.articles
         totalResults = data.totalResults
         render()
         paginationRender()
      } else {
         paginationRender()
         throw new Error(data.message)
      }
   } catch (error) {
      console.log('Error fetching data:', error)
      errorRender(error.message)
      paginationRender()
   }
}

const getLatestNews = async () => {
   //async-await함수
   url = new URL(Url2)
   fetchDataAndRender(url)
}

const getNewsByCategory = async (event) => {
   const category = event.target.textContent.toLowerCase()
   console.log('category', category) //카테고리 버튼 이벤트
   // url = new URL(
   //    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
   // )

   url = new URL(
      `https://dazzling-peony-652d49.netlify.app/top-headlines?country=kr&category=${category}`
   )

   await fetchDataAndRender(url)
}
const getNewsByKeyword = async () => {
   const keyword = document.querySelector('#search-input').value
   console.log('keyword', keyword)
   // url = new URL(
   //    `https://newsapi.org/v2/top-headlines?q=${keyword}&country=kr&apiKey=${API_KEY}`
   // )

   url = new URL(
      `https://dazzling-peony-652d49.netlify.app/top-headlines?q=${keyword}&country=kr`
   )

   await fetchDataAndRender(url)
}

const openSearchBox = () => {
   let inputArea = document.getElementById('input-area')
   inputArea.style.display =
      inputArea.style.display === 'inline' ? 'none' : 'inline'
}

const render = () => {
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
      )
      .join(' ')

   document.querySelector('#news-board').innerHTML = newsHTML
}

const errorRender = (errorMessage) => {
   const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div> `
   document.querySelector('#news-board').innerHTML = errorHTML
}

const paginationRender = () => {
   let paginationHTML = ``

   //totalPages
   const totalPages = Math.ceil(totalResults / pageSize)

   //pageGroup
   const pageGroup = Math.ceil(page / groupSize) //올림 계산

   //lastPage
   let lastPage = pageGroup * groupSize

   if (lastPage > totalPages) {
      lastPage = totalPages
   } //마지막 페이지 그룹이 그룹사이즈보다 작을때

   //firstPage
   let firstPage =
      lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1)
   if (firstPage > 1) {
      paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
            <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <li class="page-item" onclick="moveToPage(${page - 1})">
            <a class="page-link" href='#'>&lt;</a>
            </li>`
   }
   for (let i = firstPage; i <= lastPage; i++) {
      paginationHTML += `<li class="page-item ${
         i == page ? 'active' : ''
      }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
   }
   if (lastPage < totalPages) {
      paginationHTML += `<li class="page-item" onclick="moveToPage(${
         page + 1
      })">
                        <a  class="page-link" href='#'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="moveToPage(${totalPages})">
                        <a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                       </li>`
   }
   lastPage = pageGroup * 5
   if (lastPage > totalPages) {
      // 마지막 그룹이 5개 이하
      lastPage = totalPages
   }
   firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4 // 첫그룹이 5이하

   document.querySelector('.pagination').innerHTML = paginationHTML

   //    <nav aria-label="Page navigation example">
   //   <ul class="pagination">
   //     <li class="page-item">
   //       <a class="page-link" href="#" aria-label="Previous">
   //         <span aria-hidden="true">&laquo;</span>
   //       </a>
   //     </li>
   //     <li class="page-item"><a class="page-link" href="#">1</a></li>
   //     <li class="page-item"><a class="page-link" href="#">2</a></li>
   //     <li class="page-item"><a class="page-link" href="#">3</a></li>
   //     <li class="page-item">
   //       <a class="page-link" href="#" aria-label="Next">
   //         <span aria-hidden="true">&raquo;</span>
   //       </a>
   //     </li>
   //   </ul>
   // </nav>
}

const moveToPage = (pageNum) => {
   console.log('movetopage', pageNum) // url 호출을 해야함
   page = pageNum //pageNum 따라서 유동적인 값이 됨

   fetchDataAndRender(url)
}

const openNav = () => {
   document.getElementById('mySidenav').style.width = '250px'
}

const closeNav = () => {
   document.getElementById('mySidenav').style.width = '0'
}
getLatestNews()
