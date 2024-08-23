---
title: "React State: useState"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 23, 2024"
heroImage: "/react-state.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
---

It is common to need to store and update data in a component based on some interaction from the user. In React, component-specific memory is called state. State is a way to manage and store data that can change over time affecting the rendering of a component.

**Consider the following:**

```tsx
import { useState } from 'react';

function Counter() {
  let count = 0;

  function increment() {
   count = count + 1; // does not do anything
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

Here there is a count variable that is changed anytime the button is clicked. But this code does not work because react does not know to rerender whenever the variable changes. In this case react renders once with a value of 0 when it first loads and then never again even as the value of count changes.

We need a way to notify react that the component should rerender when certain variables change. This is where state comes in.

### The useState Hook

In functional components, state is managed using the useState hook. This hook provides a way to declare state variables and update them.

```tsx
import { useState } from 'react';

function Counter() {
  // Declare a state variable `count` and a function `setCount` to update it, default value is 0
  const [count, setCount] = useState(0);

  // Event handler to increment the count
  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

`useState(0)` initializes the `count` state variable to 0 and provides a function `setCount` to update it. When `setCount` is called, React re-renders the component to reflect the new state.

Its possible to use multiple state variables. Here we have a form that has two state variables in a component. As the input fields change the state variables are updated:

```tsx
function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <form>
      <input type="text" value={firstName} onChange={handleFirstNameChange} />
      <input type="text" value={lastName} onChange={handleLastNameChange} />
    </form>
  );
}
```

### More about Hooks

As a convention in react hooks always start with `use`. There are other supported hooks such as `useEffect` and `useContext`. You can also create custom hooks to encapsulate reusable logic so make sure to always start the name of your custom hook with `use`.

There are some gotchas with hooks that we need to be aware of in order to use them effectivly. For example, you can’t call hooks inside conditions, loops, or other nested functions. Always define hooks at the top of your component similar to how you “import” modules at the top of your file.

### Working with State

Lets go through some examples of how to use state in a component to filter, sort and page data.

#### Filtering Data

Let say you have a unordered list of fruits that you want to filter based on the user's input:

```tsx
const data = ["apple", "banana", "apricot", "blueberry"];

function FruiList() {
  return (
    <>
      <input type="text" />
      <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

To start you will need a state variable for the filter value. Use the `useState` hook to declare the state variable and initialize it with an empty string:

```tsx
function FruiList() {
  // Create a state variable for the filter value
  const [filter, setFilter] = useState("");
  return (
    <>
      <input type="text" />
      <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

Next you need to update the state variable when the user types in the input field. Use the `onChange` event listener to set the filter state variable to match the value of the input field:

```tsx
<input type="text" onChange={(e) => setFilter(e.target.value)} />
```

Now you can filter the array of fruits based on the value of the filter:

```tsx
function FruiList() {
  const [filter, setFilter] = useState("");

  //Filter data based on filter value
  const filteredData = data.filter((item) => item.startsWith(filter));

  return (
    <>
      <input type="text" onChange={(e) => setFilter(e.target.value)} />
      <ul>
        { //Use filteredData instead of data
          filteredData.map((item) => (
            <li key={item}>{item}</li>
          ))
        }
      </ul>
    </>
  );
}
```

Now when you type in the input field the list will be filtered based on the value of the input field.

#### Sorting Data

Let say you have a list of fruit with a label and a price. You want to be able to sort alphabetically and by the price:

```tsx
const data = [
  { label: "apple", price: 0.99 },
  { label: "banana", price: 1.15 },
  { label: "apricot", price: 0.75 },
  { label: "blueberry", price: 0.25 },
];

function FruiList() {
  return (
    <>
      <button>Sort by label</button>
      <button>Sort by price</button>
      <ul>
        {data.map((item) => (
          <li key={item.label}>
            {item.label} ({item.price})
          </li>
        ))}
      </ul>
    </>
  );
}
```

Just like in the filtering example we need a state variable to store which field is used to sort the data. We will set the default value to "label" so the list is sorted alphabetically by default:

```tsx
const [sort, setSort] = useState("label");
```
And we need to set the sort value whenever the buttons are clicked:
```tsx
<button onClick={() => setSort("label")}>Sort by label</button>
<button onClick={() => setSort("price")}>Sort by price</button>
```

Now you can sort the values of the array based on the sort state value. We will use the array's built in [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function. A negative return value indicates that `a` should come before `b`. A positive return value indicates that `a` should come after `b`.
Zero indicates that `a` and `b` are considered equal. 

We will use `toLocalCompare()` to compare strings values and subtraction to compare numeric values:

```tsx
function FruiList() {
  const [sort, setSort] = useState("label");

  // sort the data array by the sort value
  const sortedData = data.sort((a, b) => {
    if (sort === "label") {
      return a.label.localeCompare(b.label);
    }
    if (sort === "price") {
      return a.price - b.price;
    }
  });
  return (
    <>
      <button onClick={() => setSort("label")}>Sort by label</button>
      <button onClick={() => setSort("price")}>Sort by price</button>
      <ul>
        { // use sortedData instead of data
          sortedData.map((item) => (
            <li key={item.label}>
              {item.label} ({item.price})
            </li>
          ))
        }
      </ul>
    </>
  );
}
```

Now the data is sortable whenever the buttons are clicked but lets try to make it sortable in ascending and descending order. We need another state variable to track the sort direction. We will set the default value to "asc" for ascending order:

```tsx
const [direction, setDirection] = useState("asc");
```
And now we need a way to set the sort direction any time the sort button is clicked. Lets create a helper funtion to do this:
```tsx
function FruiList() {
  const [sort, setSort] = useState("label");
  const [direction, setDirection] = useState("asc");
  
  ...

  const handleSortingChange = (field) => {
    const sortOrder = sort === field && direction === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  };

  ...
}
```

If the field is already sorted by the current "field" then the direction will change from asc to desc or desc to asc. Otherwise the sort field will change and the order will be set to "asc". This is the typical sorting behavior you would see on a table.

Now we need to update our buttons to use the new sort event handler:

```tsx
<button onClick={() => handleSortingChange("label")}>Sort by label</button>
<button onClick={() => handleSortingChange("price")}>Sort by price</button>
```

Next we need to update our sort function. If the direction is "desc" we will multiply the return value by -1 to reverse the order:

```tsx
const sortedData = data.sort((a, b) => {
  if (sort === "label") {
    return a[sort].localeCompare(b.label) * (direction === "desc" ? -1 : 1);
  }
  if (sort === "price") {
    return (a.price - b.price) * (direction === "desc" ? -1 : 1);
  }
});
```
Now we have a fully sortable list that can be sorted in ascending and descending order.

#### Paging Data

Whenever you have a long list of data it is common to want to paginate the data so that a user can view only a subset of the data at a time. Here we start with a list if data and a next and previous button:

```tsx
function FruiList() {
  return (
    <>
      <ul>
        {
          data.map((item) => (
            <li key={item.label}>
              {item.label} ({item.price})
            </li>
          ))
        }
      </ul>
      <button>Previous</button>
      <button>Next</button>
    </>
  );
}

```

We need a state variable to keep track of the current page:

```tsx
const [page, setPage] = useState(1);
```
Now we can use the array slice method to select a subset of the data array. Here we have a constant `PAGE_SIZE` that determines how many items are displayed on each page:

```tsx
const currentPage = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
```

This will limit the rows of data to the `PAGE_SIZE`. To change the page we need to increment and decrement the page state variable using the buttons:

```tsx
<button onClick={() => setPage(page - 1)}>Previous</button>
<button onClick={() => setPage(page + 1)}>Next</button>
```
To make sure we dont go beyond valid page values we need to disable the next/previous button. Lets create some variables to track teh page boundaries:

```tsx
const hasMore = data.length > page * PAGE_SIZE;
const hasLess = page > 1;
```
Now we can disable the next/previous button if there are no more pages:

```tsx
<button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
<button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
```

Putting it together it looks like this:

```tsx
const PAGE_SIZE = 5;

function FruiList() {
  const [page, setPage] = useState(1);

  const currentPage = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = data.length > page * PAGE_SIZE;
  const hasLess = page > 1;

  return (
    <>
      <ul>
        {currentPage.map((item) => (
          <li key={item.label}>
            {item.label} ({item.price})
          </li>
        ))}
      </ul>
      <button disabled={!hasLess} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </>
  );
}
```
 We now have a fully functioning paginated list!

 ### Conclusion

 Hopefully by now you can see how powerful state variables can be in react. React state is a fundamental concept that empowers developers to create dynamic and interactive user interfaces. By managing state within components, React allows for seamless updates and re-renders, ensuring that the UI consistently reflects the latest data and user interactions.