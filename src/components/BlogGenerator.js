import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordStream, setWordStream] = useState(""); // New state to stream words

  const generateBlog = async () => {
    setLoading(true);
    setBlog(""); // Reset blog content
    setWordStream(""); // Reset streaming content

    const chunkSize = 1500;
    const targetWordCount = 1000;
    const maxChunks = 5; // Limit to avoid excessive API calls

    try {
      let currentWordCount = 0;

      for (
        let i = 0;
        i < maxChunks && currentWordCount < targetWordCount;
        i++
      ) {
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
          // Split the received text into words
          const words = response.data.text.split(/\s+/);

            for (let j = 0; j < words.length;j++) {
            if (currentWordCount >= targetWordCount) break; // Stop if limit reached

            // Append word by word to the stream
            setWordStream((prev) => `${prev} ${words[j]}`);

            currentWordCount++;
            await new Promise((resolve) => setTimeout(resolve, 10)); // Delay for streaming effect
          }
        }
      }
    } catch (error) {
    }

    setLoading(false);
  };

  useEffect(() => {
    if (wordStream) {
      const words = wordStream.split(/\s+/);
      let currentWord = 0;

      const interval = setInterval(() => {
        if (currentWord < words.length) {
          setBlog((prev) => `${prev} ${words[currentWord]}`);
          currentWord++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust the interval time as needed

      return () => clearInterval(interval);
    }
  }, [wordStream]);

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
