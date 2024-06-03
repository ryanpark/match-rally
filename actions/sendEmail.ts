interface Recipient {
  user: string;
  email: string;
}

type SendingListsTypes = Recipient[];

const sendEmail = async (sendingLists: SendingListsTypes) => {
  try {
    for (const recipient of sendingLists) {
      const { user: userName, email } = recipient;
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send email to ${response.statusText}`);
      }

      const data = await response.json();
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
