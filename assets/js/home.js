
mobileControl();

function mobileControl() {
    document.querySelector('body').classList.add('mobile');

    const wrapper = document.querySelector("#wrapper");
    const data = wrapper.innerHTML;
    for (let i = 1; i < 5; i++) {
        wrapper.innerHTML += data;
    }
    const videoList = document.querySelectorAll(".video_list");
    for (let i = 0; i < videoList.length; i++) {
        const postVideo = videoList[i].querySelector("video");
        postVideo.src = `video${i}.mp4`;
        const video_overlay_img = videoList[i].querySelector(".video_overlay img");
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
            const video_overlay = videoList[i].querySelector(".video_overlay");
            const video_overlayImg = videoList[i].querySelector(".video_overlay img");
            const duration = videoList[i].querySelector(".duration");
            const volume = videoList[i].querySelector(".volume");
            const video_title = videoList[i].querySelector(".video-title");
            const views = videoList[i].querySelector(".views");
            const time = videoList[i].querySelector(".time");
            const progress_area = videoList[i].querySelector(".mobile .progress_area");
            const progress_bar = videoList[i].querySelector(".mobile .progress_bar");
            const buffered_progress_bar = videoList[i].querySelector(".mobile .buffered_progress_bar");
            const spinner = videoList[i].querySelector('.mobile .spinner');
            let title = getFileNameFromUrl(video.src);
            video.addEventListener('loadedmetadata', function() {
                duration.innerHTML = timeFormat(video.duration);
                video_title.innerHTML = shortenText(title,28);
            });
            video.addEventListener('timeupdate', (e) => {
                duration.innerHTML = timeFormat( e.target.duration - e.target.currentTime);
                let currentVideoTime = e.target.currentTime;
                let videoDuration = e.target.duration;
                let progressWidth = (currentVideoTime / videoDuration) * 100;
                progress_bar.style.width = `${progressWidth}%`;

            })
            video.addEventListener('loadeddata', () => {
                setInterval(() => {
                    let bufferedTime = video.buffered.end(0);
                    let duration = video.duration;
                    let width = (bufferedTime / duration) * 100;
                    buffered_progress_bar.style.width = `${width}%`
      
                }, 500);
            })

            progress_area.addEventListener('click', (e) => {
                e.stopPropagation();
                let videoDuration = video.duration;
                let progresswidthval = progress_area.clientWidth;
                let ClickOffsetX = e.offsetX;
                video.currentTime = (ClickOffsetX / progresswidthval) * videoDuration;
            })
      
      
            let isDragging = false;
    
            progress_area.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                isDragging = true;
            });
    
            progress_area.addEventListener('touchmove', (e) => {
                e.stopPropagation();
                if (!isDragging) return;
                let x = e.touches[0].clientX;
                let progresswidthval = progress_area.clientWidth;
                let videoDuration = video.duration;
                video.currentTime = Math.floor((x / progresswidthval) * videoDuration);

                let progressWidth = (x/progresswidthval ) * 100;
                progress_bar.style.width = `${progressWidth}%`;
              });
              progress_area.addEventListener('touchend', (e) => {
                  isDragging = false;
              });




            video_player.addEventListener('touchstart', (e) => {
                for (let j = 0; j < videoList.length; j++){
                    videoList[j].classList.remove('active');
                    videoList[j].querySelector("video").pause();
                    videoList[j].querySelector(".progress_area").style.display = 'none';
                }
                video.play();
                videoList[i].classList.add('active');
                progress_area.style.display = 'block'
            });
            video.addEventListener('waiting', () => {
                spinner.style.display = 'block';
            })
            video.addEventListener('canplay', () => {
                spinner.style.display = 'none';
            })
      

            video_player.addEventListener('click', function(event) {
                //window.location.href = `mobile-player.html#${replaceSpacesWithUnderscores(title)}`;
                console.log(replaceSpacesWithUnderscores(title))
            });

            volume.addEventListener('click', function(event) {
                event.stopPropagation();
                muteVolume()
            });
            views.innerHTML = `${Math.floor(Math.random() * 9999)} views`;

            const randomDate = getRandomDateWithinTwoYears();
            const timeDifference = timeDifferenceToNow(randomDate);
            time.innerHTML = timeDifference;



            

           




        }


      












    $(document).ready(function() {
        var speech;
        let r = 0;
        let voices = [];
        let synth;
        window.addEventListener("load", (event) => {
            synth = window.speechSynthesis;
            voices = synth.getVoices();
            if (synth.onvoiceschanged !== undefined) {
                synth.onvoiceschanged = voices;
            }
        })


        function checkhSpeach() {
            $('#speakBtn').removeClass('active');
            if (r == 0) {
                new Audio('assets/audio/end.mp3').play();
                setTimeout(function() {
                    speechText();
                }, 1500)
            }
            r++;
            setTimeout(function() {
                r = 0;
            }, 3000)


            let text = $('#recoredText').text().trim();
            if (text.length > 1) {
                $('#search').val(text);
                $('#recoredText').val('');
                $("#search").trigger("keyup");
                $('#microphone').removeClass('active');
                $('.mobile_search_container').addClass('active');
                $('.overlay-app').removeClass('visible');


            }
        }
        $('#speakBtn').click(function() {
            if ($('#speakBtn').hasClass('active')) {
                checkhSpeach()
                speech.recognition.stop();

            } else {
                $('#speakBtn').addClass('active');

                new Audio('assets/audio/start.mp3').play();
                setTimeout(function() {
                    speak(language);
                    speech.recognition.start();
                }, 1200);
                let language = $('#microphone select').val().trim();

                setTimeout(function() {
                    $('#speakBtn').removeClass('active')

                }, 7000);


            }
        })

        function speak(language) {
            window.SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
                speech = {
                    enabled: true,
                    listening: false,
                    recognition: new window.SpeechRecognition(),
                    text: ""
                };
                speech.recognition.continuous = true;
                speech.recognition.interimResults = true;
                speech.recognition.lang = language;
                speech.recognition.addEventListener("result", (event) => {
                    const audio = event.results[event.results.length - 1];
                    speech.text = audio[0].transcript;
                    const tag = document.activeElement.nodeName;
                    if (tag === "INPUT" || tag === "TEXTAREA") {
                        if (audio.isFinal) {
                            document.activeElement.value += speech.text;
                        }
                    }
                    $('#recoredText').text(speech.text);
                    checkhSpeach();

                    //setTimeout(checkhSpeach, 1000);
                });

            }
        }

        function speechText() {
            let say = $('#recoredText').text();
            let vox = 'English United Kingdom';
            let l = $('#microphone select').val().trim();
            if (l == 'en-US') {
                say = 'showing result ' + say;
            } else if (l == 'bn-BD') {
                vox = 'Bangla Bangladesh';
                say = 'ফলাফল দেখানো হচ্ছে ' + say;
            } else if (l == 'hi-IN') {
                vox = "Hindi India";
                say = 'परिणाम दिखा रहा है ' + say;
            } else if (l == 'ur-PK') {
                vox = "Urdu Pakistan";
                say = 'نتیجہ دکھا رہا ہے ' + say;
            } else if (l == 'fr-FR') {
                vox = "French France";
                say = 'montrant le résultat ' + say;
            } else if (l == 'pt-PT') {
                vox = "Portuguese Portugal";
                say = 'mostrando resultado ' + say;
            } else {
                say = 'no result';
            }

            let sayThis = new SpeechSynthesisUtterance(say);




            for (voice of voices) {
                if (voice.name === vox) {
                    sayThis.voice = voice;
                    break;
                }
            }
            synth.speak(sayThis);
        }
    })
    $(document).ready(function() {
        $('#search_icon').click(function() {
            $('.mobile_search_container').addClass('active');
        })
        $('.mobile_search_container i.arrow-left').click(function() {
            $('.mobile_search_container').removeClass('active');
            $('#search').val('');
            $('.filterBTN').removeClass('visible');

        })

        $('.filterBTN').css('top', $('.mobile_search_container').height() + 25 + 'px');

        $('#search').keyup(function(event) {
            if ($(this).val() !== "") {
                $('.filterBTN').addClass('visible');
            } else {
                $('.filterBTN').removeClass('visible');
            }
        })
        $('.filterBTN').click(function() {
            $('.pop-up').addClass('visible');
            $('.overlay-app').addClass('visible');
        })
        $('.pop-up .close').click(function() {
            $('.pop-up').removeClass('visible');
            $('.overlay-app').removeClass('visible');
        })
        $('#voice_search').click(function() {
            $('#microphone').addClass('active');
            $('.overlay-app').addClass('visible');
        })
        $('#microphone .close').click(function() {
            $('.overlay-app').removeClass('visible');
            $('#microphone').removeClass('active');
        })



    })

}

