# user-microservices


## API Reference

#### Register

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. A valid email |
| `password` | `string` | **Required**. |

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. A valid email |
| `password` | `string` | **Required**. |


#### Get Users ids and emails

```http
  GET /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization` | `Bearer` | **Required**. A valid Bearer token provided by the Login endpoint |

This endpoint allows pagination.
