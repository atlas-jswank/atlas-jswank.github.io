---
title: "Next JS: App Router"
description: "Lorem ipsum dolor sit amet"
pubDate: "Sept 30 2024"
heroImage: "/next-js2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: false
---

The App Router in Next.js is a new and powerful routing mechanism introduced to simplify and enhance the process of building dynamic applications. It provides a more intuitive way to define routes, leveraging a file-based structure within the app directory. 

Each folder and file within the app directory corresponds to a route, with special files like page.js representing individual pages and layout.js providing a reusable layout for nested routes. 

We will be creating the following routes:

* `/` **(app/page.tsx)**: The homepages for non logged in users.
* `/about` **(app/about/page.tsx)**: An about page for the application.
* `/ui` **(app/ui/page/tsx)**: The home page of the application once a user logs in.
* `/ui/topics/:id` **(app/ui/topics/[id]/page.tsx)**: A page for displaying the list of questions for the given topic.
* `/ui/topics/new` **(app/ui/topics/new/page.tsx)**: A page for creating new topics.

### Home Page

Replace the contents of  `app/pages.tsx` with:

```tsx
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";

export default function Page() {
  return (
    <main className="w-screen py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex lg:flex-row flex-col gap-4 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
              Unlock the Power of the Web
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Discover our suite of tools and services to build, deploy, and
              scale your web applications with ease.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <form>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <div>Sign In</div>
                </button>
              </form>
              <a
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </a>
            </div>
          </div>
          <Image
            src={placeholder}
            alt="Hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover w-full max-w-[550px]"
          />
        </div>
      </div>
    </main>
  );
}
```

Now when you navigate to `http://localhost:3000` you should see the contents you just changed.

### About Page

Create a new file `app/about/page.tsx` with the following content:

```tsx
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="w-screen py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <a href={"/"}>
          <ChevronLeftIcon className="h-6 w-6 " />
        </a>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
            About Us
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vestibulum nisi sed orci imperdiet ullamcorper. Vivamus sit amet
            odio ac lacus consectetur ornare ac id felis. Maecenas tristique
            urna a imperdiet eleifend. Cras molestie luctus nisl, vel tempus
            urna rutrum ut. Quisque finibus, odio quis rhoncus placerat, justo
            est cursus tellus, ac ultricies purus ex eget mauris. Nulla nec
            libero eu diam aliquet lacinia sed eu lacus. Curabitur at porta
            nibh. Nam auctor vitae erat sed tristique. Proin leo nisl,
            condimentum ac libero eget, euismod convallis tortor. Mauris in nisi
            tellus. Cras vestibulum varius massa, ac congue risus cursus vel.
            Aliquam eu lacinia nisi. Integer ipsum elit, consequat lobortis
            blandit id, congue ac libero.
          </p>
          <p>
            Suspendisse suscipit dignissim ante in pretium. Suspendisse
            porttitor bibendum augue quis luctus. Aliquam erat volutpat. Duis
            vel accumsan orci. Donec purus tellus, luctus id fermentum eget,
            fringilla nec odio. Morbi porttitor, velit eget tincidunt commodo,
            metus odio molestie risus, at euismod metus ligula sit amet urna.
            Mauris suscipit metus eu enim mollis aliquam. Suspendisse massa
            ligula, euismod eget volutpat nec, cursus ac neque. Phasellus mauris
            neque, luctus ut interdum et, dictum at nulla. Curabitur sed metus
            sit amet tellus accumsan accumsan. Ut fermentum elementum orci vitae
            pellentesque.
          </p>

          <p>
            Nullam consequat efficitur eros, quis aliquet est venenatis eu. In
            lacus justo, congue in sodales et, elementum at metus. In sem nunc,
            dictum eget dui sed, congue faucibus ex. Pellentesque faucibus massa
            eu arcu aliquet, vitae vehicula lorem varius. In ultrices mattis
            mollis. Mauris luctus quis nulla sed finibus. Pellentesque suscipit,
            risus id vulputate lobortis, urna nunc dictum urna, id ultricies
            risus nisi a nisl. Donec quis nulla varius, scelerisque felis a,
            euismod mi. Ut vel rhoncus tellus, accumsan consectetur libero. Sed
            a leo blandit, laoreet leo eu, mattis sem. Nulla consectetur luctus
            nisl, eu sodales ante. Fusce viverra euismod consequat. Mauris ut
            nulla ut sapien dictum convallis nec ac leo.
          </p>
        </div>
      </div>
    </main>
  );
}
```

