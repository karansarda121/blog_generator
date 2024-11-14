



// // import React, { useState } from "react";
// // import axios from "axios";

// // function App() {
// //   const [prompt, setPrompt] = useState("");
// //   const [blog, setBlog] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const generateBlog = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         "https://api.cohere.ai/generate",
// //         {
// //           prompt: prompt,
// //           max_tokens: 2500, // Adjust as needed
// //           temperature: 0.7, // Control the randomness
// //           top_p: 0.9, // Control the diversity
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ElhwpAtXCu3lUzuC30zxSy6N5byZ54AsAAZzIouV`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       console.log("API Response:", response.data);
// //       if (response.data.text) {
// //         setBlog(response.data.text);
// //       } else {
// //         setBlog("No blog content generated.");
// //       }
// //     } catch (error) {
// //       console.error("Error generating blog:", error);
// //       setBlog("An error occurred while generating the blog.");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <h1>Blog Generator</h1>
// //         <textarea
// //           value={prompt}
// //           onChange={(e) => setPrompt(e.target.value)}
// //           placeholder="Enter your prompt here..."
// //           rows="4"
// //           cols="50"
// //         />
// //         <button onClick={generateBlog} disabled={loading}>
// //           {loading ? "Generating..." : "Generate Blog"}
// //         </button>
// //         {blog && (
// //           <div className="blog-output">
// //             <h2>Generated Blog</h2>
// //             <p>{blog}</p>
// //           </div>
// //         )}
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;



// import React, { useState } from "react";
// import axios from "axios";


// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [blog, setBlog] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateBlog = async () => {
//     setLoading(true);
//     let fullText = "";
//     const chunkSize = 500; // Number of tokens per chunk
//     const numChunks = 4; // Number of chunks to generate

//     try {
//       for (let i = 0; i < numChunks; i++) {
//         const response = await axios.post(
//           "https://api.cohere.ai/generate",
//           {
//             prompt: prompt,
//             max_tokens: chunkSize,
//             temperature: 0.7,
//             top_p: 0.9,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ElhwpAtXCu3lUzuC30zxSy6N5byZ54AsAAZzIouV`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.text) {
//           fullText += response.data.text + "\n\n";
//         } else {
//           fullText += "No content generated in this chunk.\n\n";
//         }
//       }

//       setBlog(fullText);
//     } catch (error) {
//       console.error("Error generating blog:", error);
//       setBlog("An error occurred while generating the blog.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Blog Generator</h1>
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter your prompt here..."
//           rows="4"
//           cols="50"
//         />
//         <button onClick={generateBlog} disabled={loading}>
//           {loading ? "Generating..." : "Generate Blog"}
//         </button>
//         {blog && (
//           <div className="blog-output">
//             <h2>Generated Blog</h2>
//             <p>{blog}</p>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBlog = async () => {
    setLoading(true);
    let fullText = "";
    const chunkSize = 1500;
    const targetWordCount = 1000;
    const maxChunks = 5; // Limit the number of chunks to avoid excessive API calls

    try {
      for (let i = 0; i < maxChunks; i++) {
        const response = await axios.post(
          "https://api.cohere.ai/generate",
          {
            prompt: prompt,
            max_tokens: chunkSize,
            temperature: 0.7,
            top_p: 0.9,
          },
          {
            headers: {
              Authorization: `Bearer ElhwpAtXCu3lUzuC30zxSy6N5byZ54AsAAZzIouV`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.text) {
          fullText += response.data.text + "\n\n";
        } else {
          fullText += "No content generated in this chunk.\n\n";
        }

        const wordCount = fullText.split(/\s+/).length;
        if (wordCount >= targetWordCount) {
          break;
        }
      }

      setBlog(fullText);
    } catch (error) {
      console.error("Error generating blog:", error);
      setBlog("An error occurred while generating the blog.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>AI Blog Generator</h1>
        <p>Enter a prompt to generate a detailed blog (around 1000 words).</p>
      </header>

      <div className="content">
        <textarea
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your blog prompt here..."
          rows="4"
        />

        <button
          className="generate-button"
          onClick={generateBlog}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Blog"}
        </button>

        {blog && (
          <div className="blog-output">
            <h2>Generated Blog</h2>
            <div className="blog-text">{blog}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

