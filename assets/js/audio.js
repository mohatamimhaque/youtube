var allMusic = []
control();

function control() {
    const contents = document.querySelectorAll('.audio_container');
    const height = window.screen.height;
    for (let tt = 0; tt < contents.length; tt++) {
        const content = contents[tt];
        const audio = content.querySelector('audio');
        const url = audio.src;
        const thumbnail = content.querySelector('.thumbnail');
        const audio_title = content.querySelector('.audio_title');
        const artist = content.querySelector('.artist');
        const checkbox_artist = content.querySelector('.checkbox_artist');
        const checkbox_audio_title = content.querySelector('.checkbox_audio_title');

        let myObj = {};

        myObj.name = checkbox_audio_title.value;

        myObj.unique_id = $('.unique_id').val()
        myObj.src = url;

        audio.addEventListener('loadedmetadata', () => {
            myObj.duration = audio.duration;
        });


        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                // create a File object from the blob
                const file = new File([blob], 'audio.mp3', {
                    type: blob.type
                });

                // read the metadata using jsmediatags
                const jsmediatags = window.jsmediatags;
                jsmediatags.read(file, {
                    onSuccess: function(tag) {
                        const data = tag.tags.picture.data;
                        const format = tag.tags.picture.format;
                        let base64String = "";
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                        }
                        const img = document.createElement('img');
                        thumbnail.querySelector('span').style.display = 'none';
                        thumbnail.appendChild(img)
                        let src = `data:${format};base64,${window.btoa(base64String)}`;
                        img.src = src;
                        if (tag.tags.artist) {
                            str = tag.tags.artist;
                            myObj.artist = str;
                            checkbox_artist.value = str;
                            if (str.length > 30) {
                                artist.innerHTML = str.substring(0, 30 - 3) + '...';
                            } else {
                                artist.textContent = tag.tags.artist;
                            }
                        } else {
                            checkbox_artist.value = 'unknown';
                            myObj.artist = 'unknown';

                        }

                        allMusic.push(myObj)

                    },
                    onError: function(error) {
                        //console.log(error);
                    }
                });

            })


        let str = audio_title.innerHTML;
        if (str.length > 30) {
            audio_title.innerHTML = str.substring(0, 30 - 3) + '...';
        }




    }

    $('.audio_container').click(function() {
        let target = $(this);
        let title = target.find('.checkbox_audio_title').val().trim();
        let artist = target.find('.checkbox_artist').val().trim();
        let src = target.find('audio').attr('src').trim();
        let unique_id = target.find('.unique_id').val().trim();
        audio(title, artist, src, unique_id);



    })


}


function audio(title, artist, src, unique_id) {

    let audio = $('#miniPlayer audio')[0];




    audio.src = src;
    audio.currenTime = 0;
    let playpause = $("#miniPlayer .playpause");
    audio.play();
    playpause.addClass('playing');
    $("#miniPlayer .playpause span").text('pause')
    $('#miniPlayer .audio_title marquee').text(title);
    if (artist.length > 25) {

        $('#miniPlayer .artist').text(artist.substring(0, 25 - 3) + '...');
    } else {
        $('#miniPlayer .artist').text(artist);
    }
$(audio).on("timeupdate", function() {
          
          
            var progress = (parseInt(audio.currentTime) / parseInt(audio.duration)) * 100;
            $('#current_progressbar').width(progress + "%");
            console.log()
        });


    $('#miniPlayer').addClass('active');

    $("#miniPlayer .close").on("click", function() {
        if (playpause.hasClass('playing')) {
            audio.pause();
            playpause.removeClass('playing');
            $("#miniPlayer .playpause span").text('play_arrow')
        }
        $('#miniPlayer').removeClass('active');
    })
    $("#miniPlayer .exapand_icon").on("click", function() {
        if (playpause.hasClass('playing')) {
            audio.pause();
            playpause.removeClass('playing');
            $("#miniPlayer .playpause span").text('play_arrow')
        }
        $('#miniPlayer').removeClass('active');
        $('.expandPlayer').addClass('active');
        expandPlayer(audio.currentTime, src, title, artist, unique_id)

    })




    $(playpause).on("click", function() {
        if (playpause.hasClass('playing')) {
            audio.pause();
            playpause.removeClass('playing');
            $("#miniPlayer .playpause span").text('play_arrow')
        } else {
            audio.play();
            playpause.addClass('playing');
            $("#miniPlayer .playpause span").text('pause')
        }

        
    });
}


