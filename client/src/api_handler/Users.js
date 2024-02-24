export const LoginAPI = (formValues) => {
  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(formValues),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Incorrect Email and Password Combination");
      }
    })
    .then((data) => {
      console.log(`Welcome ${data.first_name} ${data.last_name}!`);
    })
    .catch((error) => console.error(error));
};

export const RegisterAPI = (formValues) => {
  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(formValues),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in Registering Account. This Email Might Have Been Already Registered. Try Again.");
      }
    })
    .catch((error) => console.error(error));
};
