

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


const testing = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = "#" + randomColor;
    const color = document.getElementById("color");
    if (color) {
        color.innerHTML = "#" + randomColor;
    }
}



var currentMap = 0;



const changeMap = () => {
    currentMap = (currentMap + 1) % 5;
    let juxtaposeMap = document.getElementById("jDiv");
    // juxtaposeMap.style.border = "5px solid black";
    setTimeout(returnBackground, 500);
    juxtaposeMap.
    juxtaposeMap.dataset.startingposition = Math.floor(Math.random()*100).toString() + "%";
    if (juxtaposeMap.children.length > 0) {
        const firstChild = juxtaposeMap.children[0];
        firstChild.dataset.label = "hello";

        const script = document.createElement('script');
        script.src = "../../juxtapose/js/juxtapose.js?v=" + new Date().getTime();
        document.head.appendChild(script);
    }
}





function returnBackground() {
    document.getElementById("jDiv").style.border = "0px"
}


// jDiv.addEventListener('mousemove', () => {
//     let juxtaposeMap = document.getElementById("jDiv");

//     document.getElementById("color").innerHTML = juxtaposeMap.children[0];
//     // juxtaposeMap.setAttribute(leftPercent="10%") = Math.floor(Math.random()*100).toString() + "%";
//     juxtaposeMap.style.border = "2px black solid"

//     setTimeout(returnBackground, 500);
// });



// var slide = document.getElementById("Zoom");
// var zoomLevel = document.getElementById("zoomLevel");
// zoomLevel.innerHTML = slide.value; // Display the default slider value


// var currentLocation = document.getElementById("currentLocation");
// var location1 = document.getElementById("location1");
// var location2 = document.getElementById("location2");
// var location3 = document.getElementById("location3");

// location1.onclick = function() {
//     currentLocation.innerHTML = this.innerHTML;
// }

// location2.onclick = function() {
//     currentLocation.innerHTML = this.innerHTML;
// }

// location3.onclick = function() {
//     currentLocation.innerHTML = this.innerHTML;
// }

window.onload = function() {
    cropSlider.oninput = function() {
        var image = document.getElementById("img2");
        image.style.clipPath = `polygon(0% 0%, ${(this.value) + "%"} 0%, ${(this.value) + "%"} 100%, 0% 100%)`

        var text = document.getElementById("cropText");
        text.innerHTML = `${(this.value) + "%"}`;
    }
    // var img = document.getElementById("img2");
    // var s = document.getElementById("slider")
    // var sliders = document.querySelectorAll('.slider');
    // sliders.forEach(function(slider) {
    //     var text = document.getElementById(slider.id + "Text");
    //     text.innerHTML = slider.value;
        
    //     slider.oninput = function() {
    //         var image = document.getElementById("img2");
    //         image.style.clipPath = `polygon(0% 0%, ${(this.value) + "%"} 0%, ${(this.value) + "%"} 100%, 0% 100%)`
    //         text.innerHTML = `${(this.value) + "%"}`;
    //     }
    // });

    // sliders.oninput = function() {

    //     img.style.clip = `polygon()`
    //     //`rect(${calc(this.value*img.height/2)})`
    // }

}

// Zoom.addEventListener('mousemove', () => {
//     var text = document.getElementById("zoomLevel");
//     text.innerHTML = Zoom.value;
// })

// window.onload = function() {
//     var img = document.getElementById("img2");
//     var slider = document.getElementById("Zoom");

//     var sliders = document.querySelectorAll('.slider');
//     sliders.forEach(function(slider) {
//         var text = document.getElementById(slider.id + "Text");
//         text.innerHTML = slider.value;
        
//         slider.oninput = function() {
//             img.style.width = this.value + "%";
//             text.innerHTML = this.value;
//         }
//     });
//     sliders.oninput = function() {

//         // img.style.clip = `rect(${calc(this.value*img.height/2)})`
//     }

// }

Year1.addEventListener('mousemove', () => {
    var element = document.getElementById("year1");
    var setElement = document.getElementById("location_");
    setElement.innerHTML = "THIs"
})