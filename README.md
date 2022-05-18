# React Boilerplate

## Prérequis

> Pnpm (`npm install -g pnpm`)  
> Docker et Docker-compose  

## Installation

```bash
git clone https://github.com/Ligonya/boilerplate-react-webpack.git YOUR_PROJECT_NAME
cd YOUR_PROJECT_NAME/
rm -R .git/
cp .env.dist .env
```

## Développement

Installation des dépendances :  
```bash
pnpm install
pnpm run serve
```

## Production

```bash
docker-compose up -d
```  
Visiter http://localhost.
