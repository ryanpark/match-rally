const sendEmail = async (sendingLists) => {
  try {
    for (const recipient of sendingLists) {
      const { user: userName, email } = recipient;
      console.log(userName);
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to send email to ${user}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Email sent to ${user}:`, data);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
