export const CreateUniversityAPI = async (formValues) => {
  let status;
  await fetch(`http://localhost:5000/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(formValues),
  })
    .then((res) => {
      if (res.ok) {
        status = 200;
        return res.json();
      } else {
        throw new Error(
          "Error in Creating University Profile. This University Might Have Been Already Created."
        );
      }
    })
    .catch((error) => console.error(error));
  return status;
};

export const GetUniversityAPI = async () => {
  let universityData;
  await fetch(`http://localhost:5000/dashboard/university_list`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in Retrieving Universities.");
      }
    })
    .then((data) => {
      universityData = data;
    })
    .catch((error) => console.error(error));
  return universityData;
};
