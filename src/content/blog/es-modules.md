---
title: "ES Modules"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 26, 2024"
heroImage: "/es-modules.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
---


### What are ES Modules?

ES Modules are a feature introduced in ECMAScript 6 (ES6) that allow you to break down your JavaScript code into smaller, reusable pieces called modules. Each module is a separate file that can export and import functionality, such as functions, objects, or variables, making it easier to manage and maintain your codebase.

### Benefits of ES Modules

**Organized Code Structure:** By using ES Modules, you can divide your code into distinct files, each responsible for a specific task or feature. This modular approach helps keep your codebase organized and easier to navigate, which is especially important as your React application grows.

**Reusability:** Modules can export functions, classes, and variables that can be reused across different parts of your application. For example, you might create a utility module with common helper functions that you import wherever needed, reducing code duplication and improving maintainability.

**Encapsulation:** ES Modules promote encapsulation by allowing you to expose only the parts of your code that are necessary, while keeping the rest private. This helps prevent unintended interactions and makes your code more predictable and reliable.

**Tree Shaking:** Modern JavaScript build tools, like Vite, support a feature called "tree shaking," which removes unused code from your final bundle. By using ES Modules, you enable tree shaking, leading to more optimized and smaller bundle sizes, which improves the performance of your React application.


### Using ES Modules

Suppose you have a file named greet.js where you define some utility functions:


```tsx
// greet.js
export function greetMe(user) {
  alert(`Hello, ${user}!`);
}
```

In this example, greet.js exports a functions called greetMe. The `export` keyword in front of the function definition is what exposes the function outside of the current file.

In another file,  you can import and use this function using the `import` keyword:

```tsx
// main.js
import {greetMe} from './greet.js';

greetMe('John'); // Hello, John!
```

### Exporting

You can export functions, classes, and variables from a module.

```tsx
// export an array
export let days = ['Mon', 'Tues', 'Wed','Thur', 'Fri', 'Sat', 'Sun'];

// export a constant
export const PI = 3.14159;

// export a class
export class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

You can also seperate the export from the declaration:

```tsx
function greetMe(user) {
  alert(`Hello, ${user}!`);
}

const debug = true;

const users = ['John', 'Jane', 'Bob'];

export {greetMe, debug, users};
```

### Importing

You import with the import keyword and curly brackets around the things you want to import:

```tsx
// main.js
import {greetMe} from './greet.js';

greetMe('John'); // Hello, John!
```

You can also import everything from a module with the wildcard (*):

```tsx
// main.js
import * as greet from './greet.js';

greet.greetMe('John'); // Hello, John!
```

As a best practice it is recommended to import only what you need from a module.

### Default Export / Import

Modules provide a special export default (“the default export”) syntax. If you put the default export in a module:

```tsx
export default class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

You can import it without using the curly braces:


```tsx
import Employee from './employee.js';

let employee = new Employee('John', 'Doe');
```

Keep in mind a module can only have one default export.

### ES Modules in React

You can export react components from a module just like any other function:

```tsx
// Greeting.jsx
export function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```
and then import them like any other function:

```tsx
// App.jsx
import {Greeting} from './Greeting';

function App() {
  return (
    <div>
      <Greeting name="John" />
      <Greeting name="Jane" />
    </div>
  );
}
```

As a best practive breaking up your react component into seperate files make them easier to manage as your app grows in size and complexity.

### Importing Images

If using build tools like Vite you can import image files directly using the `import` keyword and set their value as the source of an image element.

```tsx
// App.jsx
import React from "react";
import logo from "./assets/logo.png";

function App() {
  return (
    <div>
      <img src={logo} alt="logo" />
    </div>
  );
}
```

### Importing JSON

With Vite, you can import JSON files using the `import` keyword:

```json
// data.json
{
  "first": "John",
  "last": "Doe"
}
```

```tsx
// App.jsx
import data from './data.json';

function App() {
  return (
    <div>
      <p>Hello, {data.first} {data.last}!</p>
    </div>
  );
}
```

### ES Modules vs CommonJS

CommonJS is a more traditional module system used primarily in Node.js, supporting synchronous loading and dynamic require() calls but lacking some of the advanced features of ES Modules. Functions can be exported by using `module.exports`:

```tsx
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

Then imported using the require() function:

```tsx
const { add } = require('./math.js');

console.log(add(2, 3)); // 5  
```

As the JavaScript ecosystem evolves, ES Modules are becoming the standard for both browser and server-side development, while CommonJS remains widely used in Node.js environments we will predomintaly use ES Modules in React.
