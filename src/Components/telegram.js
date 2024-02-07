import axios from "axios";

const botToken = "6397369604:AAEA4oAFYiCoG7r25wscohHiUSIe35O36FA"; // Замените на свой токен бота
const chatId = "6600613092"; // Замените на ID вашего чата или получателя

export const sendMessage = async (message) => {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    message
  )}`;

  try {
    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    throw error;
  }
};
