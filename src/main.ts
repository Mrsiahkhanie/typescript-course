import './index.css';
import { v4 as uuid4} from 'uuid';

type User = {
  id: string,
  username: string,
  email: string,
}

const form = document.querySelector<HTMLFormElement>('#formAddUser');
const username = document.querySelector<HTMLInputElement>('#username');
const email = document.querySelector<HTMLInputElement>('#email');
const usersBox = document.querySelector<HTMLUListElement>('#usersBox');

let users: User[] = loadUsersStroage();

users.forEach(addUser)

form?.addEventListener('submit', e => {
  e.preventDefault();

  if(username?.value === undefined || email?.value === undefined) return
  if(username.value === '' || email.value === '') {
    return alert('Please Fill the fileds!')
  }
  const newUser: User = {
    id: uuid4(),
    username: username.value,
    email: email.value,
  }

  users.push(newUser);

  addUser(newUser);
  saveUsersStorage();

  username.value = '';
  email.value = '';
});

function addUser(item:User) {
  const li = document.createElement('li');
  const userSpan = document.createElement('p');
  const emailSpan = document.createElement('p');

  userSpan.append(item.username)
  emailSpan.append(item.email);

  li.append(userSpan, emailSpan);

  usersBox?.append(li);

  usersBox?.classList.add('bg-slate-800')

  li.classList.add(
    'p-3',
    'rounded-md',
    'bg-slate-600'
  )

  userSpan.classList.add('text-slate-300', 'text-lg')
  emailSpan.classList.add('text-slate-300', 'text-lg')
}

function saveUsersStorage() {
  window.localStorage.setItem(`users`, JSON.stringify(users));
}

function loadUsersStroage(): User[] {
  const data = window.localStorage.getItem('users');

  if(data == null) {
    return []
  }

  return JSON.parse(data);
}