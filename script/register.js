window.addEventListener('DOMContentLoaded', function () {
  console.log("connected to js");
  let regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
  let regexEmail = RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$');
  let regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');

  // const firstname = document.getElementById('FN');
  // const lastname = document.getElementById('LN');
  let cls = document.getElementById('btnj');
  let firstName = document.getElementById('n1');
  let lastName = document.getElementById('n2');
  let userName = document.getElementById('n3');
  let password = document.getElementById('p1');
  let Cpassword = document.getElementById('p2');

  // firstname.addEventListener('keyup', () => {
  //     let a = regexName.test(firstname.value);
  //     if (a == false) {
  //         document.getElementById('div1').classList.remove('name');
  //         document.getElementById('div1').classList.add('errormsg');
  //         document.getElementById('namej').innerHTML = "Enter first Name";

  //     } else {
  //         document.getElementById('div1').classList.remove('errormsg');
  //         document.getElementById('div1').classList.add('name');
  //         document.getElementById('namej').innerHTML = "validate Successfully";
  //     }
  // })
  let fn = 0, ln = 0, un = 0, psw = 0, cnfpw = 0;

  const showError = (inputId, hintId, errMsg, input1, input2) => {
    console.log(errMsg);
    document.getElementById(inputId).classList.remove(input1);
    document.getElementById(inputId).classList.add(input2);
    document.getElementById(hintId).classList.add('Errmsg');
    document.getElementById(hintId).classList.remove('Hint');
    document.getElementById(hintId).innerHTML = errMsg;
    return false;
  };

  const showSuccess = (inputId, hintId, sucessMsg, input1, input2) => {
    document.getElementById(inputId).classList.add(input1);
    document.getElementById(inputId).classList.remove(input2);
    document.getElementById(hintId).classList.remove('Errmsg');
    document.getElementById(hintId).classList.add('Hint');
    document.getElementById(hintId).textContent = sucessMsg;
    return true;
  };

  firstName.addEventListener('keyup', () => {
    console.log(firstName.id);
    fn = check(firstName, 'input1', 'input2', 'Nhint1', "Invalid First name", "", regexName)
  });

  lastName.addEventListener('keyup', () => {
    console.log(lastName.id);
    ln = check(lastName, 'input1', 'input2', 'Nhint2', "Invalid Last name", "", regexName)
  });

  userName.addEventListener('keyup', () => {
    console.log(userName.id);
    em = check(userName, 'input1', 'input2', 'UsernameHint', "Invalid User name", "You can use letters, numbers & periods", regexEmail)
  });

  password.addEventListener('keyup', () => {
    console.log(password.id);
    psw = check(password, 'input1', 'input2', 'passHint', "Invalid Password", "Use 8 or more characters with a mix of letters, numbers & symbols", regexPass)
  });

  Cpassword.addEventListener('keyup', () => {
    console.log(Cpassword.id);
    cpsw = check(Cpassword, 'input1', 'input2', 'passHint', "Enter Valid Confirm password", "Use 8 or more characters with a mix of letters, numbers & symbols", regexPass)
  });
  function check(input, input1, input2, hintId, errMsg, sucessMsg, regex) {
    if (!regex.test(input.value)) {
      a = showError(input.id, hintId, errMsg, input1, input2);
      return 0;
    } else {
      a = showSuccess(input.id, hintId, sucessMsg, input1, input2);
      return 1;
    }
  };
  cls.addEventListener('click', () => {
    console.log("Hello", firstName.value, lastName.value, userName.value, password.value);
    //document.getElementById('btn').innerHTML = "welcome";
    if ((fn == 1) && (ln == 1) && (em == 1) && (psw == 1) && (cpsw == 1)) {
      let data = {
        FirstName: firstName.value,
        LastName: lastName.value,
        email: userName.value,
        password: password.value
        //FirstName: this.registerForm.value.firstName,

        // {
        //   "firstName": "string",
        //   "lastName": "string",
        //   "email": "string",
        //   "password": "string"
        // }

      }
      console.log(data);
      $.ajax({
        url: "https://localhost:44371/api/User/Register",
        type: "POST",
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (result) {
          console.log(result);
        },
        error: function (error) {
          console.log(error);
        }
      })
    }
  })


})