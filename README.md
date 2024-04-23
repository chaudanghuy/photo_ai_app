
# PhotoMong

Setup guide for PhotoMong


## Installation

### Backend


```bash
  cd backend
  pip install -r /path/to/requirements.txt
  python manage.py runserver
```

### Frontend (App)

```bash
  cd app
  rm -rf node_modules
  npm cache clean --force
  npm install
  npm start
```


## Usage/Examples

```bash
   run.bat
```

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



