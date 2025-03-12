'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [message, setMessage] = useState({message: "", name: "", level: 0});
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/hello`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("gagal fetch", err));

  }, [])

  return (
    <div>
      <h1>Next.js + Actix Web</h1>
      <p>Backend Response: </p>
    </div>
  );
}