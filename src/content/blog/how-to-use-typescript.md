---
title: "How to use Typescript"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 29 2024"
heroImage: "/typescript-2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: true
---

In the last post we talked about the benefits of typesript and how its possible to use typescript without any special syntax or compilation steps. But using typescript without the compiler can be limiting. In this post we will go over how to fully advantage of the benefits of typescript.

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

### Function Types

In TypeScript, typing functions is a powerful feature that enhances code readability and maintainability by enforcing the types of input parameters and the return type. This ensures that functions are used as intended and helps prevent common programming errors.

**Basic Function with Typed Parameters and Return Type**

```tsx
function add(a: number, b: number): number {
    return a + b;
}
```

Here, the `add` function expects two parameters, `a` and `b`, both of type number, and it also returns `a` number.

**Function with No Return Value**

```tsx
function log(message: string): void {
    console.log(message);
}
```

The log function accepts a string parameter and does not return a value, hence the return type is void.

**Optional Parameters**

```tsx
function greet(name: string, date?: Date): string {
    if (date) {
        return `Hello, ${name}! Today is ${date.toDateString()}.`;
    } else {
        return `Hello, ${name}!`;
    }
}
```

The greet function takes a mandatory `string` parameter `name` and an optional `Date` parameter `date`. It returns a `string`.

**Function with Default Parameters**

```tsx
function buildUrl(base: string, path: string = '/'): string {
    return `${base}${path}`;
}
```

The `buildUrl` function takes a `string` parameter `base` and an optional parameter `path` with a default value of `'/'`. It returns a string.

**Function Type for Variable**

Functions can be assigned to variables, and you can define the function type explicitly.

```tsx
let compute: (x: number, y: number) => number;
compute = function(x, y) { return x + y; };
```

### Object Types

Type aliases in TypeScript are a powerful feature that allows you to create a new name for a type. Type aliases are especially useful when you want to simplify complex type definitions or when you need to reuse the same type across your codebase without repeating it.

Type aliases are created using the `type` keyword followed by the alias name and the type definition. Once defined, the alias can be used anywhere a type can be used.

**Simple Type Alias for an Object**

You can define a type alias for an object type to make object structures easier to manage and reuse.

```tsx
type User = {
    id: number;
    username: string;
    isActive: boolean;
};

let user: User = {
    id: 1,
    username: "john_doe",
    isActive: true
};

```

Here, User is a type alias for an object structure that describes a user. This makes it easy to specify that a variable should have this particular structure without rewriting the object type every time.

**Type Alias with Optional Properties**

Type aliases can include optional properties using the ? symbol.

```tsx
type Product = {
    id: number;
    name: string;
    price: number;
    description?: string; // Optional property
};

let product: Product = {
    id: 100,
    name: "Desk Lamp",
    price: 29.99
    // 'description' is optional
};
```

In this example, the `description` property is optional, so `product` objects may or may not include it.

**Type Alias for Complex Structures**

Type aliases can also be used for more complex structures, including objects with methods or nested objects.

```tsx
type Contact = {
    name: string;
    email: string;
    address: {
        street: string;
        city: string;
        zipCode: string;
    };
    sendMessage: (message: string) => void;
};

let contact: Contact = {
    name: "Alice Johnson",
    email: "alice@example.com",
    address: {
        street: "123 Maple St",
        city: "Springfield",
        zipCode: "12345"
    },
    sendMessage: function(message) {
        console.log(`Sending message to ${this.email}: ${message}`);
    }
};

contact.sendMessage("Hello, Alice!");
```

This example shows a Contact type with nested object properties and a method, demonstrating how type aliases can encapsulate complex behaviors and structures.

**Type Alias for Functions**

Type aliases can also be used for functions. This allows you to define a function type with a specific return type and parameter types.

```tsx
type Point = {
  x: number;
  y: number;
};

// Takes input variable of type "Point"
function printPoint(point: Point) {
  console.log(`The point is at ${point.x}, ${point.y}`);
}

// Return value has the shape of Point
function generateRandomPoint(): Point {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  };
}
```

### Unions and Intersections

In TypeScript, unions and intersections are powerful features that allow you to combine types in flexible ways, catering to various scenarios in type definition. They provide a way to handle variables and functions that can operate on more than one type of data.

A union type is a way to declare a variable that can hold values of different types. It is defined using the `|` operator, and it signifies that a variable can be any one of several types.

**Basic Union Type**

```tsx
type StringOrNumber = string | number;
let identifier: StringOrNumber;

identifier = '123';  // Valid
identifier = 123;    // Also valid
```

Here, `identifier` can be either a `string` or a `number`.

**Union of Object Types**

```tsx
type Circle = {
  kind: "circle";
  radius: number;
};
type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.sideLength ** 2;
  }
}
```

`Shape` is a union type that can be either a `Circle` or a `Square`, and the function `getArea` calculates the area based on the kind of shape.

An intersection type combines multiple types into one. It is defined using the & operator, meaning the resulting type will have all properties of all constituent types.

**Basic Intersection**

