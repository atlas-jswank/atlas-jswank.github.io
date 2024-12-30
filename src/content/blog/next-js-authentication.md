---
title: "Next JS: Authentication"
description: "Lorem ipsum dolor sit amet"
pubDate: "Sept 30 2024"
heroImage: "/next-js2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: false
---

For this project we will be using an authentication library called [Authjs](https://authjs.dev/). This library integrates with nextjs to handle authentication for our application.


### Setup Auth Handler

Create a file called `auth.ts` and add the following code:

```tsx
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
    }),
  ],
  callbacks: {},
});
```

This sets up Authjs with a credentials provider so users can login with an email and password. We've also added some branding to customize what the login page will look like.

Next we need to add a custom authoize method. This will be called when a user tries to login. Add the following authorize method to your Credentials provider in `auth.ts`:

```tsx
import bcrypt from "bcryptjs";
...
 Credentials({
    credentials: {
      email: {
        label: "Email",
      },
      password: {
        label: "Password",
        type: "password",
      },
    },
    //@ts-ignore
    authorize: async (credentials: { email: string; password: string }) => {
      const { email, password } = credentials;
      const user = await fetchUser(email);
      if (!user) return null; //@ts-ignore
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) return user;
      return null;
    },
  }),
```

This function takes the email and password from the login page, looks up the user in our database and then checks the password to see if it is correct. If correct it returns the new logged in user. Otherwise it returns null.

You will also need to add a authorize callback. This will reject uses who are not logged in:

```tsx
export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    Credentials({ ... }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
```

In nextjs we need to tell the framework when to check authentication. To do this we add a `middleware.ts` file with the following code:

```tsx
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|about|$).*)",
  ],
};
```

Here we export our auth provider we just created as aour middleware. We also define a regex that tells nextjs when to apply the middleware. Here we exclude and urls that shoul dbe publicly available.

You will also need to add the authjs api routes to your application. Create a file called: `app/api/auth/[...nextauth]/route.ts` with the following code:

```tsx
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
```

### Create Auth Secret

The last step is to add a secret value as a environment variable. Run in your terminal:

```bash
npx auth secret
```

This should generate a AUTH_SECRET value and add it to your `.env.local` file.

### Login/Logout Actions

We want the user to be able to login by clicking the login button and to logout by clicking the Sign Out button in the app sidebar.

In `app/page.tsx` there is already a form and button for logging in. We just need to add the signIn action from our auth library:

```tsx
import { signIn } from "@/auth";

...

<form
  action={async () => {
    "use server";
    await signIn("default", { redirectTo: "/ui" });
  }}
>
  <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
    <div>Sign In</div>
  </button>
</form>
```

Now when clicking the login button from the home page the user should be redirected to the login page.

We need to do that same thing for the sign out button in the side bar. In the `components/SignOutButton.tsx` file add the following code:

```tsx
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primary-foreground hover:text-secondary md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}
```

This will use the signOut action from our auth library to sign the user out whenever the sign out button is clicked.