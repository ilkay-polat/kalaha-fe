## Getting Started

## Nginx Setup 
Nginx web server is needed to avoid CORS error during service comunication issue.  

Please follow the setup statements explained below:
* Install nginx web server: brew install nginx
* Open nginx installation directory e.g. /usr/local/etc/nginx
* Copy default.conf file and past the root directory of your nginx instllation directory.
* Modify nginx.conf by adding default.conf to include network routing: "include default.conf" should be added before server section

 
    include default.conf; 
* Change server port as 8090 on nginx.conf

* Start nginx webserver: 'brew services start nginx'

## Tech Stack 
* Next.js
* Local Storage of Browser
* Radix UI Theme

## Build
npm install

## Run
npm run dev
Local environment is served over http://localhost:3000 

## Access
Open [http://localhost:8090](http://localhost:8090) with your browser to see the front end application.
