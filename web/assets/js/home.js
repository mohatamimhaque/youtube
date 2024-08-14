

const wrapper = document.querySelector(".list-container");
const data = wrapper.innerHTML;
for (let i = 0; i < 12; i++) {
    wrapper.innerHTML += data;
}
const videoList = document.querySelectorAll(".vid-list");
    for (let i = 0; i < videoList.length; i++) {
        const postVideo = videoList[i].querySelector("video");
        postVideo.src = `../video/${file[i+1]}`;
        const video_overlay_img = videoList[i].querySelector(".overlay img");
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
            video_overlay_img.src = dataURL;
        });
    }

    muteVolume();
    function muteVolume() {
        for (let i = 0; i < videoList.length; i++) {
            const volume = videoList[i].querySelector('.volume');
            const video = videoList[i].querySelector('video');
            var ismuted = videoList[i].classList.contains('muted');
            if (ismuted) {
                videoList[i].classList.remove('muted');
                video.volume = 0.8;
                volume.innerHTML = 'volume_up';
            } else {
                videoList[i].classList.add('muted');
                volume.innerHTML = 'volume_off';
                video.volume = 0;
            }
        }
    }
    for (let i = 0; i < videoList.length; i++) {
        const video_player = videoList[i].querySelector(".video_player");
        const video = videoList[i].querySelector("video");
        const duration = videoList[i].querySelector(".duration");
        const volume = videoList[i].querySelector(".volume");
        const views = videoList[i].querySelector(".views");
        const time = videoList[i].querySelector(".time");
        const video_title = videoList[i].querySelector(".video-title");
        const spinner = videoList[i].querySelector('.spinner');

        let title = getFileNameFromUrl(video.src);
        video.addEventListener('loadedmetadata', function() {
            duration.innerHTML = timeFormat(video.duration);
            video_title.innerHTML = shortenText(title,28);
        });

        video.addEventListener('timeupdate', (e) => {
            duration.innerHTML = timeFormat( e.target.duration - e.target.currentTime);
        })
        video.addEventListener('waiting', () => {
            spinner.style.display = 'block';
        })
        video.addEventListener('canplay', () => {
            spinner.style.display = 'none';
        })

        volume.addEventListener('click', function(event) {
            event.stopPropagation();
            muteVolume()
        });
        video_player.addEventListener('click', function(event) {
          window.location.href = `video.html#${replaceSpacesWithUnderscores(title)}`;
        });
  
        views.innerHTML = `${Math.floor(Math.random() * 9999)} views`;

        const randomDate = getRandomDateWithinTwoYears();
        const timeDifference = timeDifferenceToNow(randomDate);
        time.innerHTML = timeDifference;


        var figure = $(".vid-list").hover(hoverVideo, hideVideo);

        function hoverVideo(e) {
        $('video', this).get(0).play(); // Play the video
        $('.overlay', this).css("display", "none"); // Hide the overlay
        }
        
        function hideVideo(e) {
            $('video', this).get(0).pause(); // Pause the video
            $('.overlay', this).css("display", "block"); // Show the overlay
        }
    }