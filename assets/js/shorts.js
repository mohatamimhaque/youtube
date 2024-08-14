function getFileNameFromUrl(url) {
  return url.substring(url.lastIndexOf('/') + 1).split('.')[0];
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


const videoContainer = document.querySelector(".video-container");
const data = videoContainer.innerHTML;
for (let i = 1; i < 5; i++) {
  videoContainer.innerHTML += data;
}

const post = document.querySelectorAll(".post");

for (let i = 0; i < post.length; i++) {
    
    const videoPlayer = post[i].querySelector(".video-player");
    const postVideo = post[i].querySelector(".post-video");
    postVideo.src = `../video/${file[i+1]}`;

  const video = document.createElement('video');
  video.src = postVideo.src;
  video.addEventListener('loadedmetadata', function() {
      const randomTime = Math.random() * video.duration;
      video.currentTime = randomTime;
  });

  video.addEventListener('seeked', function() {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL('image/png');
      postVideo.poster = dataURL;
  });


  document.addEventListener('DOMContentLoaded', function() {
      let isTabVisible = !document.hidden;
      let isVideoVisible = false;
      let video = postVideo

      function updateVideoPlayback() {
          if (isTabVisible && isVideoVisible) {
              video.play();
          } else {
              video.pause();
          }
      }

      document.addEventListener('visibilitychange', function() {
          isTabVisible = !document.hidden;
          updateVideoPlayback();
      });




      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              isVideoVisible = entry.isIntersecting;
              updateVideoPlayback();


          });
      }, {
          threshold: 0.5 // Trigger when 50% of the video is visible
      });

      observer.observe(video);




  });




}


function playVideo(play_pause, video, post) {
  play_pause.innerHTML = "pause";
  post.querySelector(".desktop .overlay i").innerHTML = "play_arrow"
  play_pause.title = "pause(k)";
  post.classList.remove('paused');
  video.play();

  /*
  document.querySelector('#video_wrapper #video_overlay').style.display = 'none';
  $('#video_wrapper #video_status div').addClass('active');
  setTimeout(function() {
      $('#video_wrapper #video_status div').removeClass('active');
  },1000);
  */

}

function pauseVideo(play_pause, video, post) {
  play_pause.innerHTML = "play_arrow";
  post.querySelector(".desktop .overlay i").innerHTML = "pause"
  play_pause.title = "play(k)";
  video.pause();
  post.classList.add('paused');
  /*
  $('#video_wrapper #video_status div').addClass('active');
  setTimeout(function() {
      $('#video_wrapper #video_status div').removeClass('active');
  },1000);
  */
}


detectDeviceType();

function detectDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|touch|tablet/.test(userAgent)) {
      mobileControl();
  } else {
      desktopControl();
  }
}

function mobileControl() {
  document.querySelector('body').classList.add('mobile');
  videoContainer.style.height = `${window.innerHeight - 60}px`;


  for (let i = 0; i < post.length; i++) {
      const item = post[i];
      const play_control = post[i].querySelector(".mobile .play_control");
      const video = post[i].querySelector("video");
      const videoProgress = post[i].querySelector('.mobile .videoProgress');
      const preview = post[i].querySelector(".mobile .preview");
      const previewImg = post[i].querySelector(".mobile .previewImg");

      const progress_area = post[i].querySelector(".mobile .progress_area");
      const progress_bar = post[i].querySelector(".mobile .progress_bar");
      const buffered_progress_bar = post[i].querySelector(".mobile .buffered_progress_bar");
      const spinner = post[i].querySelector('.mobile .spinner');


      video.addEventListener('waiting', () => {
          spinner.style.display = 'block';
      })
      video.addEventListener('canplay', () => {
          spinner.style.display = 'none';
      })

      play_control.addEventListener("click", () => {
          var isVideoPaused = item.classList.contains('paused');
          isVideoPaused ? playVideo() : pauseVideo();

      })




      function playVideo() {
          item.classList.remove('paused');
          videoProgress.classList.remove('visible');
          video.play();
          play_control.querySelector('i').innerHTML = "play_arrow";
          play_control.classList.add('active');
          setTimeout(function() {
              play_control.classList.remove('active');
          }, 1000)

      }

      function pauseVideo() {
          video.pause();
          item.classList.add('paused');
          play_control.querySelector('i').innerHTML = "pause";

          play_control.classList.add('active');
          setTimeout(function() {
              //  play_control.classList.remove('active');
          }, 1000)
      }



      video.addEventListener('timeupdate', (e) => {
          let currentVideoTime = e.target.currentTime;
          let videoDuration = e.target.duration;
          let progressWidth = (currentVideoTime / videoDuration) * 100;
          progress_bar.style.width = `${progressWidth}%`;
      })


      progress_area.addEventListener('click', (e) => {
          let videoDuration = video.duration;
          let progresswidthval = progress_area.clientWidth;
          let ClickOffsetX = e.offsetX;
          video.currentTime = (ClickOffsetX / progresswidthval) * videoDuration;
      })


      let isDragging = false;

      progress_area.addEventListener('touchstart', (e) => {
          isDragging = true;
      });

      progress_area.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          let x = e.touches[0].clientX;
          preview.style.display = 'block';
          let progresswidthval = progress_area.clientWidth;
          let videoDuration = video.duration;
          let progressTime = Math.floor((x / progresswidthval) * videoDuration);
          let y = x;

          if (x >= progresswidthval - 80) {
              x = progresswidthval - 80;
          } else if (x <= 2) {
              x = 60;
          } else {
              x = x - 40;
          }

          preview.style.setProperty('--x', `${x}px`);

          video.currentTime = (y / progresswidthval) * videoDuration;

          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          previewImg.src = canvas.toDataURL('image/png');

          let progressWidth = (progress_area.clientWidth / x) * 100;
          progress_bar.style.width = `${progressWidth}%`
        });
        progress_area.addEventListener('touchend', (e) => {
            isDragging = false;
            preview.style.display = 'none';
        });

      video.addEventListener('loadeddata', () => {
          setInterval(() => {
              let bufferedTime = video.buffered.end(0);
              let duration = video.duration;
              let width = (bufferedTime / duration) * 100;
              buffered_progress_bar.style.width = `${width}%`

          }, 500);
      })

      
      item.addEventListener('touchstart', (e) => {
          videoProgress.classList.add('visible');
          play_control.classList.add('visible');
          var isVideoPaused = item.classList.contains('paused');
          setTimeout(function() {
              play_control.classList.remove('visible');
          }, 2000)
      })




      post[i].querySelector(".moreModal").addEventListener("click", () => {
          post[i].querySelector(".moreModal").classList.remove('active');
      })
      post[i].querySelector(".phone .more").addEventListener("click", () => {
          post[i].querySelector(".moreModal").classList.toggle('active');
      })

      post[i].querySelector(".phone .comment span:last-child").innerHTML = Math.floor(Math.random() * 9999) + 1;
      post[i].querySelector(".phone .like span:last-child").innerHTML = Math.floor(Math.random() * 9999) + 1;
      post[i].querySelector(".phone .dislike span:last-child").innerHTML = Math.floor(Math.random() * 9999) + 1;

  }




}



