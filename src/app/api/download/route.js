import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function POST(req, res) {
  if (req.method === "POST") {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ msg: "Hello from server" });
    }

    try {
      if (ytdl.validateURL(url)) {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
        return NextResponse.json({ downloadLink: format.url });
      } else {
        // Handle Instagram or other URLs
        return NextResponse.json({ error: "Unsupported URL" });
      }
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch video" });
    }
  } else {
  }
}
