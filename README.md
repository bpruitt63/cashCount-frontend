# CashCount
---
Deployed on Heroku at [CashCount](https://cashcount.herokuapp.com/)

This is a web app I built for my job at the YMCA.  We don't do a lot of cash transactions, but we do have a cash drawer and the system for tracking the contents of the drawer has been very primitive in the past.  So, I was given the opportunity to bring us into the modern era, and I responded with this app.

The primary goal of this app is to create a simple and easy way for frontline workers to count and save the contents of the drawer (or any other cash storage, like  a safe, etc).  A super admin will register a new company and create the initial admin for that company.  That admin can then add users to the company, by entering their name and a unique user ID.  The company must be logged in initially on any new device, but it should stay logged in until cookies are cleared (or a user logs out).  A user is presented with a list of denominations, and can enter the number of each in the drawer and the program will find the total sum.  The user then enters their user ID, along with any notes they wish to pass on, and submits the count to add it to the database.  Prior counts can be searched by date, and any count with a variance over a certain threshold will automatically email any admin with that permission checked.

Admins can add and edit users, make users active/inactive, and promote users to admin.  They can also add/edit cash containers, including fields like target amount and  variance threshold for emailing.

A sample account exists for anyone interested in trying it out.  The sample company name is "demo".  To log in as an admin on the demo account, the username is "demo" and the password is "demo1234".

---
###Tech
The frontend was built using hooks based React, initialized with Create React App. Styling and responsiveness are done primarily using React Bootstrap, along with some pretty basic CSS files.

The backend is also deployed on Heroku. The backend was built using Node.js with Express, with a PostgreSQL database. Email functionality uses SendGrid email API. Backend files are available at [cashCount-backend](https://github.com/bpruitt63/cashCount-backend)