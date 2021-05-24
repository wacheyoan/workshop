let discovers = document.getElementsByClassName('discover');
for (let discover of discovers) {
    discover.addEventListener('click', showDiscoveringPage);
}

let persos = document.getElementsByClassName('perso');
for (let perso of persos) {
    perso.addEventListener('click', showPersoPage);
}

let items = {
        white: {
            "title": "Magic White",
            "image": "pixies-magic-white",
            'price': "49.99"
        },
        lightblue: {
            "title": "Blue Fairy",
            "image": "pixies-blue-fairy",
            "price": "49.99"
        },
        green: {
            "title": "Magic Green",
            "image": "pixies-magic-green",
            "price": "49.99"
        },
        lightpurple: {
            "title": "Wonder Lavender",
            "image": "pixies-wonder-lavender",
            "price": "49.99"
        },
        pink: {
            "title": "Heart Pixie",
            "image": "pixies-rose",
            "price": "49.99"
        },
        lightpink: {
            "title": "Pink Fairy",
            "image": "pixies-pink-fairy",
            "price": "49.99"
        }

    }

function showDiscoveringPage(e) {
    e.preventDefault();
    hideActivePage();

    let discoverPage = document.getElementsByClassName('second')[0];
    discoverPage.classList.remove('hidden');
    discoverPage.classList.add('active');

    document.querySelector('nav li:nth-child(3)').classList.add('active-menu');

    animateMouse();
}

function showDiffMotifpage() {
    hideActivePage();
    let motifspage = document.getElementsByClassName('third')[0];
    motifspage.classList.remove('hidden');
    motifspage.classList.add('active');

    document.querySelector('nav li:nth-child(3)').classList.add('active-menu');

}

function showPersoPage(e) {
    e.preventDefault();
    hideActivePage();

    let persoPage = document.getElementsByClassName('fourth')[0];
    persoPage.classList.remove('hidden');
    persoPage.classList.add('active');

    document.querySelector('nav li:nth-child(4)').classList.add('active-menu');


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


class Swipe {
    constructor(elem, options = {}) {
        this.elem = elem;
        this.minDistance = options.minDistance || 100;
        this.maxTime = options.maxTime || 500;
        this.corners = options.corners || false;
        this.addListeners();
        this.events = {
            live: [],
            after: []
        };

        Swipe.directions().forEach(direction => this.events[direction] = []);
    }

    static directions() {
        return ['left', 'right', 'up', 'down', 'leftup', 'leftdown', 'rightup', 'rightdown'];
    }

    static position(e) {
        return {x: e.pageX, y: e.pageY};
    }

    static getOffsets(e, startPos) {
        const newPos = Swipe.position(e);
        return {
            x: newPos.x - startPos.x,
            y: newPos.y - startPos.y
        };

    }

    static getDirections(offsets, corners) {
        const directions = {};
        directions.left = offsets.x <= 0 ? Math.abs(offsets.x) : 0;
        directions.right = offsets.x >= 0 ? Math.abs(offsets.x) : 0;
        directions.up = offsets.y <= 0 ? Math.abs(offsets.y) : 0;
        directions.down = offsets.y >= 0 ? Math.abs(offsets.y) : 0;

        if (corners) {
            directions.leftup = Math.abs(directions.left + directions.up) / 1.5;
            directions.leftdown = Math.abs(directions.left + directions.down) / 1.5;
            directions.rightup = Math.abs(directions.right + directions.up) / 1.5;
            directions.rightdown = Math.abs(directions.right + directions.down) / 1.5;
        }

        return directions;
    }

    static order(directions) {
        return Object.keys(directions).sort((a, b) => directions[b] - directions[a]);
    }

    addEventListener(evt, bc) {
        const keys = Object.keys(this.events);
        if (keys.indexOf(evt) !== -1) {
            this.events[evt].push(bc);
            const i = this.events.length - 1;
            return {
                clear: () => {
                    this.events[i] = undefined;
                }
            };

        } else {
            throw new Error("Event is not valid, use " + keys.join(", "));
        }
    }

    down(e) {
        e.preventDefault();
        this.didDown = true;
        this.startTime = Date.now();
        this.startPos = Swipe.position(e);
    }

    move(e) {
        e.preventDefault();
        if (!this.didDown) {
            return;
        }
        this.didSwipe = true;

        if (this.events.live.length > 0) {
            const offsets = Swipe.getOffsets(e, this.startPos);
            const directions = Swipe.getDirections(offsets, this.corners);
            const direction = Swipe.order(directions)[0];
            const distance = directions[direction];
            this.events.live.forEach(evt => {
                if (typeof evt === "function") {
                    evt(direction, distance);
                }
            });
        }
    }

    up(e) {
        e.preventDefault();
        this.didDown = false;
        if (!this.didSwipe) {
            return;
        }
        this.didSwipe = false;

        const elapsedTime = Date.now() - this.startTime;
        if (elapsedTime <= this.maxTime) {
            const offsets = Swipe.getOffsets(e, this.startPos);
            const directions = Swipe.getDirections(offsets, this.corners);
            const direction = Swipe.order(directions)[0];
            const distance = directions[direction];

            if (distance >= this.minDistance) {
                this.events.after.forEach(evt => {
                    if (typeof evt === "function") {
                        evt(direction, distance);
                    }
                });
                this.events[direction].forEach(evt => {
                    if (typeof evt === "function") {
                        evt(distance);
                    }
                });
            }
        }
    }

    addListeners() {
        this.elem.addEventListener("touchstart", e => this.down(e));
        this.elem.addEventListener("mousedown", e => this.down(e));
        this.elem.addEventListener("touchmove", e => this.move(e));
        document.addEventListener("mousemove", e => this.move(e));
        this.elem.addEventListener("touchend", e => this.up(e));
        document.addEventListener("mouseup", e => this.up(e));
    }
}

//CODE FOR ANIMATION
const elem = document.querySelector('section.second');

//SWIPE INITIALIZATION
const swipe = new Swipe(elem, {
    corners: true,
    minDistance: 50
});

let afterEvent = swipe.addEventListener("after", direction => {
    swipeGame(direction)
});


function swipeGame(direction) {
    direction === "right" ? swipeRight() : swipeLeft();
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
    document.querySelector('progress').value = desc.dataset.value;

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
    document.querySelector('progress').value = desc.dataset.value;

    document.querySelector('.progress').classList.remove('hidden')

}

let pings = document.querySelectorAll('dd');
for (let ping of pings) {
    ping.addEventListener('click', pingSelectable);
}

function pingSelectable(e) {
    let elem = e.target;
    let itemNode = document.querySelector('.item');
    document.querySelector('.selectable').classList.remove('selectable');

    let color = [...elem.classList].find(e => {
        return e !== 'ping' && e !== "selectable"
    });

    if (undefined !== items[color]) {
        let ps = items[color].title.split(' ');
        itemNode.querySelector('p:first-child').innerHTML = ps[0];
        itemNode.querySelector('p:nth-child(2)').innerHTML = ps[1];
        itemNode.querySelector('img').src = "../img/img%20png%20x1/" + items[color].image + ".png"
    }
    elem.classList.add('selectable');
}