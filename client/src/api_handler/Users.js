export const LoginAPI = async (formValues) => {
  let res;
  await fetch(`http://localhost:5000/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=UTF-8"},
    body: JSON.stringify(formValues),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(alert("Incorrect Email and Password Combination"));
      }
    })
    .then((data) => {
      data.status = 200;
      res = data;
    })
    .catch((error) => {
      console.error(error);
      res = { status: 400, error: error };
    });
  return res;
};

export const RegisterAPI = async (formValues) => {
  let status;
  await fetch(`http://localhost:5000/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=UTF-8"},
    body: JSON.stringify(formValues),
  })
    .then((res) => {
      if (res.ok) {
        status = 200;
        return res.json();
      } else {
        throw new Error(
          alert("Error in Registering Account. This Email Might Have Been Already Registered. Try Again.")
        );
      }
    })
    .catch((error) => console.error(error));
  return status;
};
