const SERVER_IP = 'ramais';
const SERVER_PORT = '8081';

//

const tabelaRamais = document.getElementById('lista-ramais');
const divLinks = document.getElementById('links');
var users = [];
var links = [];

window.addEventListener('load', async () => {
  await fetchUsers();
  await fecthLinks();
  renderTable(users);
  renderLinks(links);
  inputFocus();
  handleSearch();
});

const fetchUsers = async () => {
  const res = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/users`);
  const json = await res.json();
  users = json
    .map(({ nome, departamento, ramal, email }, index) => {
      return {
        id: index,
        nome,
        nomeLowerCase: nome.toLowerCase(),
        departamento,
        departamentoLowerCase: departamento.toLowerCase(),
        ramal,
        email,
        emailLowerCase: email.toLowerCase(),
      };
    })
    .sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
};

const fecthLinks = async () => {
  const res = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/links`);
  const json = await res.json();
  links = json.map(({ title, url }, index) => {
    return { id: index, title, url };
  });
};

const renderTable = async (userArray) => {
  console.log(userArray);
  tabelaRamais.innerHTML = '';
  userArray.forEach(({ nome, departamento, ramal, email }) => {
    let tr = document.createElement('tr');
    let tdNome = tr.appendChild(document.createElement('td'));
    let tdDepartamento = tr.appendChild(document.createElement('td'));
    let tdRamal = tr.appendChild(document.createElement('td'));
    let tdEmail = tr.appendChild(document.createElement('td'));
    tdNome.textContent = nome;
    tdDepartamento.textContent = departamento;
    tdRamal.textContent = ramal;
    tdEmail.textContent = email;
    tabelaRamais.appendChild(tr);
  });
};

const renderLinks = async (linkArray) => {
  divLinks.innerHTML = '';
  linkArray.forEach(({ title, url }) => {
    let a = document.createElement('a');
    let p = document.createElement('p');
    let linkTitle = document.createTextNode(title);
    a.appendChild(linkTitle);
    a.title = title;
    a.href = url;
	a.target = "_blank";
    p.appendChild(a);
    divLinks.appendChild(p);
    divLinks.classList.add('teste');
  });
};

const handleSearch = () => {
  const handleType = async () => {
    const query = textInput.value.toLowerCase();
    console.log(query);
    const filteredUsers = users.filter((user) => {
      return (
        user.nomeLowerCase.includes(query) ||
        user.departamentoLowerCase.includes(query) ||
        user.ramal.includes(query) ||
        user.emailLowerCase.includes(query)
      );
    });

    /* Módulo para renderizar somente por letra inicial
    const inicial = query.substring(0, 1);
    const filteredUsers = users.filter((user) => {
      return user.nomeLowerCase.substring(0, 1) === inicial;
    });*/
    await renderTable(filteredUsers);
  };

  const textInput = document.getElementById('input');
  textInput.addEventListener('keyup', handleType);
};

const inputFocus = () => {
  const textInput = document.getElementById('input');
  textInput.textContent = '';
  textInput.focus();
};
