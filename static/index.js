// TODO: follow svg path ?? oppure zoom out


history.replaceState({},'',location.pathname); // at refresh/enter clean the url path

let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')

function getOffset(el) { // get bounbdaries svg
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX + 'px',
        top: rect.top + window.scrollY+ 'px'
    };
}

// map position contents
let positions = []

let spacePoints = document.querySelectorAll('circle')
spacePoints.forEach(point => {
    positions.push(getOffset(point))
});

let projects = document.querySelectorAll('.project')

let i = 0
projects.forEach(project =>{
    project.style.top = positions[i].top
        project.style.left = positions[i].left
        i++
})



// when move the mouse/touch the screen, appear contents
window.addEventListener('wheel', () =>{ 
    menuButton.classList.add('animate__fadeIn')
    menuButton.style.opacity = '100%'
    document.querySelector('#up').style.opacity = '100%'
    document.querySelector('.animate__animated').classList.add('animate__fadeIn')
})

window.addEventListener('touchstart', () =>{
    menuButton.classList.add('animate__fadeIn')
    menuButton.style.opacity = '100%'
    document.querySelector('#up').style.opacity = '100%'
    document.querySelector('.animate__animated').classList.add('animate__fadeIn')
})

// toggle menu
function closeMenu(){
    if(menu.style.display === 'block'){
        menu.style.display = 'none'
        menuButton.src = "/static/assets/hamburger.svg"
    } else {
        menu.style.display = 'block'
        menuButton.src = "/static/assets/deburger.svg"
    }
}

menuButton.addEventListener('click', function(){
    closeMenu()
})

// center page, focus on logo
function callLogo(){
    document.querySelector('#animatedLogo').scrollIntoView({behavior: 'auto',block: 'center'})
}
callLogo()

document.querySelector('#up').addEventListener('click', () =>{
    callLogo()
})


// gallery
var swiper = new Swiper(".mySwiper", {
//   direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
});


    