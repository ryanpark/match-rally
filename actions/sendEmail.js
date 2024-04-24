const sendEmail = async () => {
  try {
    const response = await fetch("/api/send", {
      method: "POST",
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
