---
title: "What is JSX?"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 20 2024"
heroImage: "/jsx.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
---

### What is JSX?

JSX, or JavaScript XML, is a syntax extension for JavaScript that allows developers to write HTML-like code within their JavaScript files. It is used in React to describe the structure of the user interface in a more intuitive and readable way. JSX closely resembles HTML, making it easier to visualize the layout and structure of components, but it compiles down to regular JavaScript objects. This syntax allows developers to embed expressions, use variables, and invoke functions directly within the markup.

Here are some important things to keep in mind then writing JSX.

### Must Be Wrapped in a Single Element

JSX expressions must return a single root element. If you need to return multiple elements, you should wrap them in a parent element or use React fragments.

**Incorrect:**

```tsx
function App() {
    return (
      <h1>Hello</h1>
      <p>World</p>
    );
}
```

**Correct:**

```tsx
function App() {
    return (
      <div>
        <h1>Hello</h1>
        <p>World</p>
      </div>
    );
}
```

Altenatively you can use a special syntax called a Fragment (<></>):

```tsx
function App() {
    return (
      <>
        <h1>Hello</h1>
        <p>World</p>
      </>
    );
}
```

### Use Curly Braces for Expressions

To embed JavaScript expressions within JSX, you need to use curly braces `{}`. This allows you to include variables, expressions, or function calls within the JSX.

```tsx
function App() {
    const name = "Alice";
    return <h1>Hello, {name}!</h1>;
}
```

### Close All Tags

All JSX tags must be properly closed. This includes self-closing tags, which should end with a slash.

**Incorrect:**

```tsx
function App() {
    return <img src="image.jpg">
}
```

**Correct:**

```tsx
function App() {
    return <img src="image.jpg" />
}
```

#### Use className for Class Attributes

`class` is a reserved word in javascript. Since all jsx is coverted to javascript, we need to use `className`instead of `class`.

**Incorrect:**

```tsx
function App() {
   return <input type="text" class="my-class" />
}
```

**Correct:**

```tsx
function App() {
   return <input type="text" className="my-class" />
}
```

### Conditional Rendering

Conditional rendering in JSX allows you to display different content based on certain conditions. There are several common patterns for achieving this in React. Here are some examples:

The ternary operator is a concise way to perform conditional rendering directly within JSX.

```tsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
    </div>
  );
}
```

You can't use if statements directly inside JSX, but you can use them outside the JSX to determine what to render:


```tsx
function Greeting({ isLoggedIn }) {
  let message;
  
  if (isLoggedIn) {
    message = <h1>Welcome back!</h1>;
  } else {
    message = <h1>Please sign up.</h1>;
  }

  return <div>{message}</div>;
}
```

For multiple conditions, a switch statement can be used inside the render method or functional component to return different JSX elements.

```tsx
function Status({ status }) {
  let content;

  switch (status) {
    case 'loading':
      content = <p>Loading...</p>;
      break;
    case 'error':
      content = <p>Error occurred!</p>;
      break;
    case 'success':
      content = <p>Data loaded successfully!</p>;
      break;
    default:
      content = <p>Unknown status</p>;
  }

  return <div>{content}</div>;
}
```

These patterns provide flexibility in how you render components conditionally, helping you create dynamic and responsive user interfaces in React applications.

### Rendering Lists

Rendering lists of data in React is a common task that involves displaying multiple items from an array or collection in a structured format. A common approach to handle lists leverages the `map()` method.

```tsx
const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' }
];

function FruitList() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

When rendering lists, each element must have a unique `key` prop to help React identify which items have changed, are added, or are removed. This improves performance and helps React optimize the rendering process. The `key` should be a unique identifier, often derived from the data itself.

### Rendering Children

In React, the children prop is a special prop that allows you to pass content or elements from a parent component to a child component. This is useful for creating reusable components that can wrap or contain other elements. Here's a simple example to illustrate how the children prop works:

```tsx
function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}
```

The `Card` component accepts children as a prop. The `children` prop represents any content passed between the opening and closing tags of the Card component.

```tsx
function App() {
  return (
    <div>
      <Card title="Welcome">
        <p>This is some content inside the card.</p>
      </Card>
      <Card title="Another Card">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </Card>
    </div>
  );
}
```

In the `App` component, two `Card` components are used. Each one wraps different content. The content inside each Card component is passed as children and rendered inside the Card's div element.

## Event Handling

Event handling in React involves responding to user interactions such as clicks, form submissions, or keyboard inputs. React provides a straightforward and consistent way to handle these events through a synthetic event system, which wraps around the native browser events.

React uses a synthetic event system to normalize events across different browsers. This synthetic event is a cross-browser wrapper around the native DOM events. It provides a consistent API and works with event delegation to improve performance.

In React, event handlers are specified using camelCase syntax. Unlike in HTML, where event attributes are written in lowercase (e.g., onclick), React uses camelCase (e.g., onClick). Event handlers are assigned as functions, and they are passed directly to the React component’s JSX.

```tsx
function App() {
  function handleClick() {
    alert('Button clicked!');
  }

  function handleHover(){
    console.log("Mouse hovered over the button");
  }

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <div onMouseEnter={handleHover}>Hover Me</div>
    </div>
  );
}
```

Event handling in React provides a consistent and efficient way to manage user interactions. By leveraging React’s synthetic event system developers can build interactive and responsive UIs. Understanding these concepts will help you handle user interactions effectively and maintain clean, functional React components.