```tsx
type User = {
  name: string;
  age: number;
};

type Employee = {
  companyId: string;
};

type EmployeeUser = User & Employee;

let eu: EmployeeUser = {
  name: "Alice",
  age: 28,
  companyId: "12345"
};
```

`EmployeeUser` is an intersection type that includes all properties from both `User` and `Employee`.


**Using Intersection to Enhance Functionality**

```tsx
type Point = {
  x: number;
  y: number;
};

type Point3D = Point & {
  z: number;
};

let point3D: Point3D = {
  x: 1,
  y: 2,
  z: 3
};
```

`Point3D` combines properties from `Point` with an additional `z` coordinate.

**To recap:**

* **Unions:** Useful when a value can be one of several types. They are often used in scenarios where a function needs to handle inputs of multiple types.
* **Intersections:** Useful for combining multiple existing types or enhancing a type with additional properties. They are particularly handy in mixin patterns or to enforce a combination of behaviors.


### Null Safety

Null safety is a concept in programming that ensures variables and object references do not unintentionally hold or return null values. Null safety is crucial because accessing properties or methods on null values results in runtime errors, which are one of the most common issues in software development. By ensuring that a variable cannot be null without explicit handling, you can write more robust and error-free code.

All types are non-nullable by default. This means you cannot assign null or undefined to a variable of type number, string, etc., without an explicit assertion.

```tsx
let name: string = "Alice";
name = null; // Error: Type 'null' is not assignable to type 'string'.
```

If you want a variable to be able to hold a null value, you must explicitly include null as part of its type using a union type.

```tsx
let age: number | null = null;
age = 25; // Valid
```

Optional chaining is a safe way to access deeply nested properties of an object when there's a possibility that an intermediate property is null or undefined.

```tsx
type User = {
    profile?: {
        age: number;
    };
};

let user: User = {};
let age = user.profile?.age; // 'age' is 'number | undefined'
```

### Null and Undefined

In TypeScript, `null` and `undefined` are two primitive types that each represent the absence of a value, but they are used in slightly different contexts. Understanding these types is crucial for managing the absence of data effectively and avoiding common bugs related to uninitialized variables or missing values.

**Examples of null:**

```tsx
let firstName: string = "John";
firstName = null; //error, firstName is not nullable

let lastName: string | null = "Smith";
lastName = null; //ok
```

**Example of undefined:**

```tsx
function calculate(): number | undefined {
  // Simulate a function that does not always assign a value
  if (Math.random() > 0.5) {
    return 42;
  }
  //  undefined is returned if random is less than 0.5
}

```

The key difference is `null` is an explicit value you can assign to a variable to represent "no value". `undefined` is the default state of a variable that has not been assigned any value since it was declared. Javascript initializes variables as `undefined` by default. `null` needs to be explicitly assigned. TypeScript respects these semantics by default. Typescript is a null safe language. That means by default variables cannot be null or undefined unless you explicitly declare them as such.

You can define variables, parameters, and return types as nullable (able to hold `null` or `undefined`) or non-nullable, thereby making your intent clear and your program's behavior more predictable.

```tsx
function process(data: string | null | undefined) {
  if (data === null || data === undefined) {
    console.log("No data provided.");
  } else {
    console.log(`Processing: ${data}`);
  }
}
```

Understanding the differences and appropriate uses of null and undefined is vital for writing robust TypeScript programs, especially in managing and validating data presence and state within applications.

### Async and Promises

In TypeScript, as in JavaScript, Promise and async functions are fundamental concepts for handling asynchronous operations. They allow you to work with asynchronous code in a way that is cleaner and easier to reason about compared to traditional callback-based approaches.

`async` functions simplify the behavior of using promises and allow you to handle asynchronous operations more synchronously, or in a more linear fashion. When you declare a function as `async`, it implicitly returns a `Promise`.

```tsx
type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchData(): Promise<User> {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}
```
In this example, `fetchData` is an `async` function that fetches data from a URL and returns it as JSON. The await keyword is used to pause the execution of the function until the promise settles, and it makes the asynchronous code look and behave a bit more like synchronous code. While `data` is a type `User` because the function contains the `async` keyword, the return type of the function is `Promise<User>`.

### Typescript and React

Because react components are just javascript functions, typescript can be used to easily type check your component props.

```tsx
type ButtonProps = {
    onClick: () => void;
    label: string;
};

function Button({ onClick, label }: ButtonProps) => (
    <button onClick={onClick}>{label}</button>
);
```

Here button take two props, a function called onClick and a string called label. When using the react components if both props are not set typescript will give an error. You should always make sure to clearly define types for your props to avoid any runtime errors.

### Conclusion

TypeScript is a powerful superset of JavaScript that adds static typing to the language, enabling developers to catch errors early in the development process and enhancing code readability and maintainability. The ability to explicitly define the shape of objects, function parameters, and return types, allows developers to write more predictable and robust code. 

TypeScript has become an indispensable tool for modern web development, particularly in complex projects and those involving large teams or multiple collaborators. Its integration with popular frameworks like React further solidifies its position as a key enabler of enterprise-grade software solutions.