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

function addWord() {
    const wordInput = document.querySelector(".cutom-input:nth-of-type(1)");
    const definitionInput = document.querySelector(".cutom-input:nth-of-type(2)");
    const wordValue = wordInput.value.toLowerCase;
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
    const deleteButton = document.createElement("button");
    words.push(wordValue);
    newWordContainer.classList.add("word-container");
    newWord.innerHTML = '<span class="word">' + wordInput.value + '</span><span class="separator"> | </span><span class="definition">' + definitionInput.value + "</span>";
    deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
    deleteButton.innerHTML = "🗑️ Delete";
    deleteButton.addEventListener("click", function () {
        if (index !== -1) {
            words.splice(index, 1);
        }
        newWordContainer.remove();
        destroyWordContainer();
    });
    newWordContainer.appendChild(newWord);
    newWordContainer.appendChild(deleteButton);
    document.getElementById("wordContainer").appendChild(newWordContainer);
    wordInput.value = "";
    definitionInput.value = "";
}

function destroyWordContainer() {
    const wordContainer = document.getElementById("wordContainer");
    if (wordContainer && wordContainer.children.length === 0) {
        wordContainer.remove();
    }
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
