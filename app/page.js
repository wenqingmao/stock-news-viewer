// app/page.js
"use client"; // Required for client-side features like useEffect

import { useEffect, useState } from "react";
import styles from "./styles/Home.module.css";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (res.ok) {
          setNews(data);
        } else {
          setError(data.error || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stock Market News</h1>
      <ul className={styles.newsList}>
        {news.map((item, index) => (
          <li key={index} className={styles.newsItem}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <p className={styles.date}>
              {new Date(item.time_published).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}