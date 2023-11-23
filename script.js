function createWordContainer() {
    let wordContainer = document.getElementById("wordContainer");
    if (!wordContainer) {
        wordContainer = document.createElement("div");
        wordContainer.id = "wordContainer";
        document.body.appendChild(wordContainer);
    }
}

function toggleErrorModal(errorType) {
    let errorModal = new bootstrap.Modal(document.getElementById(errorType));
    errorModal.toggle();
}

function addWord() {
    let wordInput = document.querySelector(".cutom-input:nth-of-type(1)");
    let definitionInput = document.querySelector(".cutom-input:nth-of-type(2)");
    if (wordInput.value.trim() === "") {
        toggleErrorModal("errorModal");
        return;
    }
    createWordContainer();
    let existingWords = document.querySelectorAll(".word");
    for (let i = 0; i < existingWords.length; ++i) {
        if (existingWords[i].textContent.toLowerCase() === wordInput.value.trim().toLowerCase()) {
            toggleErrorModal("duplicateWordModal");
            return;
        }
    }
    let newWord = document.createElement("p");
    newWord.innerHTML = '<span class="word">' + wordInput.value + '</span><span class="separator"> | </span><span class="definition">' + definitionInput.value + "</span>";
    document.getElementById("wordContainer").appendChild(newWord);
    wordInput.value = "";
    definitionInput.value = "";
}

function searchWord() {
    let wordInput = document.querySelector(".cutom-input:nth-of-type(1)");
    let searchValue = wordInput.value.trim().toLowerCase();
    let existingWords = document.querySelectorAll(".word");
    for (let i = 0; i < existingWords.length; ++i) {
        let word = existingWords[i].textContent.toLowerCase();
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
