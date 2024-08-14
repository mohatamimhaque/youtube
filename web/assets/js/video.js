var video_player = document.querySelector('#video_wrapper #video_player');
var video_status= document.querySelector('#video_wrapper #video_status');
var main_video= document.querySelector('#video_wrapper #main_video');
var progressAreaTime = document.querySelector('#video_wrapper .progressAreaTime');
var controls = document.querySelector('#video_wrapper .controls');
var progress_area = document.querySelector('#video_wrapper .progress_area');
var s_progress_area = document.querySelector('#video_wrapper .s_progress_area');
var progress_bar = document.querySelector('#video_wrapper .progress_bar');
var s_progress_bar = document.querySelector('#video_wrapper .s_progress_bar');
var buffered_progress_bar = document.querySelector('#video_wrapper .buffered_progress_bar');
var fast_rewind = document.querySelector('#video_wrapper .fast_rewind');
var play_pause = document.querySelector('#video_wrapper .play_pause');
var play_pause2 = document.querySelector('#video_wrapper #video_status i');
var fast_forward = document.querySelector('#video_wrapper .fast_forward');
var volume = document.querySelector('#video_wrapper .volume');
var volume_range = document.querySelector('#video_wrapper #volume_range');
var current = document.querySelector('#video_wrapper .current');
var s_current = document.querySelector('#video_wrapper .s_current');
var duration = document.querySelector('#video_wrapper .duration');
var s_duration = document.querySelector('#video_wrapper .s_duration');
var auto_play = document.querySelector('#video_wrapper .auto_play');
var settingsBTn = document.querySelector('#video_wrapper .settingsBTn');
var captionBTn = document.querySelector('#video_wrapper .captionBTn');
var picture_in_picture = document.querySelector('#video_wrapper .picture_in_picture');
var fullscreen = document.querySelector('#video_wrapper .fullscreen');
var settingHome = document.querySelectorAll('#video_wrapper [data-label="settingHome"] > ul >li');
var settings = document.querySelector('#video_wrapper #settings');
var captions = document.querySelector('#video_wrapper #captions');
var caption_labels = document.querySelector('#video_wrapper .caption ul');
var playback = document.querySelectorAll('#video_wrapper .playback li');
var thumbnail = document.querySelector('#video_wrapper #thumbnail');
var tracks = document.querySelectorAll('#video_wrapper track');
var spinner = document.querySelector('#video_wrapper #spinner');
var img_container = document.querySelector('#video_wrapper .img-container');
var scrubbing_position = document.querySelector('#video_wrapper .scrubbing_position');
var scrubbing_move = document.querySelector('#video_wrapper .scribbing_move');
var fine_scrubbing = document.querySelector('#video_wrapper .fine_scrubbing');
var scrubbing_timer = document.querySelector('#video_wrapper .scrubbing_timer');
var scrubbing_wrapper = document.querySelector('#video_wrapper .scrubbing_wrapper');
var loop = document.querySelector('#loop');
var video_overlay_img = document.querySelector('.video_overlay_img');
var scrubbing_movePosition = scrubbing_position.getBoundingClientRect().left - scrubbing_move.getBoundingClientRect().left;
fine_scrubbing.style.marginLeft = `${scrubbing_movePosition}px`;

function generateThumbnails(src) {
    let video = document.createElement("video");
    video.setAttribute("preload", "metadata");
    video.src = src;
    video.addEventListener("loadedmetadata", () => {

        let duration = video.duration;
        videoDuration = duration;
        let time = 5;
        let array = [];
        if(duration >=3600){
          time =20;
        }
        else if(duration >=300){
          time = 10;
        }
        else{
          time = 5;
        }; 
        for (let i = 1; i <= duration; i += time) {
            array.push(i);
            document.querySelector(".fine_scrubbing").innerHTML += `
            <div class="item">
                <div class="img">
                    <img src='#' alt="">
                    </div>
            </div>
            `;
        }
        control();

        let j = 0;

        const items = document.querySelectorAll(".fine_scrubbing .item");
        
        var needTime = array.length * 500;
        const interval = setInterval(() => {
            const canvas = document.createElement("canvas");
            canvas.width = 120;
            canvas.height = 80;
            video.currentTime = array[j];

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            items[j].querySelector('img').src = canvas.toDataURL();
            

           


            j++;
        }, 500)

        setTimeout(() => {
            clearInterval(interval);
        }, needTime);
    })
}

const hashtag = getHashtagFromURL();
if (hashtag) {
   document.querySelector('#main_video').src = `../video/${hashtag.replace(/_/g, ' ')}.mp4`;
} 
generateThumbnails(document.querySelector('#main_video').src);



