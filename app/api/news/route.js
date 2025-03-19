// app/api/news/route.js
export async function GET() {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY; // Store in .env.local
  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&limit=10&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.feed) {
      throw new Error("No news data available");
    }

    // Simplify the response for the frontend
    const news = data.feed.map(item => ({
      title: item.title,
      url: item.url,
      time_published: item.time_published,
    }));

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}