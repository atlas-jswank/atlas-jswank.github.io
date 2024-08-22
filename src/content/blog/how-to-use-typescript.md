---
title: "How to use Typescript"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 21 2024"
heroImage: "/typescript-2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: false
---

### Primitive Types

In TypeScript, primitive types are the most basic data types that represent simple values. They are immutable, meaning their values cannot be changed after they are created. The main primitive types in TypeScript include:

A `number` represents both integer and floating-point numbers. Here, `age` and `price` are both of the number type.


```tsx
let age: number = 25;
let price: number = 19.99;
```

A `string` represents a sequence of characters, used for textual data.

```tsx
let name: string = "Alice";
let greeting: string = `Hello, ${name}!`;
```

A `boolean` represents a logical value that can be either true or false.


```tsx
let isRaining: boolean = true;
let isSunny: boolean = false;
```

A `null` represents the intentional absence of any object value. `selectedItem` is declared as a string that can also be null, indicating that no item has been selected.

```tsx
let selectedItem: string | null = null;
```

An `undefined` represents an uninitialized variable or missing property. `optionalName` is defined as a string that could also be undefined, meaning it hasn't been assigned a value yet. null and undefined are different from each other, but they are both values that can be used to represent the absence of a value.

```tsx
let optionalName: string | undefined = undefined;
```

These primitive types form the building blocks for more complex data structures in TypeScript. Understanding them is essential for working effectively with the language.
