$(document).ready(function() {

    $('.filters').css('left', $('.smallSideber').width() + 0 + 'px');
    $('.filters').css('width', 'calc(100% - ' +  $('.smallSideber').width()  + 'px)');
})
$(document).ready(function() {

    $('.stickySidebar').css('top', $('nav').height() + 24 + 'px');
   $(".menu-icon").click(function(event) {
    event.stopPropagation();
        $(".stickySidebar").toggleClass('visible'); 
    });
    
    $("body").click(function(event) {
        if (!$(event.target).closest('.stickySidebar').length && $(".stickySidebar").hasClass('visible')) {
            $(".stickySidebar").toggleClass('visible');
        }
    });

    $(document).click(function() {
        $('#microphone').removeClass('visible');
    })

    $('#voice_search').click(function(event) {
        $('#microphone').addClass('visible');
        event.stopPropagation();

    })

    $(".recoder").click(function(event) {
        event.stopPropagation();

    })
    $('#microphone .close').click(function() {
        $('#microphone').removeClass('visible');
    })


});

$(document).ready(function() {
    var speech;
    let r = 0;
    let voices = [];
    let synth;
    let micActive = false;
    let mediaStream = null;
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
            $('#microphone').removeClass('visible');
        }
    }
    $('#speakBtn').click(function() {
        if ($('#speakBtn').hasClass('active')) {
            checkhSpeach()
            speech.recognition.stop();

        } else {
            
            $('#speakBtn').addClass('active');
            new Audio('../assets/audio/start.mp3').play();
            setTimeout(function() {
                speak(language);
                //navigator.mediaDevices.getUserMedia({ audio: true });
                speech.recognition.start();
            }, 500);
            let language = $('#microphone select').val().trim();

           $('#mic-status').removeClass('active').text('Microphone is off');
            
            setTimeout(function() {
              //  mediaStream.getTracks().forEach(track => track.stop());
                $('#speakBtn').removeClass('active')
                speech.recognition.stop();

            

            }, 8000);


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