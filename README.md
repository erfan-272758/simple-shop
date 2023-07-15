# Simple Shop
a small store server designed with nestjs framework , use mongodb for storage data

## Requirements

1. install mongodb server
2. run `npm i`
3. create `.env.local` file in root directory for environment variables then copy `.env` content and fill them 


## Usage
- development usage run `npm run dev`
- production usage run `npm start` 

## Documentation
- base url => `/api/v1`
### Auth
| Method | Url | Body |
| --- | ----------- | ------------- |
|  POST  |  /auth/signup  |    {fistName:string, lastName:string  | password:string, email:string}  |
|  POST  |  /auth/login |    {email:string, password:string}  |
|  GET  |  /auth/verifyEmail/:userId?token=  |


### Product
| Method | Url | Body |
| --- | ----------- | ------------- |
|  POST  |  /product  |  {title:string, description:string}  |
|  GET   |  /product  |

for more details see [postman workspace](https://www.postman.com/vilibook/workspace/simple-shop/overview)
