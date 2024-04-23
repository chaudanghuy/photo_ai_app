
# PhotoMong

Setup guide for PhotoMong


## Installation

### Backend


```bash
  cd backend
  python manage.py runserver
```

### Admin

```bash
  rm -rf node_modules
  npm cache clean --force
  npm install
  npm start
```

### Frontend (App)

```bash
  cd app
  npm install
  npm start
```


## Usage/Examples

### Backend

```javascript
const axios = require('axios');
let data = JSON.stringify({
  "email": "test@gmail.com",
  "password": "123"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/api/v1/accounts/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```



