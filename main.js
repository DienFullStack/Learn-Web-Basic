const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listSong = $('.content-trending-list');
const songThumb = $('.play-song-thumbnail')
const playPause = $('.btn-play-pause');
const audio = $('#audio');
const nameSongNowPlaying = $('.play-song-name');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const progress = $('.progress');
const repeat = $('.btn-repeat');
const random = $('.btn-random');
const choseSong =$('.row.content-trending-item');
const controlVolume = $('.progress-volume');
const like = $('.content-trending-icon');
const navRotate = $('.nav-plate');

console.log(navRotate)
const app = {
    isActive: true,
    isRepeat:true,
    isRandom: true,
    isLike: true,
    currentIndex: 0,
    songs:[
        {
            name:'Gió',
            singer:'Lank',
            path:'/accsset/music/gio_jank_cukak_remix_audio_lyrics_video_-546214312137363447.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Lần cuối',
            singer:'Hoàng Dũng',
            path:'/accsset/music/lan_cuoi_ngot_cover_hoang_dung_live_session_ep_4_6974416124593753393.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Chờ anh nhé',
            singer:'Hoàng Dũng',
            path:'/accsset/music/cho_anh_nhe_hoang_dung_live_session_ep_10_JOhHBXMByoK-gucZG1Zg.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Chẳng nói nên lời',
            singer:'Hoàng Dũng',
            path:'/accsset/music/chang_noi_nen_loi_acoustic_session_hoang_dung_216787327102221905.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Tay To',
            singer:'MCK',
            path:'/accsset/music/rapitalove_ep_tay_to_rpt_mck_x_rpt_phongkhin_prod_by_rpt_phongkhin_official_lyric_video_-3920999942974879989.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Nếu ngày ấy',
            singer:'Soobin Hoàng Sơn',
            path:'/accsset/music/neu_ngay_ay_soobin_hoang_son_official_lyric_video_-2580391395076596408.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Yêu là tha thu',
            singer:'Only-C',
            path:'/accsset/music/yeu_la_tha_thu_only_c_em_chua_18_ost_official_music_video_1762128324600973498.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
        {
            name:'Suýt nữa thì',
            singer:'Andiez',
            path:'/accsset/music/suyt_nua_thi_andiez_in_the_moonlight_show_3004952811225257933.mp3',
            image:'/accsset/img/noo-banner.jpg',
            view: '1234567',
            timeDuration: '',
        },
    ],
    

    handlEvent: function(){
        listSong.onclick = function(e) {
            const songElement = e.target.closest('.content-trending-item:not(.active)')
                if(!e.target.closest('.content-trending-infor-option') && songElement){
                    app.currentIndex = Number(songElement.getAttribute('data-index'))
                    app.loadCurrentSong();
                    app.render();
                    audio.play();
                }
            const likeElement = e.target.closest('.content-trending-icon')
            if(likeElement){
                if(!app.isLike){
                    app.isLike = true;
                    e.target.classList.remove('active');
                }else{
                    app.isLike = false;
                    e.target.classList.add('active');
                }
                
            }
                // console.log(!)
                // console.log(!e.target.closest('.content-trending-interact-time'))

          };
        // xử lý thumnail xoay tròn
        const songPlay = songThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity,
            delay: 500,
        })

        songPlay.pause();
        
        // xử lý thumnail xoay tròn
        const rotate = navRotate.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 1000,
            iterations: Infinity,
        })
        // add class active cho btn-play-pause
        playPause.onclick = function(){
            if(app.isActive){
                audio.play();
            }else{
                audio.pause();        
            }
            app.render();
        }

        audio.onplay = function(){
            app.isActive = false;
            playPause.classList.add('active');
            songPlay.play();
        }

        audio.onpause = function(){
            app.isActive = true;
            playPause.classList.remove('active');
            songPlay.pause();
        }

        // next song
        nextBtn.onclick = function(){
           
            if(!app.isRandom){
                app.playRandomSong();
            }else{
                app.nextSong()
            }
            app.render();
            audio.play(); 
            app.scrollToActiveView();
        }

        // prev song
        prevBtn.onclick = function(){
            if(!app.isRandom){
                app.playRandomSong();
            }else{
                app.prevSong();
            }
            app.render();
            audio.play(); 
            app.scrollToActiveView();
        }

        // seek audio
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor((audio.currentTime / audio.duration)*100);
                progress.value = progressPercent;
            }
        }

        progress.oninput = function(e){
            const currentValueProgress = e.target.value;
            audio.currentTime = (currentValueProgress / 100)*audio.duration;
        }

        // repeat song
        repeat.onclick = function(){
            if(app.isRepeat){
                app.isRepeat = false;
                repeat.classList.add('action');
            }else{
                app.isRepeat = true;
                repeat.classList.remove('action');
            }
        }

        audio.onended = function(){
            if(!app.isRepeat){
                audio.play();
            }else{
                if(!app.isRandom){
                    app.playRandomSong();
                    audio.play();
                }else{
                    app.nextSong();
                    audio.play();
                }
            }
        }

        // random song
        random.onclick = function(){
            if(app.isRandom){
                app.isRandom = false;
                random.classList.add('action');
            }else{
                app.isRandom = true;
                random.classList.remove('action');
            }
        }
        
        // control volume
        controlVolume.oninput = function(){
            const changeVolume = (controlVolume.value / 100);
            audio.volume = changeVolume;
        }
    },
    

    render: function(){
        this.currentTimeSong();
        const htmls = app.songs.map((song, index) =>{
           return  `<li class="content-trending-item row ${(index == app.currentIndex) ? 'active' : ''}" data-index = ${index}>
                <p class="content-trending-num col l-1">${index+1}</p>
                <div class="content-trending-thumb col l-1" style = "background-image: url('${song.image}')">
                </div>
                <div class="content-trending-infor col l-4">
                    <h3 class="content-trending-infor-name">${song.name}</h3>
                    <div class="content-trending-singger">${song.singer}</div>
                </div>
                    <p class="content-trending-interact-time col l-2">${song.timeDuration}</p>
                    <p class="content-trending-interact-view col l-2">${song.view}</p>
                    
                <div class="content-trending-infor-option col l-2">
                    <i class="fa-regular fa-heart content-trending-icon"></i>
                    <i class="fa-regular fa-ellipsis content-trending-icon_2"></i>
                </div>
            </li>`
        })
        listSong.innerHTML = htmls.join('');
    },

    defineProperty: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            },
        })
    },

    loadCurrentSong: function(){
        nameSongNowPlaying.innerHTML = `${this.currentSong.name}`;
        songThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = `${this.currentSong.path}`
    },

    nextSong: function(){
        this.currentIndex++;
        if((this.currentIndex >= this.songs.length)){
            this.currentIndex = 0;
        }
        app.loadCurrentSong();
    },

    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }

        app.loadCurrentSong();
    },

    playRandomSong: function(){
        let randomIndex; 
        do{
            randomIndex = Math.floor(Math.random()*this.songs.length);
        }while(randomIndex === app.currentIndex);

        app.currentIndex = randomIndex;

        this.loadCurrentSong();
    },

    scrollToActiveView: function(){
        setTimeout(() =>{
            $('.content-trending-item.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        },300)
    },

    currentTimeSong: function(){
        audio.onloadedmetadata = function() {
            app.songs[app.currentIndex].timeDuration = `${(Math.floor(audio.duration / 60) >10) ?Math.floor(audio.duration / 60) :`0${Math.floor(audio.duration / 60)}` }:${Math.floor((audio.duration % 60))}`;
        };
    },

    start: function(){
        

        this.defineProperty();

        this.loadCurrentSong();

        this.handlEvent();

        this.render();
    }
}

app.start();