function control(){
    var item = fine_scrubbing.querySelectorAll('.item');
    var y,z;
    var w =1;
    var x=0;
    if(tracks.length !== 0){
        caption_labels.insertAdjacentHTML('afterbegin',`<li data-track="off" class='active'>OFF</li>`)
        
        for(let i = 0; i < tracks.length; i++){
            var trackli =  `<li data-track="${tracks[i].label}">${tracks[i].label}</li>`;
            caption_labels.insertAdjacentHTML('beforeend',trackli)
        }
    }

    $('.timer,.scrubbing_timer').click(function(){
        $(".timer").toggleClass('reverse');
    })

    let duratio = main_video.duration;
    const video = document.createElement('video');
    video.src = main_video.src;
    video.addEventListener('loadedmetadata', function() {
        const randomTime = Math.random() * 100;
        video.currentTime = 5;
    });

    video.addEventListener('seeked', function() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/png');
        //video_overlay_img.src = dataURL;
    });







    var caption =  document.querySelectorAll('#video_wrapper #captions ul li')



    main_video.addEventListener('loadeddata',()=>{
    setInterval(()=>{
        let bufferedTime = main_video.buffered.end(0);
        let duration = main_video.duration;
        let width = (bufferedTime / duration) * 100;
        buffered_progress_bar.style.width = `${width}%`
        
    },500);
    })








    //paly video function
    function playVideo(){
    play_pause.innerHTML = "pause";
    play_pause2.innerHTML = "pause";
    play_pause.title = "pause(k)";
    main_video.play();
    video_player.classList.remove('paused');
    document.querySelector('#video_wrapper #video_overlay').style.display = 'none';
    $('#video_wrapper #video_status div').addClass('active');
    setTimeout(function() {
        $('#video_wrapper #video_status div').removeClass('active');
    },1000);

    }
    function pauseVideo(){
    play_pause.innerHTML = "play_arrow";
    play_pause2.innerHTML = "play_arrow";
    play_pause.title = "play(k)";
    video_player.classList.add('paused');
    main_video.pause();
    $('#video_wrapper #video_status div').addClass('active');
    setTimeout(function() {
        $('#video_wrapper #video_status div').removeClass('active');
    },1000);
    }
    play_pause.addEventListener('click',()=>{
    var isVideoPaused = video_player.classList.contains('paused');
    isVideoPaused ? playVideo() : pauseVideo();
    })
    video_status.addEventListener('click',()=>{
    var isVideoPaused = video_player.classList.contains('paused');
    isVideoPaused ? playVideo() : pauseVideo();
    })
    main_video.addEventListener('play',()=>{
    playVideo();
    })
    main_video.addEventListener('pause',()=>{
    pauseVideo();
    })



    //fast_rewind video function
    fast_rewind.addEventListener('click',()=>{
    main_video.currentTime -=10;
    document.querySelector('.duration_rewind.first').classList.add('active');
    setTimeout(function() {
        document.querySelector('.duration_rewind.first').classList.remove('active');
    },1000);
    })



    //fast_forward video function
    fast_forward.addEventListener('click',()=>{
    main_video.currentTime +=10;
    document.querySelector('.duration_rewind.first').classList.add('active');
    setTimeout(function() {
        document.querySelector('.duration_rewind.second').classList.remove('active');
    },1000);
    })


    //load video duration
    main_video.addEventListener('loadedmetadata',(e)=>{
    let videoDuration = e.target.duration;
    let totalSec = Math.floor(videoDuration % 60);
    let totalMin = Math.floor(videoDuration / 60);
    let totalhour = Math.floor(videoDuration / 3600);

    totalMin = totalMin - totalhour * 60;

    //if seconds are less than 10 then add 0 at the begning
    totalhour < 10 ? totalhour = '0' + totalhour : totalhour;
    totalSec < 10 ? totalSec = '0' + totalSec : totalSec;
    totalMin < 10 ? totalMin = '0' + totalMin : totalMin;

    if(totalhour >= 1){
        duration.innerHTML = `${totalhour}:${totalMin}:${totalSec}`;
        s_duration.innerHTML = `${totalhour}:${totalMin}:${totalSec}`;
    }
    else{
        duration.innerHTML = `${totalMin} : ${totalSec}`;
        s_duration.innerHTML = `${totalMin} : ${totalSec}`;
    }

    })



    //current video duration
    var currentVideoTime;
    main_video.addEventListener('timeupdate',(e)=>{
    if($('.timer').hasClass('reverse')){
        currentVideoTime = e.target.duration - e.target.currentTime;
    }
    else{
        currentVideoTime = e.target.currentTime;
    }
    let currentSec = Math.floor(currentVideoTime % 60);
    let currentMin = Math.floor(currentVideoTime / 60);
    let currenthour = Math.floor(currentVideoTime / 3600);
    currentMin = currentMin - currenthour * 60;

    //if seconds are less than 10 then add 0 at the begning
    currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
    currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
    currentMin < 10 ? currentMin = '0' + currentMin : currentMin;

    if(currenthour >= 1){
        current.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
        s_current.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
    }
    else{
        current.innerHTML = `${currentMin} : ${currentSec}`;
        s_current.innerHTML = `${currentMin} : ${currentSec}`;
    }

    //progressbar width change
    let videoDuration = e.target.duration;
    let progressWidth = (e.target.currentTime / videoDuration);
    progress_bar.style.width = `${progressWidth * 100}%`;
    s_progress_bar.style.width = `${progressWidth * 100}%`;


    let m = item.length * item[0].clientWidth;
    let ml = scrubbing_position.getBoundingClientRect().left - scrubbing_move.getBoundingClientRect().left;

    w = progressWidth *m;
    fine_scrubbing.style.marginLeft = `${ml-w}px`;

    })

    //let update playing video current time on according to the progress bar width
    progress_area.addEventListener('click',(e)=>{
    let videoDuration = main_video.duration;
    let progresswidthval = progress_area.clientWidth;
    let ClickOffsetX = e.offsetX;
    main_video.currentTime = (ClickOffsetX / progresswidthval) * videoDuration;




    })

    main_video.addEventListener('waiting',()=>{
    spinner.style.display = 'block';
    })
    main_video.addEventListener('canplay',()=>{
    spinner.style.display = 'none';
    })





    progress_area.addEventListener("pointerdown", (e) => {
    progress_area.setPointerCapture(e.pointerId);
    setTimelinePosition(e);
    progress_area.addEventListener("pointermove",setTimelinePosition);
    progress_area.addEventListener("pointerup",()=>{
        progress_area.removeEventListener("pointermove",setTimelinePosition);
    })
    });


    function setTimelinePosition(e) {
    let videoDuration = main_video.duration;
    let progressWidthval = progress_area.clientWidth + 2;
    let ClickOffsetX = e.offsetX;
    main_video.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;

    let progressWidth = (main_video.currentTime / videoDuration) * 100 + 0.5;
    progress_bar.style.width = `${progressWidth}%`;

    let progressTime = main_video.currentTime;
    let currentSec = Math.floor(progressTime % 60);
    let currentMin = Math.floor(progressTime / 60);
    let currenthour = Math.floor(progressTime / 3600);
    currentMin = currentMin - currenthour * 60;

    currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
    currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
    currentMin < 10 ? currentMin = '0' + currentMin : currentMin;

    if(currenthour >= 1){
        progressAreaTime.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
    }
    else{
        progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
    }


    }







    //change_volume
    volume_range.value = `${main_video.volume * 100}`;
    function changeVolume(){
    let value = volume_range.value;
    main_video.volume = value / 100;
    if(value == 0){
        volume.innerHTML='volume_off';
    }
    else if(value < 50){
        volume.innerHTML='volume_down';
    }
    else{
        volume.innerHTML='volume_up';
    }

    }
    volume_range.addEventListener('change',()=>{
    changeVolume()
    })


    function muteVolume(){
    let value = volume_range.value;
    if(value == 0){
        volume_range.value = 80;
        main_video.volume = 0.8;
        volume.innerHTML='volume_up';
    }
    else{
        volume_range.value = 0;
        volume.innerHTML='volume_off';
        main_video.volume = 0;
    }
    }

    volume.addEventListener('click',()=>{
    muteVolume()
    })



    //update progress area time and display block on mouse move 
    progress_area.addEventListener('mousemove',(e)=>{
    let progresswidthval = progress_area.clientWidth;
    let x = e.offsetX;

    let videoDuration = main_video.duration;
    let progressTime = Math.floor((x / progresswidthval) * videoDuration)

    let currentSec = Math.floor(progressTime % 60);
    let currentMin = Math.floor(progressTime / 60);
    let currenthour = Math.floor(progressTime / 3600);
    currentMin = currentMin - currenthour * 60;

    currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
    currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
    currentMin < 10 ? currentMin = '0' + currentMin : currentMin;

    if(currenthour >= 1){
        progressAreaTime.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
    }
    else{
        progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
    }

    if(x >= progresswidthval - 80){
        x = progresswidthval -80;
    }
    else if(x <= 75){
        x = 75;
    }
    else{
        x = e.offsetX;
    }

    progressAreaTime.style.setProperty('--x',`${x}px`);
    progressAreaTime.style.display ='block';

    })




    progress_area.addEventListener('mouseleave',()=>{
    progressAreaTime.style.display ='none';
    })




    //autoplay
    auto_play.addEventListener('click',()=>{
    auto_play.classList.toggle('active');
    if(auto_play.classList.contains('active')){
        auto_play.title = 'Autoplay is on';    }
        else{
            auto_play.title = 'Autoplay is off';
            
        }
    })


    main_video.addEventListener('ended',()=>{
        if(loop.classList.contains('active')){
            playVideo();
        }
        else{
            if(auto_play.classList.contains('active')){
                playVideo();
            }
            else{
                play_pause.innerHTML = 'replay';
                play_pause.title = 'replay';
                
            }
        }
    })

    // picture in picture
    let userAgent = navigator.userAgent;

    if(userAgent.match(/firefox|fxios/i)){
        picture_in_picture.style.display='none'
    }


    picture_in_picture.addEventListener('click',()=>{
        main_video.requestPictureInPicture();
    })

    fullscreen.addEventListener('click',()=>{
    fullScreen();
    })

    function fullScreen(){
    if(!video_player.classList.contains('openfullScreen')){
        video_player.classList.add('openfullScreen');
        fullscreen.innerHTML = 'fullscreen_exit';
        video_player.requestFullscreen();
    }
    else{
        video_player.classList.remove('openfullScreen');
        fullscreen.innerHTML = 'fullscreen';
        document.exitFullscreen();
    }
    }
    captionBTn.addEventListener('click',()=>{
    captionBTn.classList.toggle('active');
    captions.classList.toggle('active');
    if(settings.classList.contains('active')){
        settings.classList.toggle('active');
    }
    })



    function removeActiveClasses(e){
    e.forEach((event)=>{
        event.classList.remove('active')
    })

    }

    caption.forEach(event =>{
    event.addEventListener('click',()=>{
        removeActiveClasses(caption);
        event.classList.add('active');
        changeCaption(event) 
    })
    })

    var ttrack = main_video.textTracks;


    function changeCaption(label){
    let trackable = label.getAttribute('data-track')
    for(let i = 0; i < ttrack.length; i++){
        ttrack[i].mode = 'disabled';
        if(ttrack[i].label == trackable){
            ttrack[i].mode = 'showing';
        }
    }
    }   
    let caption_text = document.querySelector('#video_wrapper #video_player .caption_text');
    for(let i = 0; i < ttrack.length; i++){
    ttrack[i].addEventListener('cuechange',()=>{
        
        if(ttrack[i].mode === 'showing'){
            if(ttrack[i].activeCues[0]){
                caption_text.classList.add('active');
                let span = `<span><mark>${ttrack[i].activeCues[0].text}</mark> </span>`;
                caption_text.innerHTML = span;
            }
            else{
            caption_text.classList.remove('active');
            caption_text.innerHTML = '';
            
        }
    }
    })
    }

    settingsBTn.addEventListener('click',()=>{
    settingsBTn.classList.toggle('active');
    settings.classList.toggle('active');
    if(captions.classList.contains('active')){
        captions.classList.toggle('active');
    }
    })





    playback.forEach(event =>{
    event.addEventListener('click',()=>{
        removeActiveClasses(playback);
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        main_video.playbackRate = speed;
        settingsBTn.classList.toggle('active');
        settings.classList.toggle('active');
    })
    })


    const settingDivs = document.querySelectorAll('#video_wrapper #settings .parent');
    const settingBack = document.querySelectorAll('#video_wrapper #settings .back_setting');
    const quality_ul = document.querySelector("#video_wrapper #settings > [data-label='quality'] ul");
    const qualities = document.querySelectorAll("source[size]");



    qualities.forEach(event=>{
    let quality_html = `<li data-quality="${event.getAttribute('size')}">${event.getAttribute('size')}p</li>`;
    quality_ul.insertAdjacentHTML('afterbegin',quality_html);
    })
    const quality_li = document.querySelectorAll("#video_wrapper #settings > [data-label='quality'] ul li");



    quality_li.forEach((event)=>{
    event.addEventListener('click',(e)=>{
        let quality = e.target.getAttribute('data-quality');
        removeActiveClasses(quality_li);
        event.classList.add('active');
        qualities.forEach(event=>{
            if (event.getAttribute('size') == quality) {
                let video_current_duration = main_video.currentTime;
                let video_source = event.getAttribute('src');
                main_video.src = video_source;
                main_video.currentTime = video_current_duration;
                playVideo();
            }
        })
        settingsBTn.classList.toggle('active');
        settings.classList.toggle('active');
    

    })
    })
    settingBack.forEach((event)=>{
    event.addEventListener('click',(e)=>{
        let setting_label = e.target.getAttribute('data-label');
        for (let i = 0; i < settingDivs.length; i++) {
            if (settingDivs[i].getAttribute('data-label') == setting_label) {
                settingDivs[i].removeAttribute('hidden');
            }else{
                settingDivs[i].setAttribute('hidden',"");
            }
        }
    })
    })

    settingHome.forEach((event)=>{
    event.addEventListener('click',(e)=>{
        let setting_label = e.target.getAttribute('data-label');
        for (let i = 0; i < settingDivs.length; i++) {
            if (settingDivs[i].getAttribute('data-label') == setting_label) {
                settingDivs[i].removeAttribute('hidden');
            }else{
                settingDivs[i].setAttribute('hidden',"");
            }
        }
    })
    })


    function removeActiveDiv(e) {
    e.forEach((event) => {
        event.setAttribute("hidden",'');
    });
    }

    //store video duration and video path in local storage
    window.addEventListener('unload',()=>{
    let setDuration = localStorage.setItem('duration',`${main_video.currentTime}`);
    let setSrc = localStorage.setItem('src',`${main_video.getAttribute('src')}`);    
    })

    /*
    window.addEventListener('load',()=>{
    let getDuration = localStorage.getItem('duration');
    let getSrc = localStorage.getItem('src');
    if(getSrc){
        main_video.src = getSrc;
        main_video.currentTime = getDuration;
        
    }

    })
    */

    main_video.addEventListener('contexmenu',(e)=>{
    e.preventDefault()
    })

    //mousemove

    video_player.addEventListener('mouseover',()=>{
    controls.classList.add('active');
    })
    video_player.addEventListener('mouseleave',()=>{
    controls.classList.remove('active');
    })
    /*
    $(this).keypress(function(event) {
    if (event.keyCode == 75) {
        var isVideoPaused = video_player.classList.contains('paused');
        isVideoPaused ? playVideo() : pauseVideo();
    }
    else if(event.keyCode == 107) {
        var isVideoPaused = video_player.classList.contains('paused');
        isVideoPaused ? playVideo() : pauseVideo();
    }
    else if (event.keyCode == 105) {
        main_video.requestPictureInPicture();
    }
    else if (event.keyCode == 102) {
        fullScreen();
    }
    else if (event.keyCode == 109) {
        muteVolume();
    }
    })

    */
    window.addEventListener('keydown', function (e) {
    let key = e.key;
    if(key == 'm' || key == 'M'){
        muteVolume();
    }
    else if (key == 'f' || key == "F") {
        fullScreen();
    }
    else if (key == 'i' || key == "I") {
        main_video.requestPictureInPicture();
    }
    else if (key == 'k' || key == "K") {
        var isVideoPaused = video_player.classList.contains('paused');
        isVideoPaused ? playVideo() : pauseVideo();
    }
    else if (key == ' ') {
        var isVideoPaused = video_player.classList.contains('paused');
        isVideoPaused ? playVideo() : pauseVideo();
    }
    else if (key == 0) {
    main_video.currentTime = 0;
    }
    else if (key == 'ArrowRight') {
        main_video.currentTime +=10;
        //alert('ok');
        $('#video_wrapper .duration_rewind.second').addClass('active');
        setTimeout(function() {
            $('#video_wrapper .duration_rewind.second').removeClass('active');
        },1500);  
    }
    else if (key == 'ArrowLeft') {
        main_video.currentTime -=10;
        //alert('ok');
        
        $('#video_wrapper .duration_rewind.first').addClass('active');
        setTimeout(function() {
            $('#video_wrapper .duration_rewind.first').removeClass('active');
        },1500);  
    }
    else if (key == 'ArrowDown') {
        let v =  parseInt(volume_range.value);
        if(v >= 6){
            v -= 5;
        }
        else if(v <= 5 && v > 0){
            v = 0;
        }
        else{
            v = v;
        }
        //volume_range.value = `${main_video.volume * 100}`;
        volume_range.value = `${v}`;
        changeVolume();
        
        
        v = v < 10 ?  '0'+v : v;
        $('#video_wrapper .volume_percentage').html(`${v}%`)
        $('#video_wrapper .volume_level').addClass('active');
        setTimeout(function() {
            $('#video_wrapper .volume_level').removeClass('active');
        },1000);
        
        
    }
    else if (key == 'ArrowUp') {
        let v =  parseInt(volume_range.value);
        if(v < 96){
            v += 5;
        }
        else if(v >= 96 && v < 100){
            v = 100;
        }
        else{
            v = v;
        }
        //volume_range.value = `${main_video.volume * 100}`;
        volume_range.value = `${v}`;
        changeVolume();
        
        
        
        v = v < 10 ?  '0'+v : v;
        $('#video_wrapper .volume_percentage').html(`${v}%`)
        $('#video_wrapper .volume_level').addClass('active');
        setTimeout(function() {
            $('#video_wrapper .volume_level').removeClass('active');
        },1000);  }


    //alert(key)

    }, false)








    /*






    //If you want to show your video thumbnail on progress Bar hover then comment out the following code. Make sure that you are using video from same domain where you hosted your webpage.
    // Video Preview
    var thumbnails = [];
    var thumbnailWidth = 158;
    var thumbnailHeight = 90;
    var horizontalItemCount = 5;
    var verticalItemCount = 5;
    let preview_video = document.createElement('video')
    preview_video.preload = "metadata";
    preview_video.width = "500";
    preview_video.height = "300"
    preview_video.controls = true;
    preview_video.src = main_video.querySelector("source").src;
    preview_video.addEventListener("loadeddata", async function () {
    //
    preview_video.pause();
    //
    var count = 1;
    //
    var id = 1;
    //
    var x = 0,
    y = 0;
    //
    var array = [];
    var duration = parseInt(preview_video.duration);
    //
    //
    for (var i = 1; i <= duration; i++) {
        array.push(i);
    }
    //
    var canvas;
    //
    var i, j;
    for (i = 0, j = array.length; i < j; i += horizontalItemCount) {
    //
    for (var startIndex of array.slice(i, i + horizontalItemCount)) {
    //
    var backgroundPositionX = x * thumbnailWidth;
    //
    var backgroundPositionY = y * thumbnailHeight;
    //
    var item = thumbnails.find((x) => x.id === id);
    
    
    if (!item) {
        //
        //
        canvas = document.createElement("canvas");
        //
        canvas.width = thumbnailWidth * horizontalItemCount;
        canvas.height = thumbnailHeight * verticalItemCount;
        //
        thumbnails.push({
            id: id,
            canvas: canvas,
            sec: [
                {
                    index: startIndex,
                    backgroundPositionX: -backgroundPositionX,
                    backgroundPositionY: -backgroundPositionY,
                },
            ],
        });
    } else {
        //
        //
        canvas = item.canvas;
        //
        item.sec.push({
            index: startIndex,
            backgroundPositionX: -backgroundPositionX,
            backgroundPositionY: -backgroundPositionY,
            });
        }
    //
    var context = canvas.getContext("2d");
    //
    preview_video.currentTime = startIndex;
    //
    await new Promise(function (resolve) {
        var event = function () {
        //
        context.drawImage(
            preview_video,
            backgroundPositionX,
            backgroundPositionY,
            thumbnailWidth,
            thumbnailHeight
        );
        //
        x++;
        // removing duplicate events
        preview_video.removeEventListener("canplay", event);
        //
        resolve();
        };
        //
        preview_video.addEventListener("canplay", event);
    });
    // 1 thumbnail is generated completely
    count++;
    }
    // reset x coordinate
    x = 0;
    // increase y coordinate
    y++;
    // checking for overflow
    if (count > horizontalItemCount * verticalItemCount) {
        //
        count = 1;
        //
        x = 0;
        //
        y = 0;
        //
        id++;
    }
    }
    // looping through thumbnail list to update thumbnail
    thumbnails.forEach(function (item) {
    // converting canvas to blob to get short url
    item.canvas.toBlob((blob) => (item.data = URL.createObjectURL(blob)), "image/jpeg");
    // deleting unused property
    delete item.canvas;
    });

    });

    progress_area.addEventListener('mousemove',(e)=>{
    let progresswidthval = progress_area.clientWidth;
    let x = e.offsetX;
    let videoDuration = main_video.duration;
    let progressTime = Math.floor((x / progresswidthval) * videoDuration);


    if(x >= progresswidthval - 80){
        x = progresswidthval -80;
    }
    else if(x <= 75){
        x = 75;
    }
    else{
        x = e.offsetX;
    }

    thumbnail.style.setProperty('--x',`${x}px`);
    thumbnail.style.display ='block';



    for (var item of thumbnails) {
        
        var data = item.sec.find(x1 => x1.index === Math.floor(progressTime));
        
        if (data) {
            if (item.data != undefined) {
                thumbnail.setAttribute("style", `background-image: url(${item.data});background-position-x: ${data.backgroundPositionX}px;background-position-y: ${data.backgroundPositionY}px;--x: ${x}px;display: block;`)
                return;
            }
        }
    }



    })


    progress_area.addEventListener('mouseleave',()=>{
    thumbnail.style.display ='none';
    })

    */
    let h_first;
    s_progress_area.addEventListener("mousedown", (e) => {
    h_first = e.offsetY;
    img_container.addEventListener("mousemove",scrubbing_hidder);
    img_container.addEventListener("mouseleave",()=>{
        img_container.removeEventListener("mousemove",scrubbing_hidder);
    })
    });

    function scrubbing_hidder(e){
    if(e.offsetY-h_first > 5){
        scrubbing_wrapper.classList.remove("active");
        scrubbing_timer.classList.remove("active");
        img_container.removeEventListener("mousemove",scrubbing_hidder);
    }
    }


    let s_first;
    controls.addEventListener("mousemove",(e)=>{
    s_first = controls.getBoundingClientRect().bottom;
    if(s_first - e.pageY < 10){
        controls.style.cursor = "row-resize";
    }
    else{
        controls.style.cursor = "auto";
    }
    })




    let startY = 0;
    let endY = 0;
    let threshold = 50; 
    video_player.addEventListener('mousedown', function(e) {
        startY = e.clientY;
    });
    
    video_player.addEventListener('mousemove', function(e) {
        endY = e.clientY;
    });
    
    video_player.addEventListener('mouseup', function() {
        if (startY - endY > threshold) {
            scrubbing_wrapper.classList.add("active");
            scrubbing_timer.classList.add("active");
            pauseVideo();
            startY = 0;
            endY = 0;
        }

    });
   startY = 0;
    endY = 0;
    let isDragging = false;

    video_player.addEventListener('mousedown', function(e) {
        startY = e.clientY;
        isDragging = true;
    }, false);

    video_player.addEventListener('mousemove', function(e) {
        if (isDragging) {
            endY = e.clientY;
        }
    }, false);

    video_player.addEventListener('mouseup', function(e) {
        if (isDragging) {
            if (endY > startY) {
                scrubbing_wrapper.classList.remove("active");
                scrubbing_timer.classList.remove("active");
                playVideo()
            }
            startY = 0;
            endY = 0;
            isDragging = false;
        }
    }, false);




