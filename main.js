const urlParticipants = 'https://mock-api.driven.com.br/api/v6/uol/participants/dee0355e-df84-40a0-adef-73c5f0b568c2'
const urlMessages = 'https://mock-api.driven.com.br/api/v6/uol/messages/dee0355e-df84-40a0-adef-73c5f0b568c2'
const urlStatus = 'https://mock-api.driven.com.br/api/v6/uol/status/dee0355e-df84-40a0-adef-73c5f0b568c2'
const overlay = document.querySelector('.overlay');
const settings = document.querySelector('.settings');
const olMessages = document.querySelector('.messages');
const allPeoples = document.querySelector('.all-peoples');
const peoples = document.querySelector('.peoples');
const public = document.querySelector('.public');
const direct = document.querySelector('.direct');
let visibilitySelected = public;
let userName;
let firstMessage = document.querySelector('.messages li');
let lastMessage = document.querySelector('.messages li');
let participants = [];
let messages = [];
let typeMessage = {
  'message': 'para',
  'private_message':'reservadamente para'
}

const joinRoom = () => {
  userName = {name: prompt('Como deseja ser chamado?')}
  if (!userName.name) {
    joinRoom();
  }
  axios.post(urlParticipants,userName)
  .then(() => {
    searchMessages();
    setInterval(searchMessages, 3000);
    listParticipants();
    setInterval(listParticipants, 3000);
    setInterval(keepConnection, 5000);
  })
  .catch(error => {
    if ( error.response.status === 400 ) {
      alert('Já existe um usuário logado com este nome.');
    } else {
      alert('Houve um erro! Tente novamente.')
    }
    joinRoom();
  })
}

const mapErrorLogin = () => {
}

const keepConnection = () => {
  axios.post(urlStatus,userName);
}

const listParticipants = () => {
  axios.get(urlParticipants)
  .then(response => {
    participants = [];
    response.data.forEach(formatParticipants);
    peoples.innerHTML = participants.join('');
  })
}

const formatParticipants = (participant) => {
  if(participant.name !== userName.name) {
  participants.push(`<li onclick="selectPeople(this)" class="direct-people ${participant.name === document.querySelector('.selected-people p').innerHTML?"selected-people":''}">
    <div class="selection">
      <ion-icon name="person-circle"></ion-icon>
      <p>${participant.name}</p>
    </div>
    <svg ${participant.name !== document.querySelector('.selected-people p').innerHTML?"class='hidden'":''} width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L4.7 9L2 6.375" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </li>`)
  }
}

const openSettings = () => {
  overlay.classList.remove('hidden');
  settings.classList.remove('hidden');
}
  
const closeSettings = () => {
  overlay.classList.add('hidden');
  settings.classList.add('hidden');
}

const selectPeople = (element) => {
  if ( element !== document.querySelector('.selected-people') ) {
    document.querySelector('.selected-people svg').classList.add('hidden');
    document.querySelector('.selected-people').classList.remove('selected-people');
    element.classList.add('selected-people');
    element.querySelector('svg').classList.remove('hidden');
    document.querySelector('form span').innerHTML = `Enviando para ${document.querySelector('.selected-people p').innerHTML} (${visibilitySelected.querySelector('p').innerHTML})`;
    if ( element.classList.contains('all-peoples') && public.querySelector('svg').classList.contains('hidden') ) {
      direct.querySelector('svg').classList.add('hidden');
      public.querySelector('svg').classList.remove('hidden');
      visibilitySelected = public;
      document.querySelector('form span').innerHTML = `Enviando para ${document.querySelector('.selected-people p').innerHTML} (${visibilitySelected.querySelector('p').innerHTML})`;
    }
  }
}

const selectVisibility = (element) => {
  if ( element !== visibilitySelected && allPeoples.querySelector('svg').classList.contains('hidden') ) {
    visibilitySelected.querySelector('svg').classList.add('hidden');
    visibilitySelected = element;
    visibilitySelected.querySelector('svg').classList.remove('hidden');
    document.querySelector('form span').innerHTML = `Enviando para ${document.querySelector('.selected-people p').innerHTML} (${visibilitySelected.querySelector('p').innerHTML})`;
  } else if ( !allPeoples.querySelector('svg').classList.contains('hidden') ) {
    alert('Não é possível enviar uma mensagem Reservadamente para Todos');
  }
}

const searchMessages = () => {
  axios.get(urlMessages)
  .then(response => {
    const differentFirstMessage = firstMessage.querySelector('span').innerHTML !== `(${response.data[0].time})`;
    const differentLastMessage = lastMessage.querySelector('span').innerHTML !== `(${response.data[response.data.length-1].time})`
    if(differentFirstMessage || differentLastMessage) {
      messages = response.data.map(formatMessages);
      const filteredMessages = messages.filter( message => (
        !message.includes('private_message') ||
        message.includes(`<strong> ${userName.name} </strong>`) ||
        message.includes(`<strong>${userName.name}: </strong>`)
      ));
      printMessages(filteredMessages);
    }
  })
}

const formatMessages = (message) => {
  const timeNumber = Number(message.time.replace(/\:/g,''))-30000
  const timeString = timeNumber.toString().padStart(6, '0');
  const formattedTime = `${timeString.slice(0, 2)}:${timeString.slice(2, 4)}:${timeString.slice(4, 6)}`
  return `
  <li class="${message.type}">
  <p><span>(${formattedTime})</span><strong> ${message.from} </strong>${message.type!=='status'?`${typeMessage[message.type]} <strong>${message.to}: </strong>`:''}${message.text}</p>
  </li>
  `
}

const printMessages = (filteredMessages) => {
  olMessages.innerHTML = filteredMessages.join('')
  firstMessage = document.querySelector('.messages').firstElementChild;
  lastMessage = document.querySelector('.messages').lastElementChild;
  lastMessage.scrollIntoView();
}

const sendMessage = (event) => {
  event.preventDefault();
  const peopleSelectedName = document.querySelector('.selected-people p').innerHTML;
  const visibilitySelectedName = visibilitySelected.querySelector('p').innerHTML;
  const messageObj = {
    from: userName.name,
    to: peopleSelectedName,
    text: event.target[0].value,
    type: visibilitySelectedName==='Reservadamente'?"private_message":"message"
  }
  axios.post(urlMessages,messageObj)
  .then(() => {
    document.querySelector('input').value = '';
    searchMessages();
  })
  .catch(() => window.location.reload())
}

joinRoom()