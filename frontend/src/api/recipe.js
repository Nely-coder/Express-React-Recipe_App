// // api/chat.js
// export default async function handler(req, res) {
//   // 1. Only allow POST requests
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { message } = req.body;

//     // 2. Call your Hugging Face Agent/Model
//     // Replace the URL below with your specific Hugging Face Space, Inference Endpoint, or Model URL
//     const hfResponse = await fetch("openai/gpt-oss-120b:fastest", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.HF_TOKEN}`, // Securely injected on the server
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: message,
//       }),
//     });

//     const data = await hfResponse.json();
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
