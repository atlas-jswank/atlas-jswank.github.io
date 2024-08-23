---
title: "React State: Context Providers"
description: "Lorem ipsum dolor sit amet"
pubDate: "August 25, 2024"
heroImage: "/react-state-2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
---

Its common to pass data from parents components to child components but as your application grows in size and complexity, this can become tedious for developers to write and verbose to read. Consider the following example:

```tsx
function App() {
  const [name] = useState("Lumi");
  return <Foo name={name} />;
}

function Foo(props) {
  return <Bar name={props.name} />;
}

function Bar(props) {
  return <Baz name={props.name} />;
}

function Baz(props) {
  return <div>Hello {props.name}</div>;
}
```

Here we have a state variable `name` that is set in the App components and then passed through three layers of child components until it reaches the `Baz` component. `Foo` and `Bar` do not utlize the name prop but must pass the data along so that it can reach the child component `Baz`. Every time we create a new instance of the `Foo` component we have to make sure it passes a name prop to its children. This is a problem common in react called "prop drilling"

### Context Providers

Context providers are a way to pass data down the component tree without having to pass props through each level. You wrap the parent component in a "Provider" and then call the `useContext` hook to access the data in the child component. Here is the same code using a context provider:

```tsx
const AppContext = createContext();

function App() {
  const [name] = useState("Lumi");
  return (
    <AppContext.Provider value={{ name }}>
      <Foo />
    </AppContext.Provider>
  );
}

function Foo() {
  return <Bar />;
}

function Bar() {
  return <Baz />;
}

function Baz() {
  const { name } = useContext(AppContext);
  return <div>Hello {name}</div>;
}
```

Here `Foo` and `Bar` do not have to be aware of the name state variable because they do not utilize its value. As long as `Baz` remains a child of the `AppContext.Provider` it will always be able to access the value of `name` from the context.

This is handy when refactoring code as well. Every time you move a component it possible to accidently break the chain of data being passed from parents to chidren. By using context providers you can ensure that the data is always available to the child components.

### Use Cases for the Context Provider

Here are some common use cases where React Context Provider is particularly useful:

#### Theme Management

Context Providers are often used to manage and apply consistent theming across an application. By defining a theme context, you can provide theme-related data (such as colors, fonts, and styles) to all components that need it, ensuring a unified look and feel throughout the app. Think about dark mode. A user can toggle on dark mode and the context can be used to update the styling of the entire application.

#### User Authentication

Context Providers can manage user authentication state, such as login status and user information, making it accessible throughout the application. This allows components to render differently based on whether a user is logged in or not.

#### Localization (i18n)

For applications that support multiple languages, a context provider can manage localization settings and provide translated strings to all components, ensuring that the user interface is appropriately localized based on the current language.

#### Global Settings

Context Providers can be used to manage and provide global settings or configurations that multiple components need access to. This can include settings like user preferences, application-wide configurations, or feature flags

### Conclusion

Context Providers are a versatile tool for managing and distributing state or configuration across a component tree. By leveraging context providers, you can simplify data flow, avoid prop drilling, and ensure a consistent application state across your React components.