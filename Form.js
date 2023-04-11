let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let workingStatusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let myFormEl = document.getElementById("myForm");

let formData = {
  name: "",
  email: "",
  status: "Active",
  gender: "Male"
};

nameEl.addEventListener("change", function(event) {
  if (event.target.value === "") {
    nameErrMsgEl.textContent = "Required*";
  } else {
    nameErrMsgEl.textContent = "";
  }

  formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
  if (event.target.value === "") {
    emailErrMsgEl.textContent = "Required*";
  } else {
    emailErrMsgEl.textContent = "";
  }

  formData.email = event.target.value;
});

workingStatusEl.addEventListener("change", function(event) {
  formData.status = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
  formData.gender = event.target.value;
});

function validateFormData(formData) {
  let {name, email} = formData;
  if (name === "") {
    nameErrMsgEl.textContent = "Required*";
  }
  if (email === ""){
    emailErrMsgEl.textContent = "Required*";
  }
}

function submitFormData(formData) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer 9a437647bb31e720feb26becbadf96865d6669ebcdcbcc7c719cd324bb630c1e",
    },
    body: JSON.stringify(formData)
  };

  let url = "https://gorest.co.in/public/v2/users";

  fetch("https://gorest.co.in/public/v2/users", options)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);
      if (jsonData.Status === 422) {
        if (jsonData.data[0].message === "has already been taken") {
          emailErrMsgEl.textContent = "Email Already Exists";
        }
      }
    });
}

myFormEl.addEventListener("submit", function(event){
  event.preventDefault();
  validateFormData(formData);
  submitFormData(formData);
});