function expandPlayer(current, src, title, artist, unique_id) {
  $(".expandPlayer ul").text('');
  
    $(document).ready(function() {

        var musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
        // alert(musicIndex);
        var isMusicPaused = true;
        var musicName = $(".song-details .name");
        var musicArtist = $(".song-details .artist");
        //var musicImg = $("#music-img");
        var mainAudio = $("#expand_audio");



        $(window).on("load", function() {
            loadMusic(musicIndex);
            playingSong();
        });

        function loadMusic(indexNumb) {
            musicName.text(allMusic[indexNumb - 1].name);
            musicArtist.text(allMusic[indexNumb - 1].artist);

            mainAudio.attr("src", `${allMusic[indexNumb - 1].src}`);
        }


        const ulTag = $(".expandPlayer ul");
        // let create li tags according to array length for list

        //console.log(allMusic)

        for (let i = 0; i < allMusic.length; i++) {
            //let's pass the song name, artist from the arraylet

            let name, artist;

            if (allMusic[i].name.length > 30) {
                name = allMusic[i].name.substring(0, 30 - 3) + '...'
            } else {
                name = allMusic[i].name;
            }
            if (allMusic[i].artist.length > 30) {
                artist = allMusic[i].artist.substring(0, 30 - 3) + '...'
            } else {
                artist = allMusic[i].artist;
            }
            let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span style="white-space:nowrap">${name}</span>
                  <p style="white-space:nowrap">${artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">${formatTime(allMusic[i].duration)}</span>
                <audio class="${allMusic[i].src}" src="${allMusic[i].src}"></audio>
              </li>`;
            ulTag.append(liTag); //inserting the li inside ul tag




        }




        let audio = $("#expand_audio")[0];
        audio.src = src;
        audio.currentTime = current;
        $('.expandPlayer .name').text(title);
        $('.expandPlayer .artist').text(artist);



        let playpause = $(".play-pause");

        audio.play();
        playpause.addClass('playing');
        $(".play-pause i").text('pause')
        /* $('#miniPlayer .audio_title marquee').text(title);
         if (artist.length > 25) {
            
         $('#miniPlayer .artist').text(artist.substring(0, 25 - 3) + '...');
         }
         else{
           $('#miniPlayer .artist').text(artist);
         }
         */
        $('.expand_more').on("click", function() {
            audio.pause();
            playpause.removeClass('playing');
            $(".play-pause i").text('play_arrow')
            $('.expandPlayer').removeClass('active');
        })
        $(playpause).on("click", function() {
            //alert('')
            if (playpause.hasClass('playing')) {
                audio.pause();
                playpause.removeClass('playing');
                $(".play-pause i").text('play_arrow')
            } else {
                audio.play();
                playpause.addClass('playing');
                $(".play-pause i").text('pause')
            }
        })
        $(document).ready(function() {
            var repeatBtn = $("#repeat-plist");
            repeatBtn.on("click", function() {
                var getText = repeatBtn.text(); //getting this tag innerText
                switch (getText) {
                    case "repeat":
                        repeatBtn.text("repeat_one");
                        repeatBtn.attr("title", "Song looped");
                        break;
                    case "repeat_one":
                        repeatBtn.text("shuffle");
                        repeatBtn.attr("title", "Playback shuffled");
                        break;
                    case "shuffle":
                        repeatBtn.text("repeat");
                        repeatBtn.attr("title", "Playlist looped");
                        break;
                }
            });

            $(audio).on("ended", function() {
                var getText = repeatBtn.text(); //getting this tag innerText
                switch (getText) {
                    case "repeat":
                        nextMusic(); //calling nextMusic function
                        break;
                    case "repeat_one":
                        audio.currentTime = 0;
                        audio.play();
                        break;
                    case "shuffle":
                        let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
                        do {
                            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                        } while (musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
                        musicIndex = randIndex; //passing randomIndex to musicIndex
                        loadMusic(musicIndex);
                        playMusic();
                        playingSong();
                        break;
                }
            });
        });


        $(audio).on("timeupdate", function() {
            var progress = (parseInt(audio.currentTime) / parseInt(audio.duration)) * 100;
            $('.progress-bar').width(progress + "%");

            $(".current-time").text(formatTime(audio.currentTime));

        });

        $(audio).on("loadedmetadata", function() {

            $(".max-duration").text(formatTime(audio.duration));
        });

        $('.progress-area').on("touchmove", function(e) {
            let x = e.touches[0].clientX;
            let progresswidthval = $('.progress-area')[0].clientWidth;
            let videoDuration = audio.duration;
            let progressTime = Math.floor((x / progresswidthval) * videoDuration);
            audio.currentTime = progressTime;
        })
        $('.progress-area').on("touchstart", function(e) {
            let x = e.touches[0].clientX;
            let progresswidthval = $('.progress-area')[0].clientWidth;
            let videoDuration = audio.duration;
            let progressTime = Math.floor((x / progresswidthval) * videoDuration);
            audio.currentTime = progressTime;
        })


        var moreMusicBtn = $("#more-music");
        var musicList = $(".music-list");
        var closemoreMusic = $(".closemoremusic");

        moreMusicBtn.on("click", function() {
            musicList.toggleClass("show");
        });

        closemoreMusic.on("click", function() {
            moreMusicBtn.click();
        });

        // console.log(allMusic)
        function playingSong() {
            const allLiTag = document.querySelectorAll(".expandPlayer ul li");

            for (let j = 0; j < allLiTag.length; j++) {
                let audioTag = allLiTag[j].querySelector(".audio-duration");

                if (allLiTag[j].classList.contains("playing")) {
                    allLiTag[j].classList.remove("playing");
                    let adDuration = audioTag.getAttribute("t-duration");
                    audioTag.innerText = adDuration;
                }

                //if the li tag index is equal to the musicIndex then add playing class in it
                if (allLiTag[j].getAttribute("li-index") == musicIndex) {
                    allLiTag[j].classList.add("playing");
                    audioTag.innerText = "Playing";
                }


            }
        }
        //prev music button event
        $('#prev').click(() => {
            prevMusic();
        });

        //next music button event
        $('#next').click(() => {
            nextMusic();
        });
        $('.expandPlayer ul li').click(function() {
            musicIndex = $(this).attr('li-index');

            loadMusic(musicIndex);
            moreMusicBtn.click();
            playMusic();
            playingSong();

        })
        //particular li clicked function
        function clicked(element) {
            alert('');
            let getLiIndex = element.getAttribute("li-index");
            musicIndex = getLiIndex; //updating current song index with clicked li index
            loadMusic(musicIndex);
            playMusic();
            playingSong();
        }

        function playMusic() {
            audio.currentTime = 0;
            audio.play();
        }

        function prevMusic() {
            musicIndex--; //decrement of musicIndex by 1
            //if musicIndex is less than 1 then musicIndex will be the array length so the last music playMusi.
            // alert(musicIndex)
            musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            console.log($('#expand_audio').attr('src'))
        }

        //next music function
        function nextMusic() {
            musicIndex++; //increment of musicIndex by 1
            //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
            musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
        }



        let canvas = $(".waveform canvas")[0];
        let audioContext = new AudioContext();
        let sourceNode = audioContext.createMediaElementSource(audio);
        let analyserNode = audioContext.createAnalyser();
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioContext.destination);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");

        function draw() {
            requestAnimationFrame(draw);
            let bufferLength = analyserNode.frequencyBinCount;
            let dataArray = new Uint8Array(bufferLength);
            analyserNode.getByteTimeDomainData(dataArray);
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#9f6ea3";
            ctx.beginPath();
            let sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                let v = dataArray[i] / 128.0;
                let y = v * canvas.height / 2;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            ctx.stroke();
        }
        draw();
    });

}

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    if (minutes > 59) {
        let hours = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60)
        return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}