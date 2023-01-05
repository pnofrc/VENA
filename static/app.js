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


