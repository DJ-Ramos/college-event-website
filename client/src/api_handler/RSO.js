export const CreateRSOAPI = async (formValues) => {
  let status;
  const URL =
    `http://localhost:5000/dashboard/university/${formValues.university_id.university_id}`
  await fetch(URL, {
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
          alert("Error in Creating RSO. This RSO Might Have Been Already Created.")
        );
      }
    })
    .catch((error) => console.error(error));
  return status;
};

export const GetRSOAPI = async (university_id) => {
  let RSOData = [];
  const URL = "http://localhost:5000/dashboard/university/" + university_id.university_id;
  await fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(alert("Error in Retrieving RSOs."));
      }
    })
    .then((data) => {
      RSOData = data;
    })
    .catch((error) => console.error(error));
  return RSOData;
};

export const CreateRSOEventAPI = async (formValues) => {
  let status;
  const URL =
    `http://localhost:5000/dashboard/rso/${formValues.rso_id.rso_id}`
  await fetch(URL, {
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
          alert("Error in Creating RSO Event. This RSO Event Might Have Been Already Created.")
        );
      }
    })
    .catch((error) => console.error(error));
  return status;
};

export const GetRSOEventAPI = async (rso_id) => {
  let RSOData = [];
  const URL = `http://localhost:5000/dashboard/rso_event_list/${rso_id}`;
  await fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(alert("Error in Retrieving RSO Events."));
      }
    })
    .then((data) => {
      RSOData = data;
    })
    .catch((error) => console.error(error));
  return RSOData;
};

