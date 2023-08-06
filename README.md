## Authentication

#### This API allows the signup, login of users and also gives us the possibility to save information to their account.

## Paths:

### /signup
Should include the **username** and **password** in a JSON format inside the body of the POST request to sign up a user:

![signup](https://github.com/e-dovi/Authentication/assets/118570519/1a9f611f-1fb8-4b7f-a4b3-61e48352d31a)


### /login
The login process is the same as the signup. For each user the body of the POST request takes a **username** and a **password**.

![login](https://github.com/e-dovi/Authentication/assets/118570519/d3927cbb-ecea-43f4-a1e5-e7ec0bc4e78d)


### /saveInfo
The user must be logged in to save any information.
The session expires every 5 minutes.
The body of the POST request takes the **username** and **info** values in a JSON format:

![saveInfo](https://github.com/e-dovi/Authentication/assets/118570519/589079f0-26de-40cd-ab99-49b1dcc5bcc0)


### /view
The user must be logged in to view any saved information.
A GET request can be made like so:

![view](https://github.com/e-dovi/Authentication/assets/118570519/6a34a034-3dd1-4b12-92c5-8f633147d39c)


### Unauthorized
If the user is not logged in, the GET request will return this 403 error:

![unauthorized](https://github.com/e-dovi/Authentication/assets/118570519/37aea0c7-5f03-4c3a-a868-e6629c25fa7f)
