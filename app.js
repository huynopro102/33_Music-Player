/**
 * 1 render songs : render các bài hát vô phần playlist
 * 2 scroll top : kéo lên bao nhiêu thu nhỏ lại bấy nhiêu 
 * kéo xuống bao nhiêu phóng lớn ra bấy nhiêu
 * 3 play / pause / seek
 * 4 cd rotate
 * 5 next / prev
 * 6 random
 * 7 next / repeat when ended
 * 8 active song 
 * 9 scroll active song into view
 * 10 play song when click
 */
const player = document.querySelector('.player')
const cd = document.querySelector('.cd')
const heading = document.querySelector('header h2')
const CdThumb = document.querySelector('.cd-thumb ')
const audio = document.querySelector('#audio')
const playbtn = document.querySelector('.btn-toggle-play')
const progress = document.querySelector('.progress')
const nextbtn = document.querySelector('.btn-next')
const prevbtn = document.querySelector('.btn-prev')
const randombtn = document.querySelector('.btn-random')
const repectbtn = document.querySelector('.btn-repeat')
console.log(repectbtn)

const app = {
    CurrentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat:false , 
    songs: [
        {
            name: '24h',
            singer: 'lyly',
            path: './music/24H _ OFFICIAL MUSIC VIDEO _  LYLY ft MAGAZINE.mp3',
            image: './images/24h.jpg'
        },
        {
            name: 'hymn for the weeked',
            singer: 'the British rock band Coldplay',
            path: './music/Coldplay -  Hymn For The Weekend (Live at The BRIT Awards 2016).mp3',
            image: './images/hymn_for_the_weeked.jpg'
        },
        {
            name: 'anh đất cần gì nhiều ngoài em',
            singer: 'đen vâu',
            path: './music/Đen - Anh Đếch Cần Gì Nhiều Ngoài Em ft. Vũ., Thành Đồng (M-V).mp3',
            image: './images/anh_dat_can_gi_nhieu_ngoai_em.jpg'
        },
        {
            name: 'diễn viên tồi',
            singer: 'đen vâu',
            path: './music/Đen - Diễn viên tồi ft. Thành Bùi, Cadillac (M-V).mp3',
            image: './images/dien_vien_toi.jpg'
        },
        {
            name: 'trốn tìm',
            singer: 'đen vâu',
            path: './music/Đen - Trốn Tìm ft. MTV band (M-V).mp3',
            image: './images/tron_tim.jpg'
        },
        {
            name: 'phố cũ còn anh',
            singer: 'Quinn ft Chilly',
            path: './music/Phố Cũ Còn Anh (Freak D Lofi Ver.) - Quinn ft Chilly.mp3',
            image: './images/pho_cu_con_anh.jpg'
        },
        {
            name: 'anh đất cần gì nhiều ngoài em',
            singer: 'đen vâu',
            path: './music/Đen - Anh Đếch Cần Gì Nhiều Ngoài Em ft. Vũ., Thành Đồng (M-V).mp3',
            image: './images/anh_dat_can_gi_nhieu_ngoai_em.jpg'
        },
        {
            name: '2 triệu năm',
            singer: 'đen vâu',
            path: './music/y2meta.com - Đen - hai triệu năm ft. Biên (m_v) (320 kbps).mp3',
            image: './images/2_trieu_nam.jpg'
        },
        {
            name: 'yêu là thu thứ',
            singer: 'Only C',
            path: './music/Yêu Là _Tha Thu_ _ Only C _ Em Chưa 18 OST _ Official Music Video.mp3',
            image: './images/yeu_la_tha_thu.jpeg'
        },
      
      
      
    ],

    render: function () {
        const htmls = this.songs.map(function (song, index) {
            return `
            <div class="song ${index === this.CurrentIndex ? 'active' : '' } ">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        document.querySelector('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'CurrentSongs', {
            get: function () {
                return this.songs[this.CurrentIndex]
            }
        })
    },

    handleEvents: function () {
        const _this = this

        // xu ly cd quay va dung
        const cdthumbanimate =  CdThumb.animate([
            { transform:'rotate(360deg)'}
        ],{
            // quy như thế nào 
            duration:10000 , // 10 seconds
            iterations: Infinity ,

        })
        cdthumbanimate.pause()

        // xu ly phong to thu nho cd
        const widthcd = cd.offsetWidth
        document.onscroll = function () {
            const scrolltop = document.documentElement.scrollTop
            const widthnew = widthcd - scrolltop
            cd.style.width = widthnew > 0 ? widthnew + 'px' : 0
            cd.style.opacity = widthnew / widthcd
        }

        // xu ly khi click play
        playbtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // khi bai hat dc play 
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdthumbanimate.play()

        }
        // khi song bi pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdthumbanimate.pause()
        } 

        // khi tien do bai  hat thay doi
        // khi nghe xem ở 1 nơi events , còn lấy giá trị thì xem ở properties , còn 1 hành động thì xem ở method

        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = audio.currentTime/audio.duration*100
                progress.value = progressPercent
            }
           
        }

        // xu ly khi tua song
        progress.onchange = function(e){        
            const seekTime = audio.duration/ 100 * e.target.value
            audio.currentTime = seekTime
        }

        // click btnNext
        nextbtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
        }
        
        // click btnprev
        prevbtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
        }

        // click random / bat tat
        randombtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            randombtn.classList.toggle("active",_this.isRandom)
  
        }
         

        // xử lý khi audio ended
        audio.onended = function(){
            if(repectbtn){
                audio.play()
            }else{

                nextbtn.click()
            }
            // chức năng chánh lặp lại các bài hát
            
        }

        // xử lý lặp lại 1 bài hát
        repectbtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat
            repectbtn.classList.toggle("active",_this.isRepeat)
        }

    },

    loadCurrentSong: function () {
        heading.textContent = this.CurrentSongs.name
        CdThumb.style.backgroundImage = `url('${this.CurrentSongs.image}')`
        audio.src = this.CurrentSongs.path

    },

    nextSong: function(){
        this.CurrentIndex ++
        if(this.CurrentIndex >= this.songs.length){
            this.CurrentIndex = 0 
        }
        this.loadCurrentSong()
    }  ,
    prevSong: function(){
        this.CurrentIndex --
        if(this.CurrentIndex < 0){
            this.CurrentIndex = this.songs.length -1
            console.log(current)
        }
        this.loadCurrentSong()
    }  ,

    playRandomSong: function(){
        let newIndex
        // 4 0.1 =
        do{
            newIndex =  Math.floor( Math.random()* this.songs.length)
        }while(newIndex === this.CurrentIndex  )
        this.CurrentIndex = newIndex
        this.loadCurrentSong()
    } ,
 
    start: function () {
        // dinh nghia cac object
        this.defineProperties()

        // xu ly cac su kien dom event
        this.handleEvents()

        // tai cac thong tin dau tien vaof ui khi chay ung dung
        this.loadCurrentSong()

        // render playlist
        this.render()

    },
}


app.start()

console.log( (4*0.2)*10 )