Now when you navigate to `http://localhost:3000/about` you should see the "About Us" page contents displayed.

### UI Home Page

Create a new file `app/ui/page.tsx` with the following content:

```tsx
export default function Page() {
  return <div>Topics Page</div>;
}
```

Now when you navigate to `http://localhost:3000/ui` you should see "Topics Page" displayed.

### New Topics Page

Create a new file `app/ui/topics/new/page.tsx` with the following content:

```tsx
export default function Page() {
  return <div>New Topics Page</div>;
}
```

Now when you navigate to `http://localhost:3000/ui/topics/new` you should see "New Topics Page" displayed.

### Topic Page

Create a new file `app/ui/topics/[id]/page.tsx` with the following content:

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>Topic Page: {params.id}</div>;
}

```

Now when you navigate to `http://localhost:3000/ui/topics/12345` you should see "Topics Page: 12345" displayed.

Here `[id]` tells nextjs app router that id is a dynamic route and whatever is the value is should be passed to the component through the params prop.

### UI Layout

Layouts can be created at any level to apply common components to all pages  in the current and sub directories. In this case we will create a layout for the `/ui` directory.

Create a new file `app/ui/layout.tsx` with the following content:

```tsx
import SideNav from "@/components/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

This creates a layout that will apply to `/ui` and all sub routes (`/ui/topics/:id`, `/ui/topics/new`, etc.) This adds a Sidenav component to the left side of each of these pages.

### Loading State

The loading component will appear before the page is loaded. Similar to the layout component it will apply to the current directory and all sub directories.

Create a new file called `app/ui/loading.tsx` with the following content:

```tsx
import { TopicsSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return <TopicsSkeleton />;
}
```

This component will be displayed while any of the pages in the ui directory are loading. To simulate slow page loading change `app/ui/[id]/page.tsx` to the following:

```tsx
export default async function Page({ params }: { params: { id: string } }) {
  //Simulate Page loading
  await new Promise((r) => setTimeout(r, 3000));

  return <div>Topic Page: {params.id}</div>;
}
```

This will wait for 3 seconds before rending the page. Now when you navigate to `http://localhost:3000/ui/topics/12345` you should see a loading state displayed.

### Navigation

In order to improve performance while navigating we need to remove the `a` tags and replace them with `Link` components from `next/link`. This will only refresh the parts of the page that need to change. Go through all of the files finding all of the `a` tags and replace them with `Link` components.

Example in the `NavLink` component:

```tsx
...
import Link from "next/link";

export default function NavLink({ name, href }: Props) {
  return (
    <Link
      key={name}
      href={href}
      ...
    >
      <ListBulletIcon className="w-6" />
      <p className="md:block">{name}</p>
    </Link>
  );
}
```

Now when clickiing on links you should notice a smoother page performance.

### Highlight Active Link

We want the topics in the side nav bar to be highighted if they are the active page. To do this we need to change the `TopicLink` component to be a client side component. By default components render server side in next js. You must add the "use client" directive to the component file to tell next js to render this component client side. This will give our component access to browser APIS that will allow us to check the current url and apply special styling to the link. Change the `TopicLink` component to the following:

```tsx
"use client";

import { HashtagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  id: string;
  title: string;
};

export default function TopicLink({ id, title }: Props) {
  const pathname = usePathname();
  const href = `/ui/topics/${id}`;
  return (
    <Link
      href={href}
      className={clsx(
        " hidden h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex hover:bg-primary-foreground md:flex-none md:justify-start md:p-2 md:px-3",
        { "bg-primary-foreground text-secondary": pathname === href }
      )}
    >
      <HashtagIcon className="w-6" />
      <p className="hidden md:block">{title}</p>
    </Link>
  );
}
```


**Explanation:**

* **"use client":** this is a directive that tells next js to render this component client side.
* **usePathname():** this hook returns the current url path. This is the reason our component must be a client component. This hook does not work server side.
* **"bg-primary-foreground text-secondary": pathname === href**: this is the line that conditionally applies styes to the link if the current link is the current page. `clsx` will only apply the **"bg-primary-foreground text-secondary"** styles if **pathname === href**.

Now when you select a topic from the side nav bar you should see the topic highlighted if it is the current page.