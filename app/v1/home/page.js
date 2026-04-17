"use client"
import { useState } from "react";
import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function HomePage() {
  return (
    <div>
      <h1>Home Page V1</h1>
      <Counter />
      <Profile />
    </div>
  );
}

function Profile() {
  const { isLoading, data } = useSWR("/api/v1/transactions", fetchAPI);

  if (isLoading) return <h1>Loading...</h1>;
  
  const transactions = data?.data || [];
  const offData = ["transaction_id", "created_at", "updated_at"]

  const dateFormat = (stringDate) => {
    const data = new Date(stringDate);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  };

  return (
    <>
      <ul>
      {Object.entries(setData)
      .map(([key, value]) => {
        let formatedValue = value;

        if (key.includes("date") || key.includes("_at")) {
          formatedValue = dateFormat(value);
        }

        if (key === "value") {
          formatedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(value);
        }
        <li key={key}>
          <strong>{key.replace("_", " ")}:</strong> {formatedValue}
        </li>
      })}
    </ul>
    </>
  )
}

function Counter() {
  const [counter, setCounter] = useState(1);

  function addCounter() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={addCounter}>Count</button>
    </div>
  )
}
