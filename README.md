# Lista de ramais

Esta é uma lista de ramais feita em Node.JS. É *extremamente* simples e foi feita para atender a uma demanda bem específica na ocasião em que a fiz.

O controle de contatos na lista é feito manualmente através do arquivo `backend/data/data.json`. Peço perdão, pode ser que um dia no futuro eu faça um CRUD para editar mais facilmente.

## Instalação

**Observações**: O servidor usado neste processo está rodando Debian 10.

1. Instale o `git`.  
Comandos:
```
sudo apt install -y git
```

2. Instale o Node.JS e o NPM.  
Comando:
```
sudo apt install -y nodejs
sudo apt install -y npm
```

3. Teste a instalação do Node. O retorno do comando deve ser o número da versão.  
Comando:
```
node --version
```

4. Clone este repositório. Recomendação: armazenar no diretório `/var/www/`.  
Comandos:
```
sudo mkdir /var/www
cd /var/www
sudo git clone https://github.com/pckcml/lista-de-ramais.git
```

5. Instale as dependências do Node para o backend.  
Comandos:
```
sudo npm install --global http-server
cd /var/www/lista-de-ramais/backend
sudo npm install
```

6. Copie os arquivos de serviço para o diretório do Systemd.  
Comandos:
```
cd /var/www/lista-de-ramais/
sudo cp services/lista-ramais-backend.service /etc/systemd/system/
sudo cp services/lista-ramais-frontend.service /etc/systemd/system/
```

7. Ative e habilite os serviços.  
Comandos:
```
sudo systemctl enable lista-ramais-backend.service lista-ramais-frontend.service
sudo systemctl start lista-ramais-backend.service lista-ramais-frontend.service
```

8. Crie o host A chamado `ramais` no DNS (ou no seu arquivo `hosts`, para testes), apontando para o IP do servidor.

9. Acesse a aplicação no endereço [http://ramais/](http://ramais/).

### Observação sobre sistema operacional

Esta aplicação foi adaptada para funcionar no Linux. Ela já foi compatível com Windows, mas não vou documentar este processo aqui. Se ainda assim quiser usar o Windows, pesquise sobre como usar o NSSM para *daemonizar* aplicações em Node.JS. Você vai precisar servir o backend chamando o arquivo `backend/index.js`, e então servir o diretório `frontend/public` com um servidor web. Neste ponto, o próprio Node, com auxílio do `http-server` deve funcionar.

## Adicionando, removendo, e editando ramais

Os campos existentes na lista atualmente são:
- Nome
- Departamento
- E-mail
- Ramal

Esses campos (infelizmente) não são tão práticos de editar. Perdão.

Uma entrada normal no arquivo de dados `backend/data/data.json` segue o seguinte formato:
```
{
    "nome": "Fulano",
    "departamento": "Diretoria",
    "ramal": "201",
    "email": "fulano@empresa.com"
}
```

Siga o formato JSON para adicionar, remover, e editar entradas. Cuidado com as vírgulas entre objetos.

Sempre que editar o arquivo, reinicie o serviço do backend com o comando:
```
systemctl restart lista-ramais-backend.service
```
