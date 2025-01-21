
export const sendWhatsAppTextMessage = async (phoneNumber: string, message: string) => {
  if (!phoneNumber || !message) {
    console.log("Please enter both phone number and message.");
    return;
  }

  const WA_PHONE_NUMBER_ID = ""
  const ACCESS_TOKEN = ""

  const recipientPhoneNumber = phoneNumber.replace(/\D/g, "");

  const apiUrl = `https://graph.facebook.com/v18.0/${WA_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "text",
    text: {
      body: message,
    },
  };

  try {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert(`Error: ${data.error.message}`);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Check console for details.");
    }
}