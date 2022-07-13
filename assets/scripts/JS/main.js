const sections = [...document.querySelectorAll("Section")]
const menuItem = [...document.querySelectorAll("nav a")]
let sectionsPosition;

positionCalculation()
menuSwitch()
pageNumSwitch()
pageNumAdd()
addProjects()

menuItem.forEach(link => link.addEventListener("click", smoothScroll))

document.addEventListener('scroll', () => {
    phraseSwitch()
    menuSwitch()
    pageNumSwitch()
    pageNumAdd()
    textAppearance()
})

document.querySelector(".burgerMenu").addEventListener("click", () => {
    if (!document.querySelector("#menu").classList.contains("open")) {
        openMenu()
    }
    else if (document.querySelector("#menu").classList.contains("open")) {
        closeMenu()
    }
})

//Menu effet gris
document.querySelectorAll(".menuLabel").forEach((label) => {
    label.addEventListener("mouseover", () => {
        document.querySelectorAll(".menuLabel").forEach((labl) => {
            if (labl != label) {
                labl.style.color = "#8D8D8D"
            }
        })
    })
    label.addEventListener("mouseout", () => {
        document.querySelectorAll(".menuLabel").forEach((labl) => {
            if (labl.style.color != "#8D8D8D") {
                labl.style.color = "#FAFAFA"
            }
        })
    })
})

// Changement de couleur de la phrase
function phraseSwitch() {
    let about = document.querySelector('#aboutMe')
    let alt = document.querySelector(".alt")
    let start = document.querySelector(".start")

    if (document.querySelector("#home").getBoundingClientRect().top < window.innerHeight)
        start.style.visibility = "visible"
    else
        start.style.visibility = "hidden"

    if (parseInt(start.offsetTop) > about.getBoundingClientRect().top)
        start.style.position = "relative"
    else
        start.style.position = "fixed"

    alt.style.top = start.offsetTop - alt.closest(".sec").getBoundingClientRect().top + "px"
    alt.style.opacity = Math.pow(about.getBoundingClientRect().top / window.innerHeight, 6)
}

//Ouverture du menu
function openMenu() {
    document.querySelector("#menu").classList.add("open")
    document.querySelector(".burgerMenu").classList.add("open")
    document.querySelector(".pageInfo").classList.add("open")
    disableScroll()
    phraseSwitch()
    menuSwitch()
}

//Fermeture du menu
function closeMenu() {
    document.querySelector("#menu").classList.remove("open")
    document.querySelector(".burgerMenu").classList.remove("open")
    document.querySelector(".pageInfo").classList.remove("open")
    enableScroll()
    phraseSwitch()
    menuSwitch()
}
//Smooth scroll direction
function smoothScroll(e) {
    document.querySelector("#menu").classList.remove("open")
    document.querySelector(".burgerMenu").classList.remove("open")
    document.querySelector(".pageInfo").classList.remove("open")
    enableScroll()
    phraseSwitch()
    menuSwitch()
    const linkIndex = menuItem.indexOf(e.target.parentElement)
    window.scrollTo({
        top: sectionsPosition[linkIndex],
        behavior: "smooth"
    })
}

//Apparition des textes
function textAppearance() {
    let h3 = document.querySelectorAll("h3")
    h3.forEach((elmt) => {
        if (elmt.getBoundingClientRect().top < window.innerHeight) {
            elmt.firstChild.classList.add("ap")
            elmt.classList.add("ap")
        }
    })
}

//récupéré les position des secitons
function positionCalculation() {
    sectionsPosition = sections.map(section => section.offsetTop)
}

//Décompte des pages
function pageNumAdd() {
    let pageInfo = document.querySelector(".pageInfo")
    let home = document.querySelector("#home")
    let aboutMe = document.querySelector("#aboutMe")
    let portfolio = document.querySelector("#portfolio")
    let skills = document.querySelector("#skills")

    if (home.getBoundingClientRect().top < pageInfo.getBoundingClientRect().top && home.getBoundingClientRect().bottom > pageInfo.getBoundingClientRect().bottom) {
        pageInfo.children[0].innerText = "01"
    }

    if (aboutMe.getBoundingClientRect().top < pageInfo.getBoundingClientRect().top && aboutMe.getBoundingClientRect().bottom > pageInfo.getBoundingClientRect().bottom) {
        pageInfo.children[0].innerText = "02"
    }

    if (portfolio.getBoundingClientRect().top < pageInfo.getBoundingClientRect().top && portfolio.getBoundingClientRect().bottom > pageInfo.getBoundingClientRect().bottom) {
        pageInfo.children[0].innerText = "03"
    }

    if (skills.getBoundingClientRect().top < pageInfo.getBoundingClientRect().top && skills.getBoundingClientRect().bottom > pageInfo.getBoundingClientRect().bottom) {
        pageInfo.children[0].innerText = "04"
    }
}