function desktopControl() {
  document.querySelector('body').classList.add('pc');
  videoContainer.style.height = `${window.innerHeight}px`;
  const height = window.innerHeight;
  const width = (height / 16) * 9;
  videoContainer.style.width = `${width + 75}px`;


  for (let i = 0; i < post.length; i++) {
      const volume = post[i].querySelector('.volume');
      const volume_range = post[i].querySelector('.volume_range');
      const video = post[i].querySelector('video');
      const play_pause = post[i].querySelector('.play_pause');
      const item = post[i];




      const videoSrc = video.getAttribute('src');
      const videoFileName = getFileNameFromUrl(videoSrc);

      post[i].setAttribute('id', replaceSpacesWithUnderscores(videoFileName))


      post[i].querySelector('.video-player').addEventListener('click', () => {
          var isVideoPaused = item.classList.contains('paused');
          if (isVideoPaused) {
              playVideo(play_pause, video, item);
          } else {
              pauseVideo(play_pause, video, item);
          }
          post[i].querySelector('.desktop .overlay').classList.add('active');
          setTimeout(function() {
              post[i].querySelector('.desktop .overlay').classList.remove('active');
          }, 1000)
      })

      play_pause.addEventListener('click', () => {
          var isVideoPaused = item.classList.contains('paused');
          isVideoPaused ? playVideo(play_pause, video, item) : pauseVideo(play_pause, video, item);
      })

      video.addEventListener('play', () => {
          playVideo(play_pause, video, item);
          document.title = videoFileName;
          setHashtag(videoFileName);
      })
      video.addEventListener('pause', () => {
          pauseVideo(play_pause, video, item);
      })

      document.addEventListener('keydown', function(e) {
          if (e.key === 'k') {
              var isVideoPaused = item.classList.contains('paused');
              isVideoPaused ? playVideo(play_pause, video, item) : pauseVideo(play_pause, video, item);
          } else if (e.key === 'm') {
              muteVolume();
          }
      })




      volume_range.value = `${post[i].querySelector('video').volume * 100}`;
      volume.addEventListener('click', () => {
          muteVolume()
      })
      volume_range.addEventListener('change', () => {
          changeVolume()
      })

      function changeVolume() {
          let value = volume_range.value;
          for (let i = 0; i < post.length; i++) {
              const volume = post[i].querySelector('.volume');
              const video = post[i].querySelector('video');
              post[i].querySelector('.volume_range').value = value;
              video.volume = value / 100;
              if (value == 0) {
                  volume.innerHTML = 'volume_off';
              } else if (value < 50) {
                  volume.innerHTML = 'volume_down';
              } else {
                  volume.innerHTML = 'volume_up';
              }
          }

      }

      function muteVolume() {
          for (let i = 0; i < post.length; i++) {
              const volume = post[i].querySelector('.volume');
              const volume_range = post[i].querySelector('.volume_range');
              const video = post[i].querySelector('video');
              let value = volume_range.value;
              if (value == 0) {
                  volume_range.value = 80;
                  video.volume = 0.8;
                  volume.innerHTML = 'volume_up';
              } else {
                  volume_range.value = 0;
                  volume.innerHTML = 'volume_off';
                  video.volume = 0;
              }
          }
      }




      const post_description = post[i].querySelector('body.pc .post-description');
      let originalText = post_description.innerHTML;
      post_description.innerHTML = shortenText(originalText, 100);


      function moreModal() {
          post[i].querySelector(".desktop-sideber .moreModal").classList.remove('active');
      }


      post[i].querySelector(".desktop-sideber .more").addEventListener("click", () => {
          post[i].querySelector(".moreModal").classList.toggle('active');
      })


      post[i].querySelector(".desktop-sideber .comment span:last-child").innerHTML = Math.floor(Math.random() * 9999) + 1;

  }
}

function scrollToHashtag() {
  const hashtag = window.location.hash.substring(1);

  if (hashtag) {
      const element = document.getElementById(hashtag);
      if (element) {
          element.scrollIntoView({
              behavior: 'smooth'
          }); // Smooth scroll to the element
      }
  }
}
window.addEventListener('load', scrollToHashtag);