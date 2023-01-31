

function toggleDiv(bool,button,div){
    let toOpen = document.getElementById(div)
    document.getElementById(button).addEventListener('click', function(){
        
              if (bool == 0) {
                toOpen.classList.remove("animate__slideOutUp");
                toOpen.classList.add("animate__slideInDown");
                toOpen.style.display = 'block'
                bool++
                console.log(bool)
            } else {
                toOpen.classList.remove("animate__slideInDown");
                 toOpen.classList.add("animate__slideOutUp");
                setTimeout(() => {
                     toOpen.style.display = 'none'
                }, 1200);
                bool--
                console.log(bool)
               }

      })
}


let viewportHeight = window.innerHeight;
document.querySelector('.title').addEventListener('click', function(){
    window.scrollBy(0,viewportHeight)
})


 






let toggleInfo = 0
toggleDiv(toggleInfo,'infoButton','info')

document.querySelector('#logo').addEventListener('click',function(){
    document.querySelector('#logo').classList.add('animate__heartBeat')
    setInterval(() => {
    document.querySelector('#logo').classList.remove('animate__heartBeat')
    }, 800);
})

// var scene = document.querySelector('#logo')
// var parallaxInstance = new Parallax(scene);









//   document.getElementById('two').addEventListener('click',function(){
            
       
// let motion_path = anime.path('#path');
// anime({
//     targets: 'body',
//     translateX: motion_path('x'),
//     translateY: motion_path('y'),
//     rotate: motion_path('angle'),
//     easing: 'linear',
//     duration: 5000,
//     loop: false,
// });
//  document.querySelector('.test').scrollIntoView({behavior: "smooth"});
//   })



