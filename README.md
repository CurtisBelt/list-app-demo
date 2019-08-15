# List App Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/5456473d-12c2-404a-a946-b6d1de3abe10/deploy-status)](https://list-app-demo.curtisbelt.dev)

https://list-app-demo.curtisbelt.dev



### Tech

- Written using Nuxt.js, a Vue.js framework.
- Netlify: Auto-deploy to production on push to master branch. Pull requests also get automatic "preview" deployments for testing.
- FaunaDB: Serverless NoSQL database, used for persistent data storage of all lists/items.

### Nuxt.js Template

https://github.com/CurtisBelt/nuxtjs-template/

- ESLint `yarn lint`
- Prettier `yarn format`
- TailwindCSS
- Axios
- Enforces [Conventional Commits](https://www.conventionalcommits.org/) via [Husky](https://github.com/typicode/husky) (git hooks).


## Usage

Note: Must have FaunaDB secret token and configure `.env` file.

```sh
# install dependencies
yarn install

# serve with hot reload at localhost:3000 / launch netlify-lambda
yarn dev

# generate static project
yarn generate
```
