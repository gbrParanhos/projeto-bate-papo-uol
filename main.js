const urlParticipants = 'https://mock-api.driven.com.br/api/v6/uol/participants/b29842f4-b480-49f8-94db-fcfd7c422827'
const urlMessages = 'https://mock-api.driven.com.br/api/v6/uol/messages/b29842f4-b480-49f8-94db-fcfd7c422827'
const overlay = document.querySelector('.overlay');
const settings = document.querySelector('.settings');
let peopleSelected = document.querySelector('.all-peoples');
let visibilitySelected = document.querySelector('.public');
let ultimaMensagem = document.querySelector('.messages').lastElementChild;
ultimaMensagem.scrollIntoView();

const openSettings = () => {
  overlay.classList.remove('hidden');
  settings.classList.remove('hidden');
}

const closeSettings = () => {
  overlay.classList.add('hidden');
  settings.classList.add('hidden');
}

const selectPeople = (element) => {
  if (element !== peopleSelected) {
    peopleSelected.querySelector('img').classList.add('hidden')
    peopleSelected = element
    console.log(peopleSelected)
    peopleSelected.querySelector('img').classList.remove('hidden')
  }
}

const selectVisibility = (element) => {
  if (element !== visibilitySelected) {
    visibilitySelected.querySelector('img').classList.add('hidden')
    visibilitySelected = element
    console.log(visibilitySelected)
    visibilitySelected.querySelector('img').classList.remove('hidden')
  }
}

const searchMessages = () => {
  const promisse = axios.get(urlMessages,)
  .then(res => console.log(res))
}

searchMessages()