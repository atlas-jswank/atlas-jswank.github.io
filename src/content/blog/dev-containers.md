---
title: "Development Containers in VS Code"
description: "Lorem ipsum dolor sit amet"
pubDate: "May 02 2024"
heroImage: "/dev-containers.png"
author: Jeremiah Swank
authorImage: /jswank.jpg
---

## What are Development Containers?

Development containers allow you to develop your application inside a docker container running on your local computer. If you run your application in production in Alpine Linux, then it make sense to also use Alpine linux in development.

One of the benefits to development containers is the configuration can be checked into source control so all developers develop in the same environment independent of their local operating system.

Development containers remove the need to install dependencies on you local machine and dramatically shorten the time it takes to start local development.

This guide will cover using development containers in VS Code but the [Development Container Specification](https://containers.dev/implementors/spec/) is open source and being adopted in other IDEs such as IntelliJ.

![placeholder](/dev-container-stages.png)

## Requirements

Make sure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Running code in a container

Create a basic node file: `src/hello.js`:

```js
console.log("Hello World!");
```

Let's say we want to be able to run and test our node code in a container that is preconfigured with node. Let's create a local configuration for our dev container:

```zsh
mkdir .devcontainer
touch .devcontainer/devcontainer.json
```

Add the following configuration to `.devcontainer/devcontainer.json`:

```json
{
  "name": "Local Dev Container",
  "image": "node:21-alpine",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}"
}
```

The will use the `node:21-alpine` image as our local dev environment. This container comes with Node 21 preinstalled on Alpine linux.

Open the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Reopen in Container`.

![placeholder](/dev-containers-1.png)

VS Code will relaunch. Your terminal should now be a linux shell. Run `node src/hello.js` from the terminal and see the file runs succesfully.

```bash
/workspaces/devcontainers-demo $ node src/hello.js
Hello World!
/workspaces/devcontainers-demo $
```

The `node:21-alipine` image has everything need to run node code without any more setup.

## Exiting/Reopening the container

At any point you may want to exit the container. To exit the development contiainer. Open the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Reopen Folder Locally`.

![placeholder](/dev-containers-3.png)

To reopen the container, open the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Reopen in Containers`.

![placeholder](/dev-containers-1.png)

## Custom Dockerfile: Installing git

The `node:21-alpine` image is great for running a node application but it lacks some of the tools needed for development. For example, you will likely want to use git from inside the container.

We can create a custom docker image that includes the tools we need. Create a docker file:

```bash
touch .devcontainer/Dockerfile
```

Add the following to the `.devcontainer/Dockerfile`:

```dockerfile
FROM node:21-alpine

RUN apk update && apk upgrade
# Install git
RUN apk add git
# Install ssh
RUN apk add openssh openrc
```

Then update the `.devcontainer/devcontainer.json` to use the new image:

```json
{
  "name": "Local Dev Container",
  "dockerFile": "./Dockerfile",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}"
}
```

Now you will need to rebuild the container for the changes to take effect. From the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Rebuild Container`. VS Code will relaunch in the new container. You can now use the git cli in the terminal.

```zsh
/workspaces/devcontainers-demo $ which git
/usr/bin/git
/workspaces/devcontainers-demo $ git init
...
Initialized empty Git repository in /workspaces/devcontainers-demo/.git/
/workspaces/devcontainers-demo $
```

## Using docker compose to mount local files

At this point you will need to resetup your local git configuration and ssh keys to work with github. To get around this we can load our local machine's git configuration and ssh keys into the container. To do this we will use a docker compose file. Create a `docker-compose.yml` file:

```bash
touch .devcontainer/docker-compose.yml
```

Add the following to the `.devcontainer/docker-compose.yml`:

```yaml
version: "3.8"
services:
  devcontainer:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ../..:/workspaces:cached
      # Avoid setting up Git in the container
      - ~/.gitconfig:/root/.gitconfig
      # Avoids setting up ssh in container
      - ~/.ssh:/root/.ssh
    command: sleep infinity
```

Here we are creating a devcontainer service that uses the Dockerfile we created. We then mount three volumes onto the container: one for our worksapce files, one for git configuration files and one for our ssh keys. Now, update the `.devcontainer/devcontainer.json` to use the new docker compose file:

```json
{
  "name": "Local Dev Container",
  "dockerComposeFile": "docker-compose.yml",
  "service": "devcontainer",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}"
}
```

Rebuild the container by opening the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Rebuild Container`. VS Code will relaunch in the new container. You should now be able to clone and push to github using ssh.

## Adding a postgres database

One the benefits to using development containers is the ability to spin up multiple containers conatining resources such as postgresql, mongodb, redis, etc.

Add a postgress service to the `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  devcontainer:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ../..:/workspaces:cached
      # Avoid setting up Git in the container
      - ~/.gitconfig:/root/.gitconfig
      # Avoids setting up ssh in container
      - ~/.ssh:/root/.ssh
    command: sleep infinity
    links:
      - postgres
  postgres:
    image: postgres:16.2
    environment:
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=server
```

**IMPORTANT**: Dont forget the links value in the devcontainer section so that the postgres service can be accessed from the devcontainer service.

Now rebuild the container (Open the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Rebuild Container`).