//Changement de couleur en fonction du font pageInfo
function pageNumSwitch() {
    let WhiteSec = document.querySelectorAll('.whiteBack')
    let pageInfo = document.querySelector(".pageInfo")
    let isWhite = false
    WhiteSec.forEach((white) => {
        if (white.getBoundingClientRect().top < pageInfo.getBoundingClientRect().top && white.getBoundingClientRect().bottom > pageInfo.getBoundingClientRect().bottom) {
            isWhite = true
        }
    })
    for (let i = 0; i < pageInfo.childElementCount; i++) {
        pageInfo.children.item(i).style.transition = i + "s"
        if (pageInfo.children.item(i).classList.contains("line")) {
            isWhite ? pageInfo.children.item(i).style.backgroundColor = "#101010" : pageInfo.children.item(i).style.backgroundColor = "#FAFAFA"
        }
        else {
            isWhite ? pageInfo.children.item(i).style.color = "#101010" : pageInfo.children.item(i).style.color = "#FAFAFA"
        }
    }
}

//Changement de couleur en fonction du font burgerMenu
function menuSwitch() {
    let WhiteSec = document.querySelectorAll('.whiteBack')
    let menu = document.querySelector(".burgerMenu")
    let isWhite = false
    WhiteSec.forEach((white) => {
        if (white.getBoundingClientRect().top < menu.getBoundingClientRect().top && white.getBoundingClientRect().bottom > menu.getBoundingClientRect().bottom) {
            isWhite = true
        }
    })

    isWhite ? menu.classList.add('black') : menu.classList.remove('black')

    if (menu.classList.contains("open"))
        menu.classList.remove('black')
}

function addProjects() {
    const prev = document.querySelector(".prev")
    const next = document.querySelector(".next")
    const projetDiv = document.querySelector(".projets")

    console.log(projetDiv.children);
    for (var i = 0; i < 2; i++) {
        projetDiv.children[i].style.display = "flex"
    }

    next.addEventListener("click", () => {
        if (projetDiv.children[0].style.display == "flex" & projetDiv.children[1].style.display == "flex") {
            projetDiv.children[2].style.display = "flex"
            projetDiv.children[0].style.display = "none"
        } else if (projetDiv.children[0].style.display == "none" & projetDiv.children[1].style.display == "flex") {
            projetDiv.children[3].style.display = "flex"
            projetDiv.children[1].style.display = "none"
        } else if (projetDiv.children[0].style.display == "none" & projetDiv.children[1].style.display == "none") {
            projetDiv.children[0].style.display = "flex"
            projetDiv.children[1].style.display = "flex"
            projetDiv.children[2].style.display = "none"
            projetDiv.children[3].style.display = "none"
        }
    })

    prev.addEventListener("click", () => {
        if (projetDiv.children[0].style.display == "flex" & projetDiv.children[1].style.display == "flex") {
            projetDiv.children[3].style.display = "flex"
            projetDiv.children[2].style.display = "flex"
            projetDiv.children[0].style.display = "none"
            projetDiv.children[1].style.display = "none"
        } else if (projetDiv.children[3].style.display == "flex" & projetDiv.children[2].style.display == "flex") {
            projetDiv.children[1].style.display = "flex"
            projetDiv.children[3].style.display = "none"
        } else if (projetDiv.children[0].style.display == "none" & projetDiv.children[1].style.display == "flex") {
            projetDiv.children[0].style.display = "flex"
            projetDiv.children[1].style.display = "flex"
            projetDiv.children[3].style.display = "none"
            projetDiv.children[2].style.display = "none"
        }
    })
}