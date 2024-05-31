# SecureAuthGoogleAuthenticatorHetic

# To the branch main :

To start the project :

Create .env a in the backend folder.

With the PORT of the bakend : 
```PORT=5000```

And the a token access for the backend : 
```ACCESS_TOKEN_SECRET=token```</br> 
```example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2VjcmV0IjoiZXhhbXBsZVNlY3JldCIsImlhdCI6MTY5NTAyMzgwMCwiZXhwIjoxNjk1MDI3NDAwfQ.8dKnZ_fXlzFVryVv3Fl_sD8FY9FJbdnxoY1Me_eH-9Q"```

Go to the folder backend and frontend to start the project :

``` cd backend ```<br/>
``` npm i ```<br/>
``` npm start ```<br/>

``` cd frontend ```<br/>
``` npm i ```<br/>
``` npm start ```

Now you can go on [http://localhost:3000](http://localhost:3000/) to register and login with Google Authenticator.

# To the branch dev with Docker :

Note: if you have start the project with the branch main and you want to go to the branch dev to use Docker, ```git stash``` your changes before/after ``` git checkout dev ```.

checkout to the branch dev :

``` git checkout dev ```

Create .env a in the backend folder.

With the PORT of the bakend : 
```PORT=5000```

And the a token access for the backend : 
```ACCESS_TOKEN_SECRET=token```</br> 
```example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2VjcmV0IjoiZXhhbXBsZVNlY3JldCIsImlhdCI6MTY5NTAyMzgwMCwiZXhwIjoxNjk1MDI3NDAwfQ.8dKnZ_fXlzFVryVv3Fl_sD8FY9FJbdnxoY1Me_eH-9Q"```

Start the docker : 

open docker desktop and use the commande line in the your shell :

``` docker-compose up --build ```

Now you can go on [http://localhost:3000](http://localhost:3000/) to register and login with Google Authenticator.

Note: if you are in the logout step and the project doesnt work, you can delete the localStorage token in your browser and refresh the page.

