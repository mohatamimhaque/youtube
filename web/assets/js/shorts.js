

  const videoContainer = document.querySelector(".video-container");
  const data = videoContainer.innerHTML;
  for (let i = 1; i < 12; i++) {
    videoContainer.innerHTML += data;
  }
  
  const post = document.querySelectorAll(".post");
  
  for (let i = 0; i < post.length; i++) {
    post[i].querySelector('video').src = `../video/${file[i+1]}`;
  
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
  
  
  }
  
  function pauseVideo(play_pause, video, post) {
    play_pause.innerHTML = "play_arrow";
    post.querySelector(".desktop .overlay i").innerHTML = "pause"
    play_pause.title = "play(k)";
    video.pause();
    post.classList.add('paused');
  }
  


desktopControl();
  
  
  
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
    const hashtag = window.location.hash.substring(1).replace(/%20/g, ' ').replace(/ /g, '_');
    
    if (hashtag) {
        const element = document.getElementById(hashtag);
        console.log(hashtag);
        console.log(element)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            }); // Smooth scroll to the element
        }
    }
  }
  window.addEventListener('load', ()=>{
        setTimeout(function() {
        scrollToHashtag();
    }, 1000)
  });