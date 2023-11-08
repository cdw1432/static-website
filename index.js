/* NAV */
let navItems = {
    "INSTAGRAM": ["https://www.instagram.com/c6791432/", 1],
    "MEDIUM": ["https://medium.com/@cdw1432m", 2],
    "GITHUB": ["https://github.com/cdw1432", 3],
    "DISCORD": ["https://discord.gg/pxsnKw6Q" ,4],
    "YOUTUBE": ["https://www.youtube.com/channel/UC1KUz5HbE_b7aaudwfXXNiQ", 5]
}

let nav = document.getElementById("nav")
const mediaQuery = window.matchMedia("(max-width: 800px)");

let matched = document.createElement('matched');
let unmatched = document.createElement('unmatched');
if(nav.childNodes.length === 0) {
    for (let key in navItems) {
        const link = document.createElement("a");
        link.href = navItems[key][0];
        link.id = `nav${navItems[key][1]}`
        link.innerHTML = `<span id="navItems">` + key.toLowerCase() + `</span>`;
        link.target = "_blank"
        unmatched.appendChild(link);
    }
    const ul = document.createElement("ul");
    for (let key in navItems) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = navItems[key][0];
        link.id = `nav${navItems[key][1]}`
        link.innerHTML = `<span id="navItems">` + key.toLowerCase() + `</span>`;
        link.target = "_blank"
        listItem.appendChild(link);
        ul.appendChild(listItem);
    }
    matched.appendChild(ul);
}
if (mediaQuery.matches) {
    nav.innerHTML = matched.innerHTML
} else {
   nav.innerHTML = unmatched.innerHTML
}


mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
         nav.innerHTML = matched.innerHTML
    } else {
        nav.innerHTML = unmatched.innerHTML
    }
});

/* FAVICON */
let moonPhases = ['🌑','🌒','🌓', '🌔', '🌕','🌖', '🌗', '🌘', '🌑']
const date = new Date();
const dayOfCycle = Math.floor((date / (1000 * 60 * 60 * 24)) % 29.53058867);    //date/(1000*60*60*24), tell us the number of days since the epoch
const currentMoon = moonPhases[dayOfCycle];                                     // 29.53058867 is the average length of a lunar month 
let link = document.querySelector("link[rel~='icon']");


//console.log(currentMoon);
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${currentMoon}</text></svg>`;