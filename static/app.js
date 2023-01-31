
        window.location.hash = "HOME";

        function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX + 'px',
            top: rect.top + window.scrollY+ 'px'
        };
        }

        document.querySelector('#HOME').style.filter = 'invert()'
        document.querySelector('#VENA').style.filter = 'invert()'

        window.addEventListener('wheel', (event) =>{
            event.preventDefault();
            document.querySelector('.animate__animated').classList.add('animate__fadeIn')
            document.querySelector('#capillari').style.filter = 'invert()'
        })

                window.addEventListener('touchstart', (event) =>{
            event.preventDefault();
            document.querySelector('.animate__animated').classList.add('animate__fadeIn')
            document.querySelector('#capillari').style.filter = 'invert()'
        })
    

        let menu = document.getElementById('menu')
        let menuButton = document.getElementById('menuButton')

        menuButton.addEventListener('click', function(){
            if(menu.style.display === 'block'){
                menu.style.display = 'none'
            } else {
                menu.style.display = 'block'
            }
        })


        let positions = []

        let spacePoints = document.querySelectorAll('rect')
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






        var scene = document.querySelector('#logo')
        var parallaxInstance = new Parallax(scene);
        