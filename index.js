const defaultLanguage = "en"
/* JSON */
const jsonFilePath = "./json/data.json"
let navItems;
let nav = document.getElementById("nav")
let matched = document.createElement('matched');
let unmatched = document.createElement('unmatched');
const mediaQuery = window.matchMedia("(max-width: 800px)");

function loadJSONData(language) {
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch the JSON file: ${response.statusText}`);
            }
            return response.json();
        })
        .then(jsonData => {
            button.innerHTML = jsonData[`${language}`].icon;
            abttext = jsonData[`${language}`].about;
            // Extract the links for the selected language
            navItems = jsonData[`${language}`].links;
            //console.log(navItems);
            if (nav.childNodes.length != 0) {
                matched.innerHTML = "";
                unmatched.innerHTML = "";
                nav.innerHTML = ""
            }
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
            if (mediaQuery.matches) {
                nav.innerHTML = matched.innerHTML
            } else {
                nav.innerHTML = unmatched.innerHTML
            }
        })
        .catch(error => {
            console.error(error);
        });
}
loadJSONData(defaultLanguage);

/* FAVICON */
let moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑']
const date = new Date();
const dayOfCycle = Math.floor((date / (1000 * 60 * 60 * 24)) % 29.53058867); //date/(1000*60*60*24), tell us the number of days since the epoch
const currentMoon = moonPhases[dayOfCycle];                                  // 29.53058867 is the average length of a lunar month 
let link = document.querySelector("link[rel~='icon']");
//console.log(currentMoon);

if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${currentMoon}</text></svg>`;




/* NAV */
mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
        nav.innerHTML = matched.innerHTML
    } else {
        nav.innerHTML = unmatched.innerHTML
    }
});
/* About */
let abtme = document.querySelector("#aboutme")
let abttext;
async function fetchAbout(language) {
    try {
        const res = await fetch(jsonFilePath)
        const data = await res.json();
        abttext = data[language].about;
        abtme.textContent = abttext
    } catch (err) {
        console.error(err)
    }
}
fetchAbout(defaultLanguage);


abtme.textContent = abttext
//console.log(abttext)
/* LANGUAGE BUTTON */
let language = defaultLanguage;
let button = document.querySelector("#language")

button.addEventListener("click", function() {
    language = (defaultLanguage == language) ? "kr" : "en"
    loadJSONData(language)
    fetchAbout(language)
});