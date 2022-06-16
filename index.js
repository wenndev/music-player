const disappearBtn  = document.querySelector('.button-pause').style.display = 'none'; 

let musics = [ 
    {title:'Bullet From A Gun', artist:'Skepta', src:'music/bullet-from-a-gun.mp3',img:'images/ignorance-is-a-bliss.jpg'},
    {title:'Ying Yang', artist:'Febem, Fleezus, CESRV',src:'music/cesrv-ft-fleezus-and-febem.mp3',img:'images/brime.jpg'},
    {title:'Thats Not Me', artist: 'Skepta, Jme',src:'music/thats-not-me.mp3', img:'images/thats-not-me.jpg'}
];

let music = document.querySelector('audio'); 
let image = document.querySelector('img');
let nameMusic = document.querySelector('.description h2'); 
let nameArtist = document.querySelector('.description h3'); 
let indexMusic = 0; 

let durationEndMusic = document.querySelector('.end'); 
renderMusic(indexMusic);

// Events
document.querySelector('.button-play').addEventListener('click',playMusic); 
document.querySelector('.button-pause').addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', updateBar); 

document.querySelector('.previous').addEventListener('click', () => {  
    indexMusic--;
    if(indexMusic < 0) { 
        indexMusic = 2;
    }
    renderMusic(indexMusic); 
});

document.querySelector('.next').addEventListener('click', () => {  ;
    indexMusic++;
    if(indexMusic > 2) { 
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

// Functions 
function renderMusic(index) {
    music.setAttribute('src', musics[index].src); 
    music.addEventListener('loadeddata', () => { 
        nameMusic.textContent = musics[index].title; 
        nameArtist.textContent = musics[index].artist; 
        image.src = musics[index].img; 
        durationEndMusic.textContent = secondsToMinutes(Math.floor(music.duration)); 
        music.play();
    });
}

function playMusic() {
    music.play();
    document.querySelector('.button-play').style.display = 'none'; 
    document.querySelector('.button-pause').style.display = 'block';
}
function pauseMusic() {
    music.pause();
    document.querySelector('.button-play').style.display = 'block'; 
    document.querySelector('.button-pause').style.display = 'none'; 
}
function updateBar() { 
    let bar = document.querySelector('progress');
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%'; 
    let elapsedTime = document.querySelector('.start'); 
    elapsedTime.textContent =  secondsToMinutes(Math.floor(music.currentTime));
}
function secondsToMinutes(seconds) {
    let minuteField = Math.floor(seconds / 60); 
    let secondsField = seconds % 60;    
    
    if(secondsField < 10){
        secondsField = '0' + secondsField; 
    }
    return minuteField + ':' + secondsField;
}

