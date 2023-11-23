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
    if (wordInput.value.trim() === "") {
        toggleErrorModal("errorModal");
        return;
    }
    createWordContainer();
    const existingWords = document.querySelectorAll(".word");
    for (let i = 0; i < existingWords.length; ++i) {
        if (existingWords[i].textContent.toLowerCase() === wordInput.value.trim().toLowerCase()) {
            toggleErrorModal("duplicateWordModal");
            return;
        }
    }
    const newWordContainer = document.createElement("div");
    const newWord = document.createElement("p");
    const deleteButton = document.createElement("button");
    newWordContainer.classList.add("word-container");
    newWord.innerHTML = '<span class="word">' + wordInput.value + '</span><span class="separator"> | </span><span class="definition">' + definitionInput.value + "</span>";
    deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
    deleteButton.innerHTML = "🗑️ Delete";
    deleteButton.addEventListener("click", function () {
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
    for (let i = 0; i < existingWords.length; ++i) {
        const word = existingWords[i].textContent.toLowerCase();
        if (word === searchValue) {
            existingWords[i].scrollIntoView({ behavior: "smooth", block: "center" });
            existingWords[i].classList.add("highlighted");
            setTimeout(() => {
                existingWords[i].classList.remove("highlighted");
            }, 2000);
            return;
        }
    }
    toggleErrorModal("notExist");
}
