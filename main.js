const urlParticipants = 'https://mock-api.driven.com.br/api/v6/uol/participants/b29842f4-b480-49f8-94db-fcfd7c422827'
const urlMessages = 'https://mock-api.driven.com.br/api/v6/uol/messages/b29842f4-b480-49f8-94db-fcfd7c422827'
const urlStatus = 'https://mock-api.driven.com.br/api/v6/uol/status/b29842f4-b480-49f8-94db-fcfd7c422827'
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
    peopleSelected.querySelector('svg').classList.add('hidden')
    peopleSelected = element
    console.log(peopleSelected)
    peopleSelected.querySelector('svg').classList.remove('hidden')
  }
}

const selectVisibility = (element) => {
  if (element !== visibilitySelected) {
    visibilitySelected.querySelector('svg').classList.add('hidden')
    visibilitySelected = element
    console.log(visibilitySelected)
    visibilitySelected.querySelector('svg').classList.remove('hidden')
  }
}

const searchMessages = () => {
  const promisse = axios.get(urlMessages,);
  promisse.then(res => console.log(res));
}

const sendMessage = (event) => {
  event.preventDefault()
  console.log(event)
}

searchMessages()