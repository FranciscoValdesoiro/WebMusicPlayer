
const myAPIKey = "YOUR_API_KEY";
const searchYoutubeVideo = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=anyValue&key=" + myAPIKey;

const baseVideoUrl = "https://www.youtube.com/embed/"

function searchVideo(value){
    this.videoContent = value;
    console.log("videoContent",this.videoContent);
     this.youtubeSearching = searchYoutubeVideo.replace('anyValue',value);
    return fetch(this.youtubeSearching);
}

async function getData(search){
    var videoList = await searchVideo(search)
        .then(response => response.json())
            .then(data => data.items)

    var videoListFiltered = videoList.filter(item => item.id.kind === "youtube#video")

    var listElement = document.getElementById("videoList")
    listElement.innerHTML = ''
    var videoWindowElement = document.getElementById("videoWindow")
    console.log(videoList)
    videoWindowElement.setAttribute("src", baseVideoUrl + videoListFiltered[0].id.videoId);
  
    videoListFiltered.forEach(element => {
        var li = document.createElement("li");
        var img = document.createElement("img");
        li.setAttribute("id", element.id.videoId);
        img.setAttribute("src", element.snippet.thumbnails.default.url);
        li.appendChild(img)
        li.appendChild(document.createTextNode(element.snippet.title));
        listElement.appendChild(li);
    });
}

var buttonsElement = document.getElementById("buttons")

buttonsElement.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        getData(e.target.innerText + " music")
    }
    console.log(e.target.tagName)
})

var listElement = document.getElementById("videoList")

listElement.addEventListener("click", function(e){
    var videoWindowElement = document.getElementById("videoWindow")
    videoWindowElement.setAttribute("src", baseVideoUrl + e.target.id);
    console.log(e.target)
})

getData("music")