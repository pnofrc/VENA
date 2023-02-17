let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')
let changeTheme = document.getElementById('changeTheme')
let cssRoot = document.querySelector(':root');
let projects = document.querySelectorAll('.project')
let zoomed = false


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

setTimeout(() => {
    if (localStorage.getItem("info")){
        document.getElementById("loader-container").classList.add('animate__fadeIn')
        document.getElementById("loader-text").style.display ="none"
        document.getElementById("loader-container").style.backgroundImage ="url(https://shortpixel.com/img/spinner2.gif) "
        document.getElementById("loader-container").style.backgroundRepeat ="no-repeat "
        document.getElementById("loader-container").style.backgroundPosition ="center "
    } else {
            document.getElementById("loader-container").classList.add('animate__fadeIn')

    }
}, 1000);



window.addEventListener('load', 
  function() { 


    if (localStorage.getItem("info")){
        document.getElementById("loader-container").style.display ="none"

    }else{
    document.getElementById("enter").style.display = 'block'
    document.getElementById("enter").addEventListener('click',()=>{
        document.getElementById("loader-container").classList.add('animate__fadeOut')
        setTimeout(() => {
            callLogo()
        }, 30);
        localStorage.setItem("info",'ok')
    })}



   

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
        // menuButton.style.opacity = '100%'
        document.querySelector('#up').style.opacity = '100%'
        document.querySelector('#changeTheme').style.opacity = '100%'
        // document.querySelector('.anima').classList.add('animate__fadeIn')
        // document.getElementById("contents").classList.add('animate__fadeIn')
        if (window.matchMedia("only screen and (max-width: 760px)").matches){
        fullscreen()
        }
    })


    // // when move the mouse/touch the screen, appear contents
    window.addEventListener('wheel', () =>{ 
        menuButton.classList.add('animate__fadeIn')
        // menuButton.style.opacity = '100%'
        // document.querySelector('#up').style.opacity = '100%'
        document.querySelector('#changeTheme').style.opacity = '100%'
        document.querySelector('.anima').classList.add('animate__fadeIn')
        document.getElementById("contents").classList.add('animate__fadeIn')
    })



    // window.addEventListener('touchstart', () =>{
    //     menuButton.classList.add('animate__fadeIn')
    //     menuButton.style.opacity = '100%'
    //     document.querySelector('#up').style.opacity = '100%'
    //         document.querySelector('#changeTheme').style.opacity = '100%'

    //     document.querySelector('.animate__animated').classList.add('animate__fadeIn')
    //     document.getElementById("contents").style.visibility = 'visible'

    // })

    // toggle menu

    menuButton.addEventListener('click', function(){
            // fullscreen()
            if(menu.style.display === 'block'){
                menu.style.display = 'none'
                menuButton.src = "/static/assets/hamburger.svg"
            } else {
                menu.style.display = 'block'
                menuButton.src = "/static/assets/deburger.svg"
            }
        })


    // center page, focus on logo
    function callLogo(){
        document.getElementById("simulate").click
        document.getElementById("animatedLogo").scrollIntoView({block: "center", inline: "center"})
    }
    setTimeout(() => {
        callLogo()
    }, 10);

    document.querySelector('#up').addEventListener('click', () =>{

        // if (zoomed == false){
        //     cssRoot.style.setProperty('--zoom',.3)
        //     zoomed=!zoomed
        // } else{
        //     cssRoot.style.setProperty('--zoom',1)
        //     zoomed=!zoomed
        // }

        // this.document.getElementById("veneSegrete").style.display ='none'
        

        callLogo()
    })


    changeTheme.addEventListener('click', () =>{
        changeThemeFunction()
    })


    // parallax instance
    var scene = document.querySelector('#container')
    var parallaxInstance = new Parallax(scene);
    parallaxInstance.friction(0.8,0.8);





    // center links

    var links = document.querySelectorAll('a');
    links = Array.prototype.slice.call(links);

        links.forEach(link => {
            
            var href = link.getAttribute('href');
            if(link.getAttribute('href').startsWith('#')){
                link.addEventListener('click',function(e){
                    e.preventDefault();
                    var dest =  document.getElementById(href.substring(1));
                    dest.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
                })
            }
            
        });
    


  }, false);