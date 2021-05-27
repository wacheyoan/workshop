let discovers = document.getElementsByClassName('discover');
for (let discover of discovers) {
    discover.addEventListener('click', showDiscoveringPage);
}
let persos = document.getElementsByClassName('perso');
for (let perso of persos) {
    perso.addEventListener('click', showPersoPage);
}

let pings = document.querySelectorAll('dd');
for (let ping of pings) {
    ping.addEventListener('click', pingSelectable);
}

const elem = document.querySelector('section.second');

const swipe = new Swipe(elem, {
    corners: true,
    minDistance: 50
});
swipe.addEventListener("after", direction => {
    swipeGame(direction);
});

//rip
window.addEventListener("resize", function (e){
    manageScreen();
});

document.querySelectorAll('section:not(.hidden)  .ellipse, section:not(.hidden) .trait').forEach(function (e){
    new HoverButton(e);
})

let menu = document.querySelector('.menu');
menu.addEventListener('click',function (){
    menu.style.display = "none";
    document.querySelector('nav').style.display = "flex";
    document.querySelector('.cross').style.display = "block";

})

let cross = document.querySelector('.cross');
cross.addEventListener('click',function (){
    cross.style.display = "none";
    document.querySelector('nav').style.display = "none";
    document.querySelector('.menu').style.display = "block";
})



//HANDLE "PAGES"
function showDiscoveringPage(e) {
    e.preventDefault();
    hideActivePage();
    hideMobileMenu();

    let discoverPage = document.getElementsByClassName('second')[0];
    discoverPage.classList.remove('hidden');
    discoverPage.classList.add('active');

    document.querySelector('nav li:nth-child(3)').classList.add('active-menu');

    animateMouse();

    document.querySelectorAll('section.second > .image-section > .ellipse,section.second > .image-section > .trait').forEach(function (e) {
        new HoverButton(e)
    })


}

function showDiffMotifpage() {
    hideActivePage();
    hideMobileMenu();
    let motifspage = document.getElementsByClassName('third')[0];
    motifspage.classList.remove('hidden');
    motifspage.classList.add('active');

    document.querySelector('nav li:nth-child(3)').classList.add('active-menu');

}

function showPersoPage(e) {
    e.preventDefault();
    hideActivePage();
    hideMobileMenu();

    let persoPage = document.getElementsByClassName('fourth')[0];
    persoPage.classList.remove('hidden');
    persoPage.classList.add('active');
    persoPage.querySelectorAll('.ellipse,.trait').forEach(function (e){
        new HoverButton(e)
    })


    document.querySelector('nav li:nth-child(4)').classList.add('active-menu');

    moveSelectable();

}

function hideActivePage() {
    let active = document.querySelectorAll('section.active')[0];
    active.classList.add('hidden');
    active.classList.remove('active');

    document.querySelector('.active-menu').classList.remove('active-menu');
}

function animateMouse() {
    let mouse = document.getElementById('mouse');
    mouse.classList.add('active')
}

//DEPENDING OF SWIPE DIRECTION CHANGE CONTENT OF "GAME"
function swipeGame(direction) {

    switch (direction){
        case "right":
            swipeRight();
            return;
        case "left" :
            swipeLeft();
            return;
        default:
            return;;
    }
}

function swipeRight() {
    let accueil = document.querySelectorAll('.description-section:not(.hidden)').length;
    if (0 === accueil) {
        return;
    }

    let activeDesc = document.querySelector('.description-section.active');
    let desc = null;

    if (null !== activeDesc) {
        desc = activeDesc.previousElementSibling;
        activeDesc.classList.remove('active');
        activeDesc.classList.add('hidden');
    }

    if (desc.id === "mouse") {
        let accueil = document.querySelector('section.second.active');
        accueil.querySelector('.info-section > .info-title').classList.remove('hidden');
        accueil.querySelector('.info-section > #mouse').classList.remove('hidden');
        accueil.querySelector('.image-section').classList.remove('hidden');

        document.querySelector('.progress').classList.add('hidden')
        return;
    }

    desc.classList.remove('hidden');
    desc.classList.add('active');

    desc.querySelectorAll('.ellipse,.trait').forEach(function (e){
        new HoverButton(e)
    })

    move(desc.dataset.value,false);

}

