# Node Photo Album

### Technology used:
- NodeJS (Express, JIMP)
- MongoDB
- Bootstrap
- FontAwesome

### Functionality
- Upload (multiple) image - `http://localhost:3090/add`
    - Title
    - TAG
    - Description
- Resize image while uploading
- Saves both resized and original size image
- List image - `http://localhost:3090`


### API
- Add image API
    - Access point: `http://localhost:3090/api/add`
- GET image list API
    - Access point: `http://localhost:3090/api`

### Usage
- Get NodeJS (npm comes with it) and MongoDB up and running
- Edit the `config.js` file if needed
- run `npm install`
- run `npm start` (I am using nodemon, you can change it in package.json)
- Access the application at `http://localhost:3090`