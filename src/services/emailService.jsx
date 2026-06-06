const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const getRequiredEnv = (key) => {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
};

export async function sendContactEnquiry({ name, phone, address, enquiry }) {
  const serviceId = getRequiredEnv("VITE_EMAILJS_SERVICE_ID");
  const templateId = getRequiredEnv("VITE_EMAILJS_TEMPLATE_ID");
  const publicKey = getRequiredEnv("VITE_EMAILJS_PUBLIC_KEY");
  const receiverEmail = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || "ganeshwakchaure801@gmail.com";

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: receiverEmail,
        from_name: name,
        phone,
        address,
        enquiry,
        message: enquiry,
        reply_to: receiverEmail,
      },
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Email could not be sent");
  }
}