We can test the postgres service is up and running by running some node.js code.
Create a `src/postgres.js` file:

```bash
touch src/postgres.js
```

Install the `pg` package:

```bash
npm install pg
```

Paste in the following code:

```js
const { Client } = require("pg");

(async () => {
  const connectionString = "postgresql://dev:server@postgres:5432/postgres";
  const client = new Client(connectionString);
  await client.connect();
  await client.query("DROP TABLE IF EXISTS employee;");
  await client.query("CREATE TABLE employee (name TEXT,age INT);");
  await client.query("INSERT INTO employee VALUES ('John Doe', 34);");
  await client.query("INSERT INTO employee VALUES ('Jack Smith', 42);");

  const data = await client.query("SELECT * FROM employee");
  for (let r of data.rows) {
    console.log(`${r.name} ${r.age}`);
  }

  await client.end();
})().catch(console.error);
```

Runing the code should create a database table, insert some rows, read from the table and output the data.

```zsh
/workspaces/devcontainers-demo $ node src/postgres.js
John Doe 34
Jack Smith 42
/workspaces/devcontainers-demo $
```

## Adding mongodb

We can follow a similar process for other services such as mongodb. Add a mongodb service to the `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  devcontainer:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ../..:/workspaces:cached
      # Avoid setting up Git in the container
      - ~/.gitconfig:/root/.gitconfig
      # Avoids setting up ssh in container
      - ~/.ssh:/root/.ssh
    command: sleep infinity
    links:
      - postgres
      - mongo
  postgres:
    image: postgres:16.2
    environment:
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=server
  mongo:
    image: mongo:latest
    volumes:
      - /data/db
```

Rebuild the container (Open the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Rebuild Container`).

Create a `src/mongo.js` file:

```bash
touch src/mongo.js
```

Install the `mongodb` package:

```bash
npm install mongodb
```

Paste in the following code to `src/mongo.js`:

```js
const { MongoClient } = require("mongodb");

(async () => {
  const url = "mongodb://mongo:27017";
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db("sales-db");

  await db.collection("sales").deleteMany();
  await db.collection("sales").insertMany([
    {
      item: "abc",
      price: 10,
      quantity: 2,
      date: new Date("2014-04-04T08:00:00Z"),
    },
    {
      item: "jkl",
      price: 20,
      quantity: 1,
      date: new Date("2014-04-02T09:00:00Z"),
    },
  ]);

  const salesOnApril4th = await db.collection("sales").countDocuments({
    date: { $gte: new Date("2014-04-04"), $lt: new Date("2014-04-05") },
  });

  console.log(`${salesOnApril4th} sale(s) occurred in 2014.`);

  client.close();
})().catch(console.error);
```

Running the code should insert some records into mondo and then read then back out:

```zsh
/workspaces/devcontainers-demo $ node src/mongo.js
2 sale(s) occurred in 2014.
/workspaces/devcontainers-demo $
```

## Adding extensions

You may have noticed when using development containers your vs code extentions are not installed by default. You can manually install extensiongs from Extensions explorer. Just select "Install in Dev Container" on the extension page.

You can also set some extensions to automatically install in the dev container. We are going to add a postgres database explorer and monbodb explorer so we can inspect our resources while in the container. Update the `.devcontainer/devcontainer.json` to include the following extensions:

```json
{
  "name": "Local Dev Container",
  "dockerComposeFile": "docker-compose.yml",
  "service": "devcontainer",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
  "customizations": {
    "vscode": {
      "extensions": ["mongodb.mongodb-vscode", "ckolkman.vscode-postgres"]
    }
  }
}
```

Rebuild the container (Open the command pallete in VS Code `(Ctrl/Command + Shift + P)` and select `Dev Containers: Rebuild Container`).

After the container is rebuilt it will have the PostgreSQL Explorer and MongoDB explorer installed.

Open the MongoDb panel from the side of VS Code. Add the mogodb using the connection string `mongodb://mongo:27017`. You can now explor the `sales-db` collection we created in our code.

![placeholder](/dev-containers-6.png)

Open the PostgreSQL panel from the side of VS Code. Add the postgres using:

```
hostname: postgres
user: dev
password: server
port: 5432
ssl : Standard Connections
```

You should now be able to explore the `employees` table we created in our code.

![placeholder](/dev-containers-7.png)

## Recap

At this point you should have a functioning node js environment working with a postgres db and mpngodb but there is so much more you can do with development containers (Like use [localstack](https://github.com/localstack/localstack) to run a fully function AWS Cloud envinrpment locally in docker)

For more information checkout the [development containers docs](https://containers.dev/).
