
  
  const videoContainer = document.querySelector(".video-container");
  const data = videoContainer.innerHTML;
  for (let i = 1; i < 8; i++) {
    videoContainer.innerHTML += data;
  }
  
  const post = document.querySelectorAll(".post");
  
  for (let i = 0; i < post.length; i++) {
    post[i].querySelector('video').src =`../video/${file[i+1]}`;


    const videoPlayer = post[i].querySelector(".video-player");
    const postVideo = post[i].querySelector(".post-video");
  
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
  
  
  
  mobileControl();
  

  
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
  
    function scrollToHashtag() {
      const hashtag = window.location.hash.substring(1);
    
      if (hashtag) {
          const element = document.getElementsByClassName(hashtag)[0];
          if (element) {
              element.scrollIntoView({
                  behavior: 'smooth'
              }); // Smooth scroll to the element
          }
      }
    }
    window.addEventListener('load', scrollToHashtag);
  
  
  
  }
  
  
  

  