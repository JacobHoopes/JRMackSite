let resizeTimeout;

function onWindowResize() {
    console.log('Window resized to: ' + window.innerWidth + ' x ' + window.innerHeight)

    let juxtaposeDiv = document.getElementById("jDiv");
    juxtaposeDiv.style.width = "calc(100vw - 16px)";
}

function debounceResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(onWindowResize, 0);
}

window.addEventListener('resize', debounceResize)

// document.addEventListener('click')

// function testing(item) {
//     // let object = document.getElementById(item);
//     // object.style.backgroundColor = "red";

// }

const testing = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = "#" + randomColor;
    const color = document.getElementById("color");
    if (color) {
        color.innerHTML = "#" + randomColor;
    }
}

img.addEventListener('click', testing);
testing();

var currentMap = 0;


const changeMap = () => {

    
    currentMap = (currentMap + 1) % 5;
    let juxtaposeMap = document.getElementById("jDiv");
    // juxtaposeMap.style.border = "5px solid black";
    setTimeout(returnBackground, 500);
    juxtaposeMap.dataset.startingposition = Math.floor(Math.random()*100).toString() + "%";
    if (juxtaposeMap.children.length > 0) {
        const firstChild = juxtaposeMap.children[0];
        firstChild.dataset.label = "hello";

        const script = document.createElement('script');
        script.src = "../../juxtapose/js/juxtapose.js?v=" + new Date().getTime();
        document.head.appendChild(script);

    }


}

change.addEventListener('click', changeMap)

function returnBackground() {
    document.getElementById("jDiv").style.border = "0px"
}

jDiv.addEventListener('mousemove', () => {
    let juxtaposeMap = document.getElementById("jDiv");

    document.getElementById("color").innerHTML = juxtaposeMap.children[0];
    // juxtaposeMap.setAttribute(leftPercent="10%") = Math.floor(Math.random()*100).toString() + "%";
    juxtaposeMap.style.border = "2px black solid"

    setTimeout(returnBackground, 500);
});