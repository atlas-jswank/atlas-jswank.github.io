---
title: "Test"
description: "Lorem ipsum dolor sit amet"
pubDate: "September 26, 2024"
heroImage: "/hooks-mistakes.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: true
---


```tsx
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>
        Increment
      </button>
    </div>
  );
}

```