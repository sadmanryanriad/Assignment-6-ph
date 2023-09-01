const buttonContainer = document.getElementById('button-container');
const handleCategory = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    data.data.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = `
        <button onclick="videoLoader('${element.category_id}')" class="btn">${element.category}</button>
        `;
        buttonContainer.appendChild(button);
    });

    console.log(data);
}

const cardContainerDiv = document.getElementById('card-container');

async function videoLoader(categoryId){
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    console.log(categoryId);
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
                    ${element.authors[0].verified? '<img src="verified.svg" alt="" class="w-5 h-5 ">' : ''}
                </div>
                <p class="mb-2">${element.others.views} views</p>
            </div>
        </div>
    </div>
        `;
        cardContainerDiv.appendChild(videoDiv);
    });
    
}

handleCategory();