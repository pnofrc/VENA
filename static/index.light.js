let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')
let changeTheme = document.getElementById('changeTheme2')
let cssRoot = document.querySelector(':root');

if (localStorage.length == 0) {
    localStorage.setItem("dark", "y")
}

dark()

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
            cssRoot.style.setProperty('--text','white')
            cssRoot.style.setProperty('--background','black')
            cssRoot.style.setProperty('--input','rgba(255, 255, 255, 0.429)')

    } else {
            cssRoot.style.setProperty('--text','black')
            cssRoot.style.setProperty('--background','white')
            cssRoot.style.setProperty('--input','rgba(42, 40, 40, 0.429)')

    }
}



    changeTheme.addEventListener('click', () =>{
        changeThemeFunction()
    })

