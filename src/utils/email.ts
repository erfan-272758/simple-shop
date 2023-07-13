import axios from 'axios';
import { GLOBAL } from 'src/global';

export async function sendEmail({
  to,
  title,
  message,
}: {
  to: string;
  title: string;
  message: string;
}) {
  try {
    const md = {
      from: `SimpleShop <${GLOBAL.env.EMAIL_FROM}>`,
      to: `<${to}>`,
      subject: title,
      text: message,
    };

    await axios.post(GLOBAL.env.EMAIL_DOMAIN, md, {
      auth: { username: 'api', password: GLOBAL.env.EMAIL_API_KEY },
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}
