---
title: "React State: Custom Hooks"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 26, 2024"
heroImage: "/react-custom-hooks.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: true
---

React custom hooks have become a powerful tool for developers, enabling them to write cleaner, more maintainable code by encapsulating reusable logic into functions. Whether you’re new to React or an experienced developer, understanding how to create and use custom hooks can significantly enhance your development workflow. In this blog post, we’ll explore what custom hooks are, why they’re useful, and how you can create them to solve common challenges in React applications.

### What Are Custom Hooks?

Custom hooks are JavaScript functions that allow you to reuse stateful logic across multiple components in a React application. They leverage the power of React’s built-in hooks (`useState`, `useEffect`, `useContext`, etc.) to manage state and side effects, but they can be abstracted into reusable functions. Custom hooks provide a way to extract component logic and make it reusable, improving code organization and maintainability.

### Why Use Custom Hooks?

* **Code Reusability:** Custom hooks allow you to extract and reuse logic that’s shared between multiple components, reducing code duplication and ensuring consistency.

* **Separation of Concerns:** By isolating logic into custom hooks, you can keep your components focused on rendering UIwhile hooks handle managing state.

* **Improved Readability:** Custom hooks help in making your components cleaner and easier to understand by abstracting complex logic away from the component body.

* **Testability:** Encapsulating logic into hooks makes it easier to test individual pieces of functionality, improving the overall test coverage of your application.

### Custom Hook Examples

**useLocalStorage**

Used for syncing state with localStorage to persist data across page reloads.

```tsx
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, initialValue);
      return initialValue;
    }
    return item;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
}

```

Here a form uses the `useLocalStorage` hook to store the user's name in local storage. If a user refreshed the page the form does not lose the data they entered.

```tsx
import React from 'react';
import { useLocalStorage } from './useLocalStorage';

function App() {
  const [name, setName] = useLocalStorage('name', 'Lumu');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Stored name: {name}</p>
    </div>
  );
}

```

**useFetch**

For fetching data from an API and managing loading and error states.

```tsx
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

```

Here data is fetched from the APi when the component mounts. It shows a laoding state before the fetch completes and an error state if the request fails.

```tsx
import React from 'react';
import { useFetch } from './useFetch';

function DataDisplay() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

**useToggle**

Used for managing a boolean state for toggling functionality.

```tsx
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return [value, toggle];
}
```

Here a button toggles the visibility of a paragraph.

```tsx
import React from 'react';
import { useToggle } from './useToggle';

function ToggleComponent() {
  const [isToggled, toggle] = useToggle();

  return (
    <div>
      <button onClick={toggle}>
        {isToggled ? 'Hide' : 'Show'} Content
      </button>
      {isToggled && <p>This content is visible!</p>}
    </div>
  );
}
```

**useWindowSize**

Used for tracking and responding to changes in the window size.

```tsx
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => { //remove listeneer when component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

```

This component rerenders as the window size changes, showing the new dimensions of the window.

```tsx
import React from 'react';
import { useWindowSize } from './useWindowSize';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
}
```

These examples show how custom hooks can encapsulate reusable logic and improve the organization of your code by separating concerns into modular units.

### How to Create a Custom Hook

Creating a custom hook is straightforward. Here’s a step-by-step guide on how to create a simple custom hook:

* **Define the Hook Function:** Start by defining a function that will serve as your custom hook. It should start with the word “use” to adhere to React’s convention and ensure it’s treated as a hook.

* **Use Built-in Hooks:** Inside your custom hook, use React’s built-in hooks to manage state, side effects, or context as needed.

* **Return Values:** Return the values or functions that you want to expose to the components using the hook.

* **Use the Hook:** Import and use your custom hook in functional components just like any other hook.

### Best Practices

* **Naming Convention:** Always prefix custom hook names with `“use”` to follow React’s hook naming convention and to ensure they are treated as hooks by the linter and React’s rules.

* **Reuse Logic Wisely:** Custom hooks are ideal for extracting reusable logic. Avoid overcomplicating them by including too much functionality; aim for focused, single-responsibility hooks.

* **Document Well:** Since custom hooks encapsulate logic that may be used across different components, it’s essential to document their behavior and usage clearly for future reference and other developers.

### Conclusion

Custom hooks in React offer a powerful way to encapsulate and reuse logic, leading to cleaner, more maintainable code. By understanding how to create and use custom hooks effectively, you can enhance your React applications and improve both development efficiency and code quality. Start exploring custom hooks today and unlock new possibilities for your React projects!