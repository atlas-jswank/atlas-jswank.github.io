---
title: "Next JS: Server Actions"
description: "Lorem ipsum dolor sit amet"
pubDate: "Sept 30 2024"
heroImage: "/next-js2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: false
---

Server Actions allow you to write functions in your components that execute on the server. This approach simplifies form handling and state management by eliminating the need for separate API routes or extensive client-side code.

### The Problem They Solve

Traditionally, handling server-side operations in React requires setting up API endpoints and using client-side code (like fetch or axios) to interact with these endpoints. This setup can lead to:

* **Boilerplate Code:** Writing repetitive code for data fetching and mutations.
* **Complex State Management:** Keeping client and server state in sync can be challenging.
* **Performance Issues:** Extra client-side JavaScript increases bundle size and affects load times.
* **Security Concerns:** Exposing API endpoints may introduce vulnerabilities if not handled properly.

Server Actions address these issues by enabling direct communication between client components and server-side logic without the overhead of traditional API routes.

### How Server Actions Work

Server Actions are functions that you define in your React components but are executed on the server. Here's how they function:

* **Definition:** You write a function in your component and annotate it to indicate it should run on the server with the ‘use server’ directive.
* **Invocation:** When the function is called (e.g., on form submission), React serializes the call and sends it to the server.
* **Execution:** The server receives the call, executes the function, and performs any necessary operations (like database queries).
* **Response:** The server sends back the result, which can be used to update the client-side UI.

This process abstracts away the need for explicit API calls, making your code cleaner and more maintainable.

### Create Topic

We need to add the form for creating a new topic to the `app/ui/topics/new/page.tsx` file. Add following code to the file:

```tsx
import CreateTopicForm from "@/components/CreateTopicForm";

export default function Page() {
  return (
    <div>
      <h1 className={`mb-4 text-xl md:text-2xl`}>New Topic</h1>
      <CreateTopicForm />
    </div>
  );
}
```

Now we need to create a server action for adding a new topic. A server action is a function that runs on the server but can be triggered from the front end.To create the server action add the following code to `lib/actions.ts`:

```tsx
"use server";

import { revalidatePath } from "next/cache";
import { insertTopic } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

```

**Explanation:**

* **addTopic(data: FormData):** This is the form data that is recevied from the front end. On the front end we will submit a form and read the data submitted on the backend using the `FormData` object.
* **insertTopic:** This is the function that will insert the topic into the database. We red the title of the new topic from the form data and call this method to created the new topic on the database.
* **revalidatePath("/ui/topics/[id]", "page")**: By default next js caches pages. Becuase we want the page to rerender reflecting the new topic we need to revalidate the path, otherwise stale data could be shown.
* **redirect(`/ui/topics/${topic.id}`)**: This will redirect the user to the new topic page.

Finally we need to update our form to call the server action. In `components/CreateTopicForm.tsx` add the following code:

```tsx
import { addTopic } from "@/lib/actions";

export default function CreateTopicForm() {
  return (
    <form action={addTopic}>
      ...
    </form>
  );
}
```

### Create Question

There is a form for creating questions. We need to create a new server actions for adding the questions to the database. Add of the following code to `lib/actions.ts`:

```tsx
export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}
```

Here we need two pieces of information from the form. We need the question content and the id of the topic that the question belongs to. We use the insertQuestion function to add the question to the database and then revalidate the path to prevent any caching in nextjs from showing stale data.

Now in the `components/AskQuestion.tsx` file add the following code:

```tsx
import { addQuestion } from "@/lib/actions";

export function AskQuestion({ topic }: { topic: string }) {
  return (
    <form className="relative my-8" action={addQuestion}>
      <input type="hidden" name="topic_id" value={topic} className="hidden" />
      ...
    </form>
  );
}
```

We've added the `addQuestion` action to our form so that our server action will be called when the form is submitted. We've aldo added a hidden input field to the form. This will hold the id of the topic and submit it along with the title value but it will not be displayed on the page.

### Voting

The last action we need to add is voting. Whenever the thumbs up button is clicked we want to increment the vote count displayed next to the question. In `lib/actions.ts` add the following code:

```tsx
export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}
```

Here we are passed the ID of the question from the front end and we call the incrementVotes function to increment the vote count. We then revalidate the path to prevent any caching in nextjs from showing stale data.

Add the following code to the `components/VoteButton.tsx` file:

```tsx
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { addVote } from "@/lib/actions";

export default function VoteButton({ id }: { id: string }) {
  return (
    <form action={addVote}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-none active:ring-2 active:ring-primary"
      >
        <HandThumbUpIcon />
      </button>
    </form>
  );
}
```

### Conclusion

Server Actions in React represent a significant advancement in how developers handle server-side logic in web applications. By integrating server execution directly into your components, you can write cleaner, more efficient code while enhancing performance and security. As the React ecosystem continues to evolve, features like Server Actions will play a crucial role in modern web development.