function swipeLeft() {
    let activeDesc = document.querySelector('.description-section.active');

    if (activeDesc && activeDesc.dataset.value === "80") {
        showDiffMotifpage();
        return;
    }

    let desc = null;

    if (null !== activeDesc) {
        desc = activeDesc.nextElementSibling;
        activeDesc.classList.remove('active');
        activeDesc.classList.add('hidden');
    }

    let accueil = document.querySelector('section.second.active');

    accueil.querySelector('.image-section').classList.add('hidden');
    accueil.querySelector('.info-title').classList.add('hidden');
    accueil.querySelector('#mouse').classList.add('hidden');

    if (null === desc) {
        desc = document.querySelectorAll('.description-section.hidden')[0];
    }

    desc.classList.remove('hidden');
    desc.classList.add('active');
    desc.querySelectorAll('.ellipse,.trait').forEach(function (e){
        new HoverButton(e)
    })

    move(desc.dataset.value);

    document.querySelector('.progress').classList.remove('hidden')

}


function hideMobileMenu(){
    let cross = document.querySelector('.cross');
    cross.style.display = "none";
    if(screen.width < 550){
        document.querySelector('nav').style.display = "none";
        document.querySelector('.menu').style.display = "block";
    }else{
        document.querySelector('nav').style.display = "block";
    }
}

//MOVE CIRCLE WHEN YOU SELECT A COLOR OF PIXIE
function pingSelectable(e) {
    let elem = e.target;
    let itemNode = document.querySelector('.item');

    let color = [...elem.classList].find(e => {
        return e !== 'ping' && e !== "selectable"
    });

    if (undefined !== items[color]) {
        document.querySelector('.selected').classList.remove('selected');

        let ps = items[color].title.split(' ');
        itemNode.querySelector('p:first-child').innerHTML = ps[0];
        itemNode.querySelector('p:nth-child(2)').innerHTML = ps[1];
        itemNode.querySelector('img').src = "../img/img%20png%20x1/" + items[color].image + ".png"
        elem.classList.add('selected');

        moveSelectable()

    }else{
        for(let it in items){
            let elem =  document.querySelector('.'+it);

            if(!elem.classList.contains('selected')){
                elem.classList.add('change');
            }
        }

        setTimeout(function (){
            document.querySelectorAll('.change').forEach(function (e){
                e.classList.remove('change');
            })
        },1000);
    }


}

function moveSelectable(){
    let selected = document.querySelector('.selected');
    let selectable = document.querySelector('.selectable');

    selectable.style.top = (selected.offsetTop - 2)+"px";
    selectable.style.left = (selected.offsetLeft - 11) +"px";
}

function manageScreen(){
    let menu = document.querySelector('.menu');
    let nav = document.querySelector('nav');

    if(screen.width > 550){
        nav.style.display = "block";
        menu.style.display = "none";
    }else{
        nav.style.display = "none";
        menu.style.display = "block";
    }

    moveSelectable()
}

//PROGRESS BAR SOFT INCREASE / DECREASE
function move(value, increase = true) {
    let progress = document.querySelector("progress");
    let width = value;

    if(increase){
        width = +value - 20;
    }else{
        width = +value + 20;
    }

    let id = setInterval(frame, 10);

    function frame() {
        if(increase){
            if (width >= value) {
                clearInterval(id);
            } else {
                width++;
                progress.value = width
            }
        }else{
            if (width <= value) {
                clearInterval(id);
            } else {
                width--;
                progress.value = width
            }
        }

    }
}




