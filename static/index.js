let logo = document.getElementById("animatedLogo")
let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')
let changeTheme = document.getElementById('changeTheme')
let cssRoot = document.querySelector(':root');
let projects = document.querySelectorAll('.project')
let centeringButton = document.querySelector('#up')
var links = document.querySelectorAll('a');
links = Array.prototype.slice.call(links);
var anima = document.querySelectorAll('.anima');
anima = Array.prototype.slice.call(anima);
let eventContainer = document.querySelector('#container')
let trigger = false

history.replaceState({},'',location.pathname); // at refresh/enter clean the url path



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

//  loading gif
if (localStorage.getItem("info")){
        document.getElementById("loader-container").classList.add('animate__fadeIn')
        // document.getElementById("loader-text").style.display="none"
        document.getElementById("loader-container").style.backgroundImage ="url(https://shortpixel.com/img/spinner2.gif) "

        document.getElementById("loader-container").style.backgroundImage ="url(https://shortpixel.com/img/spinner2.gif) "
        document.getElementById("loader-container").style.backgroundRepeat ="no-repeat "
        document.getElementById("loader-container").style.backgroundPosition ="center "
} else {
        document.getElementById("loader-container").style.display="flex"
}


window.addEventListener('load', 
  function() { 

    if (localStorage.getItem("info")){
        
       
        trigger = true
         events()
           callLogo()
         eventContainer.style.display = 'flex'
        setTimeout(() => {
             callLogo()
        }, 100);
    }else {
        document.getElementById("enter").classList.add('animate__flipInX')
        setTimeout(() => {
            document.getElementById("enter").style.display="block"
        }, 300);

        document.getElementById("enter").addEventListener('click',()=>{
            fullscreen()
            document.getElementById("loader-container").classList.add('animate__fadeOut')
            setTimeout(() => {
                document.getElementById("loader-container").style.display ="none"
                 callLogo()
                 trigger = true
                 events()
                 setTimeout(() => {
                    eventContainer.style.display = 'flex'
                    callLogo()
                }, 200);
            }, 1000);

              
          
            localStorage.setItem("info",'ok')
            
    })}


    // callLogo()



    function events(){
        callLogo()
        // when click the page appear buttons and full screen
        window.addEventListener('click',()=>{
            if(trigger){
            anima.forEach(animo => {
                animo.classList.add('animate__fadeIn')
            });
                setTimeout(() => {
                    fullscreen()
                }, 500);}
        })

        // when move the mouse/touch the screen, appear contents
        window.addEventListener('wheel', () =>{ 
             fullscreen()
            anima.forEach(animo => {
                animo.classList.add('animate__fadeIn')
            });
        })

        window.addEventListener('touchstart', () =>{
             fullscreen()
            anima.forEach(animo => {
                animo.classList.add('animate__fadeIn')
            });
        })
    }

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



    // toggle menu
    menuButton.addEventListener('click', function(){
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
        logo.scrollIntoView({block: "center", inline: "center"})
    }

    // Reset position when dezooming?
    eventContainer.addEventListener('click', () =>{
        fullscreen()
    })



    // // Zoom system and centering
    centeringButton.addEventListener('pointerdown',()=>{
         parallaxInstance.disable()
        callLogo()
        cssRoot.style.setProperty('--zoom',.2)})
    

    centeringButton.addEventListener('pointerup',()=>{
        cssRoot.style.setProperty('--zoom',1)
                 parallaxInstance.enable()

    })


    // change theme
    changeTheme.addEventListener('click', () =>{
        changeThemeFunction()
    })


    // center links
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