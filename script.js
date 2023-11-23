let words = [];

function createWordContainer() {
    let wordContainer = document.getElementById("wordContainer");
    if (!wordContainer) {
        wordContainer = document.createElement("div");
        wordContainer.id = "wordContainer";
        document.body.appendChild(wordContainer);
    }
}

function toggleErrorModal(errorType) {
    const errorModal = new bootstrap.Modal(document.getElementById(errorType));
    errorModal.toggle();
}

function removeWordAndContainer(index, newContainer) {
    const wordContainer = document.getElementById("wordContainer");
    if (index !== -1) {
        words.splice(index, 1);
    }
    newContainer.remove();
    if (wordContainer && words.length === 0) {
        wordContainer.remove();
    }
}

function addDeleteButton(newContainer, wordValue) {
    const index = words.indexOf(wordValue);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
    deleteButton.innerHTML = "🗑️ Delete";
    deleteButton.addEventListener("click", function () {
        removeWordAndContainer(index, newContainer);
    });
    newContainer.appendChild(deleteButton);
}

function addWord() {
    const wordInput = document.querySelector(".cutom-input:nth-of-type(1)");
    const definitionInput = document.querySelector(".cutom-input:nth-of-type(2)");
    const wordValue = wordInput.value.toLowerCase();
    if (wordInput.value.trim() === "") {
        toggleErrorModal("errorModal");
        return;
    }
    if (words.includes(wordValue)) {
        toggleErrorModal("duplicateWordModal");
        return;
    }
    createWordContainer();
    const newWordContainer = document.createElement("div");
    const newWord = document.createElement("p");
    words.push(wordValue);
    newWordContainer.classList.add("word-container");
    newWord.innerHTML = '<span class="word">' + wordInput.value + '</span><span class="separator"> | </span><span class="definition">' + definitionInput.value + "</span>";
    newWordContainer.appendChild(newWord);
    document.getElementById("wordContainer").appendChild(newWordContainer);
    addDeleteButton(newWordContainer, wordValue);
    wordInput.value = "";
    definitionInput.value = "";
}

function searchWord() {
    const wordInput = document.querySelector(".cutom-input:nth-of-type(1)");
    const searchValue = wordInput.value.trim().toLowerCase();
    const existingWords = document.querySelectorAll(".word");
    const foundWord = Array.from(existingWords).find((wordElement) => {
        const word = wordElement.textContent.toLowerCase();
        return word === searchValue;
    });
    if (foundWord) {
        foundWord.scrollIntoView({ behavior: "smooth", block: "center" });
        foundWord.classList.add("highlighted");
        setTimeout(() => {
            foundWord.classList.remove("highlighted");
        }, 2000);
    } else {
        toggleErrorModal("notExist");
    }
}
