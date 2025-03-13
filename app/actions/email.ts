"use server";
import sgMail from "@sendgrid/mail";

export async function sendEmail({
	to,
	subject,
	text,
}: {
	to: string;
	subject: string;
	text: string;
}) {
	if (!process.env.SENDGRIP_API_KEY) {
		throw new Error("SENDGRIP API KEY not set in .env");
	}
	if (!process.env.EMAIL_FROM) {
		throw new Error("EMAIL_FROM not set in .env");
	}

	sgMail.setApiKey(process.env.SENDGRIP_API_KEY);

	const message = {
		to: to.toLowerCase().trim(),
		from: process.env.EMAIL_FROM,
		subject: subject.trim(),
		text: text.trim(),
	};

	try {
		const [response] = await sgMail.send(message);
		if (response.statusCode != 202) {
			throw new Error(
				`SendGrip API send status code ${response.statusCode}`
			);
		}

		return {
			success: true,
			messageId: response.headers["x-message-id"],
		};
	} catch (error) {
		console.error("Error sending email: ", error);
		return {
			success: false,
			message: "Failed to send email. Try again bro",
		};
	}
}
