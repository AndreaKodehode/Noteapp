let myNotes = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");

//hente informasjon som ligger i localStorage
let storedNotes = JSON.parse(localStorage.getItem("notes"));

//sjekker om det ligger notater inne og viser dem viss det ligger inne
if (storedNotes) {
  myNotes = storedNotes;
  renderNotes();
}

//lagrer notatene i localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(myNotes));
}
//event listener for inputen som har en minimum lengde på 3 karakterer. legger til notatet i et array, tømmer feltet, lagrer notatet også viser det.
inputBtn.addEventListener("click", function () {
  if (inputEl.value.length < 3) return;

  myNotes.push(inputEl.value);
  inputEl.value = "";
  saveNotes();
  renderNotes();
});
//viser notatene. sletter en child også legger til på nytt sånn at informasjon ikke skal bli visst dobbelt.
function renderNotes() {
  while (ulEl.firstChild) {
    ulEl.removeChild(ulEl.firstChild);
  }

  for (let i = 0; i < myNotes.length; i++) {
    const li = document.createElement("li");
    li.textContent = myNotes[i];
    ulEl.appendChild(li);
    removeBtn(li, i);
  }
}
//event listener submit for skjema som unngår at siden blir lastet inn på ny når hendelsen er utført.
const formEl = document.getElementById("form-el");
formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  inputBtn.click();
});

const listChild = ulEl.children;
//en knapp som fjerner notatet fra listen
function removeBtn(li, noteIndex) {
  const remove = document.createElement("button");
  remove.className = "remove-btn";
  li.appendChild(remove);
  remove.addEventListener("click", function () {
    removeNoteFromStorage(noteIndex);
    myNotes.splice(noteIndex, 1);
    renderNotes();
  });
  return li;
}
//denne funksjonen fjerner notatet fra localStorage og er tilkoblet removebtn funksjonen
function removeNoteFromStorage(noteIndex) {
  let storedNotes = JSON.parse(localStorage.getItem("notes"));
  if (storedNotes) {
    storedNotes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(storedNotes));
  }
}
