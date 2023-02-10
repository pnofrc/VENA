let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX + 'px',
        top: rect.top + window.scrollY+ 'px'
    };
    }


    window.addEventListener('wheel', () =>{
        menuButton.classList.add('animate__fadeIn')
        menuButton.style.opacity = '100%'
        document.querySelector('#up').style.opacity = '100%'
        document.querySelector('.animate__animated').classList.add('animate__fadeIn')
        // document.querySelector('#capillari').style.filter = 'invert()'
    })

    window.addEventListener('touchstart', () =>{
        menuButton.classList.add('animate__fadeIn')
        menuButton.style.opacity = '100%'
        document.querySelector('#up').style.opacity = '100%'
        document.querySelector('.animate__animated').classList.add('animate__fadeIn')
        // document.querySelector('#capillari').style.filter = 'invert()'
    })

    function closeMenu(){
        if(menu.style.display === 'block'){
            menu.style.display = 'none'
            menuButton.innerHTML = '⦔⦔⦔'
        } else {
            menu.style.display = 'block'
            menuButton.innerHTML = '⪪⪪⪪'
        }
    }

    menuButton.addEventListener('click', function(){
        closeMenu()
    })


    let positions = []

    let spacePoints = document.querySelectorAll('rect')
    spacePoints.forEach(point => {
        positions.push(getOffset(point))
        console.log(spacePoints)
    });

    let projects = document.querySelectorAll('.project')

    let i = 0
    projects.forEach(project =>{
        project.style.top = positions[i].top
            project.style.left = positions[i].left
            i++
    })

function callLogo(){ document.querySelector('#animatedLogo').scrollIntoView({behavior: 'auto',block: 'center'}) }

    callLogo()

    document.querySelector('#up').addEventListener('click', () =>{
        callLogo()
    })



    var scene = document.querySelector('#logo')
    var parallaxInstance = new Parallax(scene);
    var deco = document.querySelector('#deco')
    var parallaxDeco = new Parallax(deco)
    
    //TODO: change parameters depth in responsive
    //document.getElementById('logoTotale').setAttribute('data-depth', '0.001');

        var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
});