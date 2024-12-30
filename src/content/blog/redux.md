---
title: "Redux: Advanced State Management"
description: "Lorem ipsum dolor sit amet"
pubDate: "Sept 15 2024"
heroImage: "/redux.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: true
---

In modern web development, managing the state of an application can become a complex task, especially as the application grows in size. To solve this problem, developers use state management libraries like **Redux**, which is built upon a design pattern called **Flux**. This blog post will explain the core concepts of Redux, the Flux design pattern, and when you should consider using Redux in your applications.

### The Flux Design Pattern

**Flux** is an architecture pattern created by Facebook to manage data flow in an application. The core idea behind Flux is **unidirectional data flow**, which ensures that data changes in a predictable and organized manner.

Here are the main components of the Flux pattern:

1. **Actions:** These are objects that represent an event that has happened. The event could be something like "User Clicked a Button" or "Data Fetch Succeeded".
2. **Dispatcher:** The dispatcher is a central hub that manages all the actions in the application. When an action is dispatched, the dispatcher sends it to all the stores (state containers).
3. **Stores:** In Flux, stores manage the state and business logic. They listen to actions, update their data accordingly, and emit a change event when the state has been updated.
4. **View:** Views are typically your user interface components (e.g., React components). They listen for state changes in the store and update the UI accordingly.

### What is Redux?

Redux is a popular state management library for JavaScript applications, especially those built with React. It provides a central place (or "store") to keep the application's state and ensures that the state changes in a predictable and testable way.

At its core, Redux is based on a few key principles:
1. **Single Source of Truth:** The entire state of your application is stored in a global object called the "store".
2. **State is Read-Only:** The only way to change the state is to emit an action, an object describing the change.
3. **Changes are Made with Pure Functions:** To specify how the state tree is transformed by actions, you write pure functions called reducers. The reducer takes the current state and the action as arguments, and returns the new state.

### How Redux Relates to Flux

Redux follows a unidirectional data flow, similar to Flux, where:

1. An **action** is dispatched.
2. The **reducer** receives the action and computes the new state.
3. The updated state is stored in the **store**.
4. The **view** (usually React components) listens to the store and re-renders based on the updated state.

By centralizing the state and enforcing predictable state updates, Redux solves many issues of managing complex state across an application.

### When to Use Redux

While Redux is a powerful tool, it's not necessary for every application. Here are some cases where you would want to consider using Redux:

1. **When your application has a lot of shared state:** If multiple components across different parts of the application need to share and update the same data, Redux makes this easier by providing a single source of truth.

2. **When your state management is complex:** If your state involves multiple nested objects, interdependent updates, or changes that need to be propagated across various parts of your application, Redux's structure and organization help to simplify this complexity.

3. **When you need predictable state updates:** Because Redux enforces that the state can only be updated through actions and reducers, debugging and testing your application becomes easier, as you always know how the state was updated.

#### Getting Started with Redux

We'll install **React-Redux**, and **Redux Toolkit**.

```
npm install @reduxjs/toolkit react-redux
```

#### Creating the Redux Store

In the `src` directory, create a new file named `store.ts`.

```tsx
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {},
});

// These types are helpful for the typescript autocomplete
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Add types to dispatch and selector hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

In your App component wrap your app in the Provider component. This will make the data from the redux store available to all the components in your application.

```tsx
import { Provider } from "react-redux";
import store from "./store";
import { ShoppingList } from "./ShoppingList/ShoppingList";

function App() {
  return (
    <Provider store={store}>
      <ShoppingList />
    </Provider>
  );
}
```

#### Defining the Shopping List Slice

Next create the slice to hold the shopping list data. In a file called `src/slices/shoppingListSlice.ts` add the following:

```tsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "1", name: "Item 1", completed: false },
    { id: "2", name: "Item 2", completed: true },
  ],
};

export const listSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
});

export default listSlice.reducer;
```

Here we created a slice called `shoppingList`  and added an initial state with two items.

Next go back to your `store.ts` and add the reducer from the shopping list slice:

```tsx
import shoppingListReducer from "./slices/shoppingListSlice";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});
```

Now the data from the shopping list slice is available anywhere in the applciation. We can use the `useAppSelector` hook to access the data.

```tsx
import { useAppSelector } from "./store";

export function ShoppingList() {
  const items = useAppSelector((state) => state.shoppingList.items);
  return (
     <ul className="space-y-2">
        {items.map((item) => (
          <ShoppingListItem
            key={item.id}
            id={item.id}
            completed={item.completed}
            name={item.name}
          />
        ))}
     </ul>
  );
}
```

The `useSelector` hook allows React components to access and read data from the Redux store. It serves as the primary way to "select" parts of the global state in a component.

#### Creating the Actions and Reducers

At this point we have a working Redux store with a slice that holds the shopping list data and we can read that data in our react components. Now we need to create the actions and reducers in order to update the state.

##### Add Items Action

Back in the shoppingListSlice.ts file, add the following `addItem` reducer function:

```tsx
export const listSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload,
        completed: false,
      });
    },
  },
});

//Dont forget to export the actions
export const { addItem } = listSlice.actions;
```

This function takes the current state and an action payload. The text of the new list is passed in the action payload. To trigger this action, we need to dispatch it from our component.

```tsx
import { useAppDispatch } from "../store";
import { addItem } from "../slices/shoppingListSlice";

export function AddItemForm() {
  const [newItem, setNewItem] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (newItem.trim() !== "") {
      dispatch(addItem(newItem));
      setNewItem("");
    }
  };
  ...
}
```

Here we use the `useAppDispatch` hook to get the dispatch function from the store. We then dispatch the `addItem` action with the new item as the payload. We can now succesfully add items to the shopping list in our redux store.

##### Toggle Item Completed Action

Next we need to add an action to toggle the completed status of an item. Add the following code to the `shoppingListSlice.ts` file:

```tsx
export const listSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload,
        completed: false,
      });
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

//Dont forget to export the actions
export const { addItem, toggleItem } = listSlice.actions;
```

Once the reducer function is defined we can dispatch the action from our component to toggle the completed status of an item.

```tsx
export function ShoppingListItem() {
  const dispatch = useAppDispatch();
  const toggleItemCompletion = () => {
    dispatch(toggleItem(id));
  };
  ...
}
```

#### Persisting State to Local Storage

Now that we have actions to add and toggle items, we can persist the state to local storage so that our data is saved even when the user refreshes the page. Start by adding the `redux-persist` library to your project.

```bash
npm i redux-persist
```

Next add `redux-persist` to the `store.ts` file.

```tsx
import { persistReducer, persistStore } from "redux-persist";

const persistedShoppingListReducer = persistReducer(
  { key: "shoppingList", storage },
  shoppingListReducer
);

export const store = configureStore({
  reducer: {
    shoppingList: persistedShoppingListReducer,
  },
});

export const persistor = persistStore(store);
```

The next step is to wrap the app in a PersistGate component in the same place as the Provider component. This will ensure the component doesnt render until the data has been loaded from local storage.

```tsx
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShoppingList />
      </PersistGate>
    </Provider>
  );
}
```

And thats it! Now we have state data that is persisted to local storage and can be access if the page is refreshed.

### Conclusion

Redux is a powerful state management tool that provides a predictable and testable way to manage state in JavaScript applications. By leveraging the principles of the Flux design pattern and centralizing the state into a single store, Redux simplifies complex state management in large applications.

However, it's important to evaluate whether your application truly needs Redux, as it can introduce extra complexity when used unnecessarily. For simple applications or small state management needs, React’s built-in tools might be more than enough.

