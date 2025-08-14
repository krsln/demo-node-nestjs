# Demo NodeJS NestJS api

## Installation

```shell
npx @nestjs/cli new . --skip-git

npm run start:dev

# update packages
sudo npm install -g @nestjs/cli
sudo npm install -g npm-check-updates

npx npm-check-updates -u
npm install
```

## Dependencies

```shell
# Install Config Module
npm install @nestjs/config

# Install Swagger Dependencies
npm install @nestjs/swagger swagger-ui-express

# Healthchecks (Terminus)
npm install @nestjs/terminus
npm install @nestjs/axios

nest g resource modules/health --no-spec 


```
