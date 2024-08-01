const categoryItemsContainer = document.getElementById(
    "summary-categories-container"
);
const template = document.getElementById("category-item");
const averageScore = document.getElementById("average-score");

async function getCategoryScores() {
    const response = await fetch("./data.json");
    const data = await response.json();

    const scoresArray = setArrayScores(data);

    const averageScore = getAverageScore(scoresArray);

    setAverageScore(averageScore);
}

function setArrayScores(dataArray) {
    const scoresArray = new Array();
    dataArray.forEach((item) => {
        scoresArray.push(item.score);
    });
    return scoresArray;
}

function getAverageScore(array) {
    let total = 0;
    array.forEach((score) => {
        total += score;
    });

    return Math.floor(total / array.length);
}

function setAverageScore(score) {
    averageScore.textContent = score;
}

function setCategoryData(data) {
    data.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const categoryName = clone.getElementById("category-name");
        const categoryIcon = clone.getElementById("category-icon");
        const categoryScore = clone.getElementById("category-score");

        categoryName.textContent = item.category;
        categoryIcon.src = item.icon;
        categoryIcon.alt = item.alt;
        categoryScore.textContent = item.score;

        appendChild(categoryItemsContainer, clone);
    });
}

function appendChild(parentItem, childItem) {
    parentItem.appendChild(childItem);
}

async function getCategoryData() {
    const response = await fetch("./data.json");
    const data = await response.json();

    setCategoryData(data);
}

getCategoryScores();
getCategoryData();
