# next-auth-bolerplate

Desctiption of **reducers** folder

In reducers folder All the business logic are done which need for the ui like **read, write, update, and delete data**.

Desctiption of **store** folder
In this folder all the states from the reducers folder are store here by using context api.

Desctiption of **env** file

`GOOGLE_ID=` GOOGLE_ID is OAuth 2.0 Client ID. It is need to use when google provider is required in **next auth** for more information vist [here](https://next-auth.js.org/providers/google)

`GOOGLE_SECRET=` GOOGLE_SECRET is OAuth 2.0 Credential secret. It is need to use when google provider is required in **next auth** for more information vist [here](https://next-auth.js.org/providers/google).

`GITHUB_SECRET`=GITHUB_SECRET is github OAuth App cilent token. It is need to use when github provider is required in **next auth** for more information vist [here](https://next-auth.js.org/providers/github).

`GITHUB_ID`= GITHUB_ID is github OAuth App cilent id. It is need to use when github provider is required in **next auth** for more information vist [here](https://next-auth.js.org/providers/github).

`NEXT_AUTH_SECRET`=Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value for the secret option in NextAuth and Middleware. run this code on the terminal `$ openssl rand -base64 32` to genarate the secret code.

`NEXT_PUBLIC_TOKEN`= This is a custom token .This token use for read,write,update and delete data on Database.

`NEXTAUTH_URL`= This the local url it's only work on development mode `ex: http://localhost:3000`
