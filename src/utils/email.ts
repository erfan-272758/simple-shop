export async function sendEmail({
  to,
  title,
  message,
}: {
  to: string;
  title: string;
  message: string;
}) {
  console.log({ to, title, message });
  return true;
}
