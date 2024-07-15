
// const dotenv = require("dotenv");
// dotenv.config();
// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// exports.summaryController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Summarize this \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.paragraphController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `write a detail paragraph about \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.chatbotController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Answer question similar to how yoda from star war would.
//       Me: 'what is your name?'
//       yoda: 'yoda is my name'
//       Me: ${text}`,
//       max_tokens: 300,
//       temperature: 0.7,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// exports.jsconverterController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-002",
//       prompt: `/* convert these instruction into javascript code \n${text}`,
//       max_tokens: 400,
//       temperature: 0.25,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
// // exports.scifiImageController = async (req, res) => {
// //   try {
// //     const { text } = req.body;
// //     const { data } = await openai.createImage({
// //       prompt: `generate a scifi image of ${text}`,
// //       n: 1,
// //       size: "512x512",
// //     });
// //     if (data) {
// //       if (data.data[0].url) {
// //         return res.status(200).json(data.data[0].url);
// //       }
// //     }
// //   } catch (err) {
// //     console.log(err);
// //     return res.status(404).json({
// //       message: err.message,
// //     });
// //   }
// // };
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Helper function to handle OpenAI requests
const createCompletion = async (prompt, maxTokens = 500, temperature = 0.5, model = "text-davinci-003") => {
  try {
    const { data } = await openai.createCompletion({
      model,
      prompt,
      max_tokens: maxTokens,
      temperature,
    });
    return data.choices[0].text;
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || err.message);
  }
};

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const summary = await createCompletion(`Summarize this \n${text}`);
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const paragraph = await createCompletion(`Write a detailed paragraph about \n${text}`);
    res.status(200).json({ paragraph });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await createCompletion(
      `Answer questions similar to how Yoda from Star Wars would.\nMe: 'What is your name?'\nYoda: 'Yoda is my name.'\nMe: ${text}`,
      300,
      0.7
    );
    res.status(200).json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const convertedCode = await createCompletion(
      `/* Convert these instructions into JavaScript code */\n${text}`,
      400,
      0.25,
      "text-davinci-002"
    );
    res.status(200).json({ convertedCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
