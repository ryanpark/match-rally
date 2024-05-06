const sendEmail = async ({ userName, email }) => {
  try {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Email sent:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendEmail;
