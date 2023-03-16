const SERVER_IP = '0.0.0.0';
const SERVER_PORT = '8081';

//

const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

const readFile = fs.readFile;
const writeFile = fs.writeFile;
let data = null;

const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}';
};

(async function getFile() {
  try {
    data = JSON.parse(
      await readFile('./data/data.json', 'utf-8')
    );
  } catch (err) {
    console.log(err);
  }
})();

server.get('/users', (_, res) => {
  try {
    res.send(data['users']);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.get('/links', (_, res) => {
  try {
    res.send(data['links']);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.post('/users', async (req, res) => {
  try {
    if (!!isEmptyObject(req.body)) {
      res.status(400).end();
    } else {
      data['users'].push(req.body);
      await writeFile(
        './data/data.json',
        JSON.stringify(data)
      );
      res.send(data['users']);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.post('/links', async (req, res) => {
  try {
    if (!!isEmptyObject(req.body)) {
      res.status(400).end();
    } else {
      data['links'].push(req.body);
      await writeFile(
        './data/data.json',
        JSON.stringify(data)
      );
      res.send(data['links']);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.patch('/users', async (req, res) => {
  try {
    if (!!isEmptyObject(req.body)) {
      res.status(400).end();
    } else {
      const { id, nome, ramal, celular, email } = req.body;
      const userToPatch = { nome, departamento, ramal, email };
      data['users'].splice(id, 1, userToPatch);
      await writeFile(
        './data/data.json',
        JSON.stringify(data)
      );
      res.send(data['users']);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.patch('/links', async (req, res) => {
  try {
    if (!!isEmptyObject(req.body)) {
      res.status(400).end();
    } else {
      const { id, title, url } = req.body;
      const linkToPatch = { title, url };
      data['links'].splice(id, 1, linkToPatch);
      await writeFile(
        './data/data.json',
        JSON.stringify(data)
      );
      res.send(data['links']);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.delete('/users', async (req, res) => {
  try {
    if (!!isEmptyObject(req.body)) {
      res.status(400).end();
    } else {
      const { id } = req.body;
      data['users'].splice(id, 1);
      await writeFile(
        './data/data.json',
        JSON.stringify(data)
      );
      //res.send(data['users']);
      res.end;
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.delete('/links', async (req, res) => {
  try {
    if (!!isEmptyObject(req.body)) {
      res.status(400).end();
    } else {
      const { id } = req.body;
      data['links'].splice(id, 1);
      await writeFile(
        './data/data.json',
        JSON.stringify(data)
      );
      //res.send(data['links']);
      res.end;
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

server.listen(SERVER_PORT, SERVER_IP, () => {
  console.log('API started!');
});
