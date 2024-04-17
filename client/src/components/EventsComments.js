// Assuming you have a PostgreSQL database connection and a server-side route to handle the database query

// Example server-side route to fetch event details from the database
app.get("/events/:eventId", async (req, res) => {
    const { eventId } = req.params;
  
    try {
      // Query the database to select the event based on eventId
      const query = `
        SELECT * 
        FROM events 
        WHERE id = $1;`;
  
      const { rows } = await pool.query(query, [eventId]);
  
      // Retrieve the event ID from the event object
      const event = rows[0];
      const eventIdFromDatabase = event.id; // Assuming the event ID is stored in a field named 'id'
  
      // Send the event details (including the ID) back to the client
      res.json({ event });
    } catch (error) {
      // Handle errors
      console.error("Error fetching event from database:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  