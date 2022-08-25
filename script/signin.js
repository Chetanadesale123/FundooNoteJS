window.addEventListener('DOMContentLoaded',()=>{

    console.log("=> Connected to Login.js");

    let regexEmail=RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$');
    let regexPass=RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');


    let userName = document.getElementById('eid');
    let password = document.getElementById('pass');
    let cls = document.getElementById('btnj');

    let fn=0, ln=0, un=0, psw=0, cnfpw=0;
    
    const showError = (inputId,hintId,errMsg,input1,input2) =>{
      console.log(errMsg);
      document.getElementById(inputId).classList.remove(input1);
      document.getElementById(inputId).classList.add(input2);
      document.getElementById(hintId).classList.add('Errmsg');
      document.getElementById(hintId).innerHTML = errMsg;
      return false;
  };

  const showSuccess = (inputId,hintId,input1,input2) => {
      document.getElementById(inputId).classList.add(input1);
      document.getElementById(inputId).classList.remove(input2);
      document.getElementById(hintId).classList.remove('Errmsg');
      document.getElementById(hintId).textContent = "";
      return true;
  };

  userName.addEventListener('keyup',()=>{
    console.log(userName.id);
      un=check(userName,'input1','input2','emailHint',"Invalid Email address",regexEmail )
  });

  password.addEventListener('keyup',()=>{
    console.log(password.id);
      psw=check(password,'input1','input2','passHint',"Invalid Password",regexPass )
  });
  function check(input,input1,input2,hintId,errMsg,regex){
    if (!regex.test(input.value)) {
        a = showError(input.id,hintId,errMsg,input1,input2);
        return 0;
      } else {
        a= showSuccess(input.id,hintId,input1,input2);
        return 1;
      }
   };
   cls.addEventListener('click', () => {
    console.log("Hello",userName.value, password.value);
    //document.getElementById('btn').innerHTML = "welcome";
    
      let loginData = {
        
        email: userName.value,
        password: password.value
      }
      console.log(loginData);
      $.ajax({
        url: "https://localhost:44371/api/User/Login",
        type: "POST",
        data: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (Result) {
          console.log(Result);
          localStorage.setItem('token',Result.response);
          token=localStorage.getItem('token');
             if(token)
             {
               window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
             }
        },
        error: function (error) {
          console.log(error);
        }
      })
    
  })
  function Resetpage(){
    document.getElementById('login-form').reset();
  }



})




