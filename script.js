const defaultPics = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800", type: "nature" },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", type: "nature" },
    { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800", type: "nature" },
    { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800", type: "city" },
    { src: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800", type: "city" },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", type: "city" }
];

let myPics = [...defaultPics];
let activeIndex = 0;

function showGrid() {
    const mainGrid = document.getElementById("gallery-grid");
    mainGrid.innerHTML = "";
    
    myPics.forEach((element, pos) => {
        const box = document.createElement("div");
        box.classList.add("gallery-item");
        box.setAttribute("onclick", `viewBox(${pos})`);
        
        box.innerHTML = `
            <img src="${element.src}" alt="Gallery Image">
            <div class="overlay"><span>View Image</span></div>
        `;
        mainGrid.appendChild(box);
    });
}

function sortItems(tag) {
    const btnList = document.querySelectorAll(".filter-btn");
    btnList.forEach(item => item.classList.remove("active"));
    event.target.classList.add("active");

    if (tag === "all") {
        myPics = [...defaultPics];
    } else {
        myPics = defaultPics.filter(item => item.type === tag);
    }
    showGrid();
}

function viewBox(pos) {
    activeIndex = pos;
    const pop = document.getElementById("lightbox");
    const popImg = document.getElementById("lightbox-img");
    
    popImg.src = myPics[activeIndex].src;
    pop.style.display = "flex";
    refreshCount();
}

function closeBox() {
    document.getElementById("lightbox").style.display = "none";
}

function moveImg(step) {
    activeIndex += step;
    
    if (activeIndex >= myPics.length) {
        activeIndex = 0;
    } else if (activeIndex < 0) {
        activeIndex = myPics.length - 1;
    }
    
    document.getElementById("lightbox-img").src = myPics[activeIndex].src;
    refreshCount();
}

function refreshCount() {
    const countDisplay = document.getElementById("image-counter");
    countDisplay.innerText = `${activeIndex + 1} / ${myPics.length}`;
}

document.getElementById("lightbox").addEventListener("click", function(ev) {
    if (ev.target === this) {
        closeBox();
    }
});

showGrid();