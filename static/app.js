

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