/*

    controls.addEventListener("mousedown", (e) => {
    if(s_first-e.pageY < 10){
        controls.addEventListener("mousemove",scrubbing_shower);
        scrubbing_shower(e);
    }
    controls.addEventListener("mouseleave",()=>{
        controls.removeEventListener("mousemove",scrubbing_shower);
    })
    });

    function scrubbing_shower(e){
    if(s_first- e.pageY > 2){
        scrubbing_wrapper.classList.add("active");
        scrubbing_timer.classList.add("active");
        controls.removeEventListener("mousemove",scrubbing_shower);
    }
    }
//**/








    scrubbing_move.addEventListener("pointerdown",(e)=>{
    x = e.offsetX;
    scrubbing_move.addEventListener("pointermove",scrubbing);
    scrubbing_move.addEventListener("pointerup",()=>{
        scrubbing_move.removeEventListener("pointermove",scrubbing);
    })

    })
    function scrubbing(e){
    y= e.offsetX;
    z = x-y;
    x = y;
    let m = item.length * item[0].clientWidth;
    let n = z/scrubbing_move.clientWidth
    let ml = scrubbing_position.getBoundingClientRect().left - scrubbing_move.getBoundingClientRect().left;
    if(w > 0 && w < m){
        w += m*n;
        fine_scrubbing.style.marginLeft = `${ml-w}px`;
        main_video.currentTime = (w/m)*main_video.duration;
    }
    else if(w < 0){
        w = 1;
    }
    else if(w > m){
        w = m-50;
    }
    }
    $("#moment p").click(function(e){
    let val = parseInt($(this).closest('li').find('.time').val());
    document.querySelector('#video_wrapper #main_video').currentTime = val;
    });

    /** */

    $(document).ready(function() {
    $("#video_player").on('contextmenu', function(e) {
    e.preventDefault();
    $('#custom_dialog').css({
        top: e.clientY - 30,
        left: e.clientX - 50
    }).show();
    });

    $(document).on('click', function() {
    $('#custom_dialog').hide();
    });

    $('#custom_dialog').on('click', function(e) {
    e.stopPropagation();
    });

    $('.close_dialog').on('click', function() {
    $('#custom_dialog').hide();
    });
    $('#custom_dialog li').on('click', function() {
        $('#custom_dialog').hide();
    })
    $('#custom_dialog li#loop').on('click', function() {
    $(this).toggleClass('active');
    });
    $('#custom_dialog li#copylink').on('click', function() {
        var currentUrl = window.location.href;
        if (currentUrl.includes('&t=')) {
            var newUrl = currentUrl.replace(/&t=\d+/g, '');
            var tempInput = $('<input>');
            $('body').append(tempInput);
            tempInput.val(newUrl).select();
            document.execCommand('copy');
            tempInput.remove();
        }
    });
    $('#custom_dialog li#copylinkWithTime').on('click', function() {
            var tempInput = $('<input>');
            $('body').append(tempInput);
            tempInput.val(window.location.href).select();
            document.execCommand('copy');
            tempInput.remove();
        
    });
    $('#custom_dialog li#copyDebugInfo').on('click', function() {
        var videoElement = $('#main_video')[0];
        if (videoElement) {
            // Create an object to store debug information
            var debugInfo = {
            currentTime: videoElement.currentTime,
            duration: videoElement.duration,
            paused: videoElement.paused,
            muted: videoElement.muted,
            volume: videoElement.volume,
            networkState: videoElement.networkState,
            readyState: videoElement.readyState
            // Add more properties as needed
            };
            
            var tempInput = $('<input>');
            $('body').append(tempInput);
            tempInput.val(JSON.stringify(debugInfo, null, 2)).select();
            document.execCommand('copy');
            tempInput.remove();
        }
        
    });




    });
}







