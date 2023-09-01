//this
let currentDataArray;
const buttonContainer = document.getElementById('button-container');
const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    data.data.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = `
        <button onclick="videoLoader('${element.category_id}')" class="btn no-animation">${element.category}</button>
        `;
        buttonContainer.appendChild(button);

    });
}

const cardContainerDiv = document.getElementById('card-container');

async function videoLoader(categoryId) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();

    //this
    currentDataArray = data.data;

    if (data.status === false) {
        noData();
        return;
    }

    //cleaning
    cardContainerDiv.innerHTML = '';
    noDataContainer.innerHTML = '';
    data.data.forEach(element => {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="w-80 bg-base-100 mx-auto ">
        <div class="relative">
            <img src="${element.thumbnail}" alt="Shoes" class="rounded-lg w-full h-[200px]">
            <div
                class="text-[10px] bg-black text-white w-[87px] text-center p-1 rounded-md absolute bottom-3 right-3 ">
                <p>3hrs 56 min ago</p>
            </div>
        </div>
        <div class="mt-4 flex">
            <div>
                <img src="${element.authors[0].profile_picture}" alt="" class="w-10 h-10 rounded-full mr-8">
            </div>
            <div>
                <h2 class="text font-semibold mb-2">
                    ${element.title}
                </h2>
                <div class="flex items-center">
                    <p class="mb-2 mr-2">${element.authors[0].profile_name}</p>
                    ${element.authors[0].verified ? '<img src="verified.svg" alt="" class="w-5 h-5 ">' : ''}
                </div>
                <p class="mb-2">${element.others.views} views</p>
            </div>
        </div>
    </div>
        `;
        cardContainerDiv.appendChild(videoDiv);
    });

}

const noDataContainer = document.getElementById('no-data-container');

function noData() {
    cardContainerDiv.innerHTML = '';
    noDataContainer.innerHTML = '';

    const noDataDiv = document.createElement('div');
    noDataDiv.innerHTML = `
    <div class="mt-10 lg:mt-20">
        <div>
            <img src="Icon.png" alt="" class="w-32 h-auto mx-auto">
        </div>
        <div>
            <h1 class="text-3xl font-bold text-center mt-8" >Oops!! Sorry, There is no<br> content here</h1>
        </div>
    </div>
    `;
    noDataContainer.appendChild(noDataDiv);
}

function sortByView() {
    //cleaning
    cardContainerDiv.innerHTML = '';
    // noDataContainer.innerHTML = '';

    currentDataArray.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));

    currentDataArray.forEach(element => {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="w-80 bg-base-100 mx-auto ">
        <div class="relative">
            <img src="${element.thumbnail}" alt="Shoes" class="rounded-lg w-full h-[200px]">
            <div
                class="text-[10px] bg-black text-white w-[87px] text-center p-1 rounded-md absolute bottom-3 right-3 ">
                <p>3hrs 56 min ago</p>
            </div>
        </div>
        <div class="mt-4 flex">
            <div>
                <img src="${element.authors[0].profile_picture}" alt="" class="w-10 h-10 rounded-full mr-8">
            </div>
            <div>
                <h2 class="text font-semibold mb-2">
                    ${element.title}
                </h2>
                <div class="flex items-center">
                    <p class="mb-2 mr-2">${element.authors[0].profile_name}</p>
                    ${element.authors[0].verified ? '<img src="verified.svg" alt="" class="w-5 h-5 ">' : ''}
                </div>
                <p class="mb-2">${element.others.views} views</p>
            </div>
        </div>
    </div>
        `;
        cardContainerDiv.appendChild(videoDiv);
    });

    console.log(currentDataArray);
}
handleCategory();