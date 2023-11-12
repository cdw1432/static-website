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
const currentMoon = moonPhases[dayOfCycle]; // 29.53058867 is the average length of a lunar month 
let link = document.querySelector("link[rel~='icon']");
//console.log(currentMoon);

if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${currentMoon}</text></svg>`;

/* Headings */
let h2 = document.querySelector("#h2")
let h3 = document.querySelector("#h3")
let h4 = document.querySelector("#h4")

async function fetchHeadings(language) {
    try {
        const res = await fetch(jsonFilePath)
        const data = await res.json();

        let head2 = data[language].header2;
        let head3 = data[language].header3;
        let head4 = data[language].header4;
        h2.textContent = head2
        h3.textContent = head3
        h4.textContent = head4
    } catch (err) {
        console.error(err)
    }
}
fetchHeadings(defaultLanguage)
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
    fetchHeadings(language)
    fetchButton(language);
});
/* BUTTONS */
let blogButton = document.querySelector("#moreblog")
let repoButton = document.querySelector("#morerepos")

async function fetchButton(language) {
    try {
        const res = await fetch(jsonFilePath)
        const data = await res.json();
        let btnformoreblog = `<a href="https://medium.com/@cdw1432m" target="_blank">${data[language].button.blog}</a>`
        let btnformorerepo = `<a href="https://github.com/cdw1432" target="_blank">${data[language].button.blog}</a>`
        blogButton.innerHTML = btnformoreblog
        repoButton.innerHTML = btnformorerepo
    } catch (err) {
        console.error(err)
    }
}
fetchButton(defaultLanguage);


/* BLOG POSTS */
let post = document.querySelector("#postslist")
var myHeaders = new Headers();
const apiKey = `ggm7kpunjp4tcxh5qbvbdozbydciet524cz526lz`
const count = 3

myHeaders.append("Content-Type", "application/json");
var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",

};

fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cdw1432m&api_key=${apiKey}&count=${count}`, requestOptions)
    .then(response => response.json())
    .then(jsonData => {

        for (let i = 0; i < count; i++) {
            const dateString = jsonData.items[i].pubDate
            const dateObject = new Date(dateString);

            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1;
            const day = dateObject.getDate();

            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

            //console.log(formattedDate);
            let list = document.createElement("li")
            list.innerHTML = `<a href="${jsonData.items[i].link}" target="_blank">${jsonData.items[i].title}</a><br/>` + `<span id="post-date">${formattedDate}</span><br/>`
            if (jsonData.items[i].categories.length > 0)
                for (let j = 0; j < jsonData.items[i].categories.length; j++) {
                    if (j == 3) break;
                    list.innerHTML += `<span class="post-tags">${jsonData.items[i].categories[j]}</span>`
                }
            post.appendChild(list);
            //console.log(jsonData)
        }
    })
    .catch(error => console.log('error', error));

/* GITHUB Repos*/
const githubUsername = 'cdw1432';
let repos = document.querySelector('#reposlist');
async function getLatestRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const data = await response.json();

        const sortedRepos = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));


        const latestRepos = sortedRepos.slice(0, count).map(repo => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            updated_at: repo.updated_at
        }));

        for (let i = 0; i < count; i++) {
            const dateString = latestRepos[i].updated_at
            const dateObject = new Date(dateString);

            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1;
            const day = dateObject.getDate();

            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            let list = document.createElement("li")
            list.innerHTML = `<a href="${latestRepos[i].html_url}" target="_blank">${latestRepos[i].name}</a><br/>` +
                `<span id="post-date">updated: ${formattedDate}</span><br/>` +
                `<span class="repos-tags">${latestRepos[i].description}</span>`
            repos.appendChild(list);
        }
        console.log(latestRepos);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
getLatestRepos();