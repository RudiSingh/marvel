# PurplleMaterial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.


##  ---------------------------------- INSTRUCTION ---------------------------------------------- ###


## 1 . angular project is of version 8 , with --enableIvy=true 
## 2 . angular material used for the UI. 
## 3 . social login using firebase (GMAIL).ypu can register or login wil redirect to product.
       1 - if login button used  eg:- 'email: rs@gmail.com , pass: rs1234'
       2 - if register button used :- email should be valid , pasword shold not be weak.'
       3 - gmail social login.
        button click will redirect you to product page 
## 4 . live search using firebase to get marvel infinity stone information .
        live search test input : 'space', 'mind' ,'power.' 
## 5 . CRUD operation is performed when serached data is selected and added to a new mat-list.
        to add to mat list just click on the option JSONdata will be pushed to mat-list.
## 6 . new mat-list will have icon @right where you will se 3 options (add , update , delete)
        to add new stone test input : 'time' , 'soul' ...
        description as per you like..
        click add button and then you can live search the added stone in your serach list.
        click on the list and add to your botton mat-list where you can edit or delete the same..
         
         to check it is added or deleted you need to do live search. 

         
## 7 . signOut button to logout and redirect to login page. 


## npm install required for projects. 

ng new PurplleMaterial --enableIvy=true 
npm install bootstrap --save
ng add @angular/material
npm install --save hammerjs 
npm install -g firebase-tools
npm install angularfire2 firebase --save
npm install firebase @angular/fire --save
npm uninstall firebase angularfire2@next --save


