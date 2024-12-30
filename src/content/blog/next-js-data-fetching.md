---
title: "Next JS: Data Fetching"
description: "Lorem ipsum dolor sit amet"
pubDate: "Sept 30 2024"
heroImage: "/next-js2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: false
---

One of the most significant advantages of Server Components is their ability to fetch data directly on the server. This means you can perform data fetching within your components without impacting the client-side bundle size or exposing sensitive logic to the client. In this guide, we'll explore how data fetching works in React Server Components, how to implement it effectively, and the benefits it brings to modern web applications.

### What Are Server Components?
React Server Components are components that are rendered on the server rather than the client. They allow you to:

* Fetch data and render components on the server.
* Send a lightweight, serialized version of the component to the client.
* Reduce the amount of JavaScript that needs to run on the client side.

### How Do They Differ from Traditional Components?
* **Server Components:** Rendered on the server, cannot contain client-side interactivity (like state, hooks, or context providers).
* **Client Components:** Rendered on the client, can include interactivity and use React Hooks.

### Benefits of Server-Side Data Fetching

* **Performance:** Reduces the amount of JavaScript sent to the client, leading to faster load times.
* **SEO:** Content is rendered on the server, making it immediately available to search engines.
* **Security:** Sensitive data fetching logic remains on the server, not exposed to the client.

### Topic Links - Sidebar

We want to display the list of topics in th left sidebar. To do this we will need to fetch the topics from the database. In  **components/TopicLinks.tsx**:

```tsx

import { fetchTopics } from "@/lib/data";
import TopicLink from "./TopicLink";

export default async function TopicLinks() {
  const topics = await fetchTopics();
  return (
    <>
      {topics.map((topic) => {
        return <TopicLink key={topic.id} id={topic.id} title={topic.title} />;
      })}
    </>
  );
}
```

Now the topics on the left sidebar will be populated with the topics from the database. 

### Topics Page

We also need to display the topics on the `/ui` page. In `app/ui/page.tsx` add the following code:

```tsx
import { Topic } from "@/components/Topic";
import { fetchTopics } from "@/lib/data";

export default async function Page() {
  const topics = await fetchTopics();
  return (
    <main className="flex flex-col items-stretch justify-stretch">
      <h1 className="mb-4 text-xl md:text-2xl">Topics</h1>
      {topics.map((topic) => (
        <Topic key={topic.id} id={topic.id} text={topic.title} />
      ))}
    </main>
  );
}
```

### Questions Page

On a specific topic's page we want to dislpay the questions for that topic. To do this we will need to fetch the questions for that topic from the datasae similar to how we fetched the topics. In `app/ui/topics/[id]/page.tsx` add the following code:

```tsx
import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchQuestions, fetchTopic } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";

export default async function Page({ params }: { params: { id: string } }) {
  const topic = await fetchTopic(params.id);
  const questions = await fetchQuestions(params.id);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {topic.title}
      </h1>
      <AskQuestion topic={topic.id} />
      {questions.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          text={question.title}
          votes={question.votes}
        />
      ))}
    </div>
  );
}
```

### Conclusion

We now have data being fetched from the database and displayed within our application. Server Components are a powerful tool that simplify the process of fetching data on the server and rendering it on the client without the need for an explicit API layer.