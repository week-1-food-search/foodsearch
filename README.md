# foodsearch
**AtEXplorEat** (Tugas Group Project Week 1)
----------------------------------------

## Endpoint

### *Doesn't Require Token*

#### User Routes
| Routes               | Method | Request Body                | Response Data                     | Description                                                     |
|----------------------|--------|-----------------------------|-----------------------------------|-----------------------------------------------------------------|
| `/user/register`     | POST   | `{ name, email, password }` | `{ access_token }`                | > Register with new user info                                   |
| `/user/login`        | POST   | `{ email, password }`       | `{ name, access_token }`          | Login and get an access token and name                          |
| `/user/signingoogle` | POST   | `{ id_token }`              | `{ name, newPass, access_token }` | Sign in with Google and get an access token, name, new password |

### *Require Token*

#### Recipe Routes (`{ headers: { token } }`)
| Routes                            | Method | Request Body                        | Response Data | Description                                        |
|-----------------------------------|--------|-------------------------------------|---------------|----------------------------------------------------|
| `/recipe/search?name=SEARCH_TEXT` | GET    | -                                   | `{ data }`    | Get all the user's todos (Authenticated user only) |
| `/recipe/:uri`                    | GET    | -                                   | `{ data }`    | Create a todo (Authenticated user only)            |
| `/recipe/addfav`                  | POST   | `{ uri, name, image, source, url }` | `{ row }`     | Get a single todo (Owners only)                    |
| `/recipe/deletefav/:id`           | DELETE | -                                   | -             | Update a todo with a new info (Owners only)        |