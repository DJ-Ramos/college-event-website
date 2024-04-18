export const CreatePrivateEventAPI = async (formValues) => {
    let status;
    const URL =
      `http://localhost:5000/dashboard/university/${formValues.university_id.university_id}/private_events`
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
            alert("Error in Creating Private Event. This private Event Might Have Been Already Created.")
          );
        }
      })
      .catch((error) => console.error(error));
    return status;
  };
  
  export const GetPrivateEventAPI = async (university_id) => {
    let eventData = [];
    const URL = `http://localhost:5000/dashboard/private_event_list/${university_id}`;
    await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(alert("Error in Retrieving Private Events."));
        }
      })
      .then((data) => {
        eventData = data;
      })
      .catch((error) => console.error(error));
    return eventData;
  };
  