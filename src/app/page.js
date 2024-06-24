"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDownloadLink("");

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch download link");
      }

      const data = await response.json();
      setDownloadLink(data.downloadLink);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">YouTube Video Downloader</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-md space-y-4"
        >
          <input
            type="text"
            placeholder="Enter YouTube or Instagram URL"
            value={url}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg w-full ${
              loading ? "bg-gray-500" : "bg-blue-500"
            } text-white font-semibold`}
          >
            {loading ? "Loading..." : "Download"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {downloadLink && (
          <a
            href={downloadLink}
            download
            className="mt-4 text-blue-500 underline"
          >
            Download Video
          </a>
        )}
      </main>
    </div>
  );
}
