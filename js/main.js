
document.addEventListener('DOMContentLoaded', function (){
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends' ,true)
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    request.setRequestHeader('Client-ID', 'bg95w14qdbr4q8kr8x41fc392ximf4')
    console.log(request)
      request.onload = () => {
        let stream = document.querySelector('.stream')
        let response = JSON.parse(request.response)
        console.log(response)
        if (request.status >= 200 && request.status < 400) {
          loadStreams(0)
          for (let i=1; i<20; i++) {
            let copy = stream.cloneNode(true)
            loadStreams(i)
            document.querySelector('main').appendChild(copy)
          }         
        } else {
          alert('error')
        }
        function loadStreams(i) {
          document.querySelector('.stream').firstElementChild.setAttribute('href', response.streams[i].channel.url)
          stream.querySelector('.stream__img').firstElementChild.setAttribute('src', response.streams[i].preview.medium)
          stream.querySelector('.stream__info--logo').firstElementChild.setAttribute('src', response.streams[i].channel.logo)
          stream.querySelector('.stream__info--title').firstElementChild.innerText = response.streams[i].channel.status
          stream.querySelector('.stream__info--title').lastElementChild.innerText = response.streams[i].channel.display_name 
        }
      }
      request.send()
})