$(document).ready(function() {
    var list = document.querySelector(".sidebar .list");
    const data = list.innerHTML;
    for(let i=0;i<10;i++){
        list.innerHTML += data;
    }
    const videoRow =  document.querySelectorAll(".list a");
    for(let i=0;i<videoRow.length;i++){
        const item = videoRow[i];
        const title = item.querySelector(".title");
        const views = item.querySelector(".views");
        const posted_dt = item.querySelector(".posted_dt");

        title.innerHTML = shortenText(title.innerHTML,60);
        views.innerHTML = formatNumber(Math.floor(Math.random() * 1e9) + 1);

        const randomDate = getRandomDateWithinTwoYears();
        const timeDifference = timeDifferenceToNow(randomDate);
        posted_dt.innerHTML = timeDifference;

    }


})
$(document).ready(function() {
    $('#comment_section .sort-btn').on('click', function() {
        $("#comment_section .dropdown-menu").toggleClass('visible');
    });
    $("#comment_section .dropdown-menu").on('click', function() {
        $(this).toggleClass('visible');
    });

    var commentArea = document.querySelector(".comment_show");
    var data = commentArea.innerHTML;
    var  total_comment = Math.floor(Math.random() * 10) + 1;
    for(let i=0;i<total_comment;i++){
        commentArea.innerHTML += data;
    }
    document.querySelector(".total_comment").innerHTML = total_comment+1;

    var commentRow = document.querySelectorAll(".commentRow");
    for(let i=0;i<commentRow.length;i++){
        const item = commentRow[i];
        const reply_box_show = item.querySelector(".reply_box_show");
        const reply_box = item.querySelector(".reply-box");
        const replyShowBtn = item.querySelector(".replyShowBtn");
        const reply_show = item.querySelector(".reply_show");
        const total_reply = item.querySelector(".total_reply");
        const comment_replies = item.querySelector(".comment-replies");

    


        item.querySelector(".like").innerHTML = Math.floor(Math.random() * 10000) + 1;
        item.querySelector(".dislike").innerHTML = Math.floor(Math.random() * 10000) + 1;
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        total_reply.innerHTML = randomNumber+1;

        const dt = comment_replies.innerHTML;
        for(let i=0;i<randomNumber;i++){
            comment_replies.innerHTML +=dt;
        }



        reply_box_show.addEventListener('click',()=>{
            reply_box.classList.toggle("visible")
        })
        replyShowBtn.addEventListener('click',()=>{
            replyShowBtn.classList.toggle("visible")
            reply_show.classList.toggle("visible")
        })

    }

    var commentTime = document.querySelectorAll(".commentTime");
    for(let i=0;i<commentTime.length;i++){
        const randomDate = getRandomDateWithinTwoYears();
        const timeDifference = timeDifferenceToNow(randomDate);
        commentTime[i].innerHTML = timeDifference;
    }

});
