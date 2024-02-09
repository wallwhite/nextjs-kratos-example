This is an example of implementation server side authentication in Next.js application using Ory Kratos.

## Getting Started


### Docker 

Docker is a software thar provides us virtualization to deliver software in packages called containers. 

You can install docker by two ways:

- Manually. Download and install the latest stable Docker for Mac from the [Docker website](https://docs.docker.com/desktop/install)
- With package manager
  ```bash
  brew install docker docker-compose
  ```

Make sure all docker tools are installed on your Mac now:
```bash
docker --version
```
The result should be similar to:
```
Docker version 24.0.5, build ced0996
```

### Node.js

Make sure that runtime for Node.js is installed or [install](https://nodejs.org/en/download/) in your Mac now:
Or you can install it with brew command(if you have already installed [brew](#-brew-))

```bash
brew install node
```

### Running Ory stack

First, run the containers with Ory services: Kratos, Kratos Admin UI, Mailslurper.

```bash
docker compose up --build --force-recreate
```

### Running next.js application

Once you have your containers are up, you should run the next app:

Install dependencies:
```bash
pnpm install 
```

Run the app:
```bash
pnpm dev
```

App will be opened on `4455` port.
Open [http://localhost:4455](http://localhost:4455) with your browser to see the result.
