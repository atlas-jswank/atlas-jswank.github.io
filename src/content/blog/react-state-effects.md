---
title: "React State: useEffect"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 24, 2024"
heroImage: "/react-state-3.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
---

In React its common to need to perform actions or "effects" at certain points in the component lifecycle. For example you may want to call an API whenever the component loads for the first time (mounts) or clear data from local storage whenever the component is removed (unmounts).

### The useEffect Hook

The `useEffect` hook in React is a powerful tool for managing side effects in functional components. It allows developers to perform actions such as data fetching independent from the rendering of the component. 

The `useEffect` hook takes a function as its first argument, which is executed after the component renders.

```tsx
function FooBar() {
  useEffect(() => { 
    //Called after the component renders for the first time
    console.log("Component mounted");
    localStorage.setItem("load-time", new Date().toLocaleString());
  });

  return (
    <>
      <h1>Hello useEffect</h1>
    </>
  );
}
```

Optionally, you can return a funtion from the effect hook that will be called whenever the component is unmounted:

```tsx
function FooBar() {
  useEffect(() => {
    //Called after the component renders for the first time
    console.log("Component mounted");
    localStorage.setItem("load-time", new Date().toLocaleString());

    return () => {
      // Called when the component is removed from the page
      console.log("Component unmounted");
      localStorage.removeItem("load-time");
    };
  });

  return (
    <>
      <h1>Hello useEffect</h1>
    </>
  );
}
```

This make it handy to perform cleanup tasks when the component is removed from the page.

Another common use case for `useEffect` is to perform an action whenever a state variable changes. The `useEffect` hook optionally takes an array of dependencies as its second argument. The effect function runs whenever the dependencies change, providing a way to synchronize the component's state with external systems. For example:

```tsx
function FooBar() {
  const [foo, setFoo] = useState(0);
  const [bar, setBar] = useState(0);
  const [baz, setBaz] = useState(0);

  useEffect(() => {
    //Called when foo and bar change but not baz
    localStorage.setItem("foo", foo);
    localStorage.setItem("bar", bar);
  }, [foo, bar]);

  return (
    <>
      <button onClick={() => setFoo(foo + 1)}> Increment Foo</button>
      <button onClick={() => setBar(bar + 1)}> Increment Bar</button>
      <button onClick={() => setBaz(baz + 1)}> Increment Baz</button>
    </>
  );
}
```

This `useEffect` will store the values of foo and bar in local storage whenever they change but nothing happens when baz changes.

### Fetching Data

Lets explore a common use case for `useEffect` in React: fetching data from an API. Here we will integrate will an API for fetching pictures of Dogs. Here is the starter code:

```tsx
import { useEffect } from "react";

function Dogs() {
  useEffect(() => {
    //Call API
  }, []);

  return (
    <>
      <img src="https://images.dog.ceo/breeds/bulldog-french/n02108915_12319.jpg" />
    </>
  );
}
```

We will use the fetch function to call the API. From there we need to store the data returned from the API in a state variable:

```tsx
function Dogs() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/bulldog/french/images/random/3")
      .then((response) => response.json())
      .then((data) => setDogs(data.message));
  }, []);

  return (
    <>
      <img src="https://images.dog.ceo/breeds/bulldog-french/n02108915_12319.jpg" />
    </>
  );
}
```

Let brake down this code:

```tsx
const [dogs, setDogs] = useState([]);
```
This is the state variable we will store the array of dog images in that is returned from the API. `setDogs` will be used to update the value after the API returns data. `dogs` is used to read the list of dog images.

```tsx
  useEffect(() => {
    fetch("https://dog.ceo/api/breed/bulldog/french/images/random/5")
      .then((response) => response.json())
      .then((data) => setDogs(data.message));
  }, []);
```

This `useEffect` hook calls the dog API to get a list of random images. It is called AFTER the first render. fetch happens asynchronously so we need to use the `then` method to read the response that is returned and update our state variable. The `[]` as the second argument to useEffect tells it to run only whenever the component first renders.

Now that we have an array of images we can update our return statement to display the images:

```tsx
 return (
    <>
      {dogs.map((url) => (
        <img key={url} src={url} />
      ))}
    </>
  );
```
Now whenever the component renders a list of random images will display on the page. Let take this a step further and add a button that will increase the number of dogs displayed on the page. Lets create a state variable to track the number of images to fetch:

```tsx
function Dogs() {
  ...
  const [count, setCount] = useState(1);
  ...

  return (
    <>
      <button onClick={() => setCount(count + 1)}>More dogs!</button>
      {dogs.map((url) => (
        <img key={url} src={url} />
      ))}
    </>
  );
}
```

From here we can modify the `useEffect` hook to fetch more dogs when the value of `count` changes:

```tsx
 useEffect(() => {
    fetch(`https://dog.ceo/api/breed/bulldog/french/images/random/${count}`)
      .then((response) => response.json())
      .then((data) => setDogs(data.message));
  }, [count]); // run effect everytime count changes
```

There are two imporant change here. The count variable is added to the API request in the fetch function. We also added the `count` variable to the dependency array. This is necessary to rerun the effect hook whenever count changes. Without this the effect only runs once when the component first mounts.

You'll notice there is a flicker before the images are displayed. This is because the effect hook doesn't run until after the first render. We can add a loading state to show the user that the images are loading. Lets crate a new state variable to track the loading state:

```tsx
function Dogs() {
  ...
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dog.ceo/api/breed/bulldog/french/images/random/${count}`)
      .then((response) => response.json())
      .then((data) => setDogs(data.message))
      .finally(() => setLoading(false));
  }, [count]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <button onClick={() => setCount(count + 1)}>More dogs!</button>
      {dogs.map((url) => (
        <img key={url} src={url} />
      ))}
    </>
  );
}
```

Here we set the loading to true at the start of the effect hook and set loading to false after the data is fetched. We conditionally render a loading message when loading is true. This gives a better user experience when loading data from the API is running slow.

### Conclusion

Using the `useEffect` hook to fetch data from an API is a highly effective way to integrate asynchronous operations into functional components in React. By leveraging `useEffect`, developers can initiate data fetching operations when a component mounts or when specific dependencies change, ensuring that data is loaded and displayed appropriately. This approach simplifies the management of side effects and allows for clear, maintainable code that reacts to changes in data or state. 

Additionally, useEffect facilitates proper handling of cleanup tasks, such as aborting ongoing requests, to prevent potential memory leaks. Overall, `useEffect `streamlines the process of fetching and managing data, enhancing the responsiveness and reliability of React applications.
