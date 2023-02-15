let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')
let changeTheme = document.getElementById('changeTheme')
let cssRoot = document.querySelector(':root');
let projects = document.querySelectorAll('.project')

history.replaceState({},'',location.pathname); // at refresh/enter clean the url path

let logo = document.getElementById("animatedLogo")
// check theme
if (localStorage.length == 0) {
    localStorage.setItem("dark", "y")
}

dark()



// change theme

function changeThemeFunction(){
    if (localStorage.getItem("dark")) {
        localStorage.removeItem("dark")
        localStorage.setItem("lig", 'y')
    }else {
        localStorage.removeItem("lig")
        localStorage.setItem("dark", "y")
    }
    dark()
}

function dark(){
    if (localStorage.getItem("dark")) {
            logo.src="../static/assets/whiteLogo.gif"
            cssRoot.style.setProperty('--text','white')
            cssRoot.style.setProperty('--background','black')
            document.getElementById('menuButton').style.filter="invert()"
    } else {
            logo.src="../static/assets/blackLogo.gif"
            document.getElementById('menuButton').style.filter="none"
            cssRoot.style.setProperty('--text','black')
            cssRoot.style.setProperty('--background','white')
    }
}


window.addEventListener('load', 
  function() { 

    function zoom(){

        for (let index = 0; index < 30; index++) {
            cssRoot.style.setProperty('--zoom','.3')
        
        }

    //     setTimeout(() => {
    //         cssRoot.style.setProperty('--text','1')
    // }, 1500);
    }



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


    let i = 0
    projects.forEach(project =>{
        project.style.top = positions[i].top
            project.style.left = positions[i].left
            i++
    })


    // Full screen

    var elem = document.documentElement;

        function fullscreen() {
            if (elem.requestFullscreen) {
            elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
            }
        }

    window.addEventListener('click',()=>{
        fullscreen()
    })


    // when move the mouse/touch the screen, appear contents
    window.addEventListener('wheel', () =>{ 
        menuButton.classList.add('animate__fadeIn')
        menuButton.style.opacity = '100%'
        document.querySelector('#up').style.opacity = '100%'
        document.querySelector('#changeTheme').style.opacity = '100%'
        document.querySelector('.animate__animated').classList.add('animate__fadeIn')
        document.getElementById("contents").classList.add('animate__fadeIn')

    })



    window.addEventListener('touchstart', () =>{
        menuButton.classList.add('animate__fadeIn')
        menuButton.style.opacity = '100%'
        document.querySelector('#up').style.opacity = '100%'
            document.querySelector('#changeTheme').style.opacity = '100%'

        document.querySelector('.animate__animated').classList.add('animate__fadeIn')
        document.getElementById("contents").style.visibility = 'visible'

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
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
    });


    changeTheme.addEventListener('click', () =>{
        changeThemeFunction()
    })


    // parallax instance
    var scene = document.querySelector('#container')
    var parallaxInstance = new Parallax(scene);
    parallaxInstance.friction(0.8,0.8);


  }, false);