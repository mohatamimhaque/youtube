function timeFormat(time){
  let currentSec = Math.floor(time % 60);
  let currentMin = Math.floor(time / 60);
  let currenthour = Math.floor(time / 3600);
  currentMin = currentMin - currenthour * 60;
  
  currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
  currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
  currentMin < 10 ? currentMin = '0' + currentMin : currentMin;
  
  if(currenthour >= 1){
      return `${currenthour}:${currentMin}:${currentSec}`;
  }
  else{
     return `${currentMin}:${currentSec}`;
  }
}
function formatNumber(num) {
  if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'k';
  } else {
      return num.toString();
  }
}
function replaceSpacesWithUnderscores(text) {
  return text.replace(/ /g, '_');
}

function setHashtag(hashtag) {
  window.location.hash = hashtag;
}

function shortenText(text, maxLength) {
  if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
  } else {
      return text;
  }
}
function getFileNameFromUrl(url) {
  return url.substring(url.lastIndexOf('/') + 1).split('.')[0].replace(/%20/g, ' ');
}
function getRandomDateWithinTwoYears() {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setFullYear(now.getFullYear() - 10);

  return new Date(pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()));
}

function timeDifferenceToNow(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 59) {
      return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 59) {
      return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
      return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInDays < 30) {
      return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
}
device();
function device(){
  
const currentURL = window.location.href;
const userAgent = navigator.userAgent.toLowerCase();
if (/mobile|android|touch|tablet/.test(userAgent)) {
  if (currentURL.includes("/web/")) {
    const updateURl = currentURL.replace("/web/", "/m/");
    window.location.href = updateURl;
  }
}else{
  if (currentURL.includes("/m/")) {
    const updateURl = currentURL.replace("/m/", "/web/");
    window.location.href = updateURl;
  }
}
  
}

function getHashtagFromURL() {
  const hash = window.location.hash;
  if (hash) {
      const cleanedHashtag = hash.substring(1).replace(/_/g, ' '); 
      return cleanedHashtag;
  }
  return null;
}


document.title = "clone";
function changeFavicon(newIconURL) {
    let favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }

    favicon.href = newIconURL;
}

changeFavicon('../assets/img/icon.png');


var file = ['4k Village Status 🥀 -- Apna Gaw ❤️ -- Gaw Ka Video -- Village Good Morning Status #4kvideo.mp4', '8 July 2023. Mount Stuart Woods, Isle of Bute, Scotland..mp4', '230093 자연 바다 하늘 노을.mp4', 'Beautiful Sunrise & The Flowers - NO COPYRIGHT VIDEO - NATURE.mp4', 'Forest Path - Unreal Engine 5 Cinematic.mp4', 'FREE 4K Stock Footage - Snowing at Night.mkv', 'Luigi De Sorbo mare musica ♫.mp4', 'Nature Beautiful short video 720p HD.mp4', 'Nature Video 30 Seconds-WhatsApp Status Video-Nature Background Videos.mp4', 'Nature Video 30 Seconds-WhatsApp Status Video-Nature Background Videos_2.mp4', 'Nature WhatsApp Status Video 30 Seconds- Nature Love Song Background 2022-4k.mp4', 'Nature WhatsApp Status Video 30 Seconds-Nature Love Background Videos to Relax-HD.mp4', 'OC, Maryland. July 31st 2024..mp4', 'Outer Banks Coquina Beach.mp4', 'Rain Sounds   15 seconds soundtrack.mp4', 'Rain Whatsapp Status _ Rain Whatsapp Status Video …ish Status _ Rain Day_ Nature Whatsapp Status.mp4', 'Rainy Day 4k FREE STOCK FOOTAGE.mp4', 'Sunset at the beachhhh 🌊🏝️.mp4', 'Sunset Timelapse - சூரிய அஸ்தமனம்.mp4', 'イラスト風ナキウサギ.mp4', 'ルドベキア～撮影日記2024年8月4日.mp4'];
