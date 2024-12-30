---
title: "Next JS: The Fullstack Framework"
description: "Lorem ipsum dolor sit amet"
pubDate: "Sept 30 2024"
heroImage: "/next-js2.webp"
author: Jeremiah Swank
authorImage: /jswank.jpg
published: false
---

### Learn Next.js


#### What we'll be Building

We'll be building a simplified version of the question and answer application that has:

* A public home page.
* A login page.
* Dashboard pages that are protected by authentication.
* The ability for users to add, edit, and delete invoices.

The dashboard will also have an accompanying database, which you'll set up later.

By the end, you'll have the essential skills needed to start building full-stack Next.js applications.

#### Overview

Here's an overview of features you'll learn about in this course:

* Routing: How to create nested layouts and pages using file-system routing.
* Data Fetching: How to set up a database on Vercel, and best practices for fetching and streaming.
* Search and Pagination: How to implement search and pagination using URL Search Params.
* Mutating Data: How to mutate data using React Server Actions, and revalidate the Next.js cache.
* Error Handling: How to handle general and 404 not found errors.
* Form Validation and Accessibility: How to do server-side form validation and tips for improving accessibility.
* Authentication: How to add authentication to your application using NextAuth.js and Middleware.
* Metadata: How to add metadata and prepare your application for social sharing.


### Getting Started

#### Create a new Project

clone the repository

#### Folder structure

* **/app:** Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
* **/app/lib:** Contains functions used in your application, such as reusable utility functions and data fetching functions.
* **/app/ui:** Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
* **/public:** Contains all the static assets for your application, such as images.
* **Config Files:** You'll also notice config files such as next.config.js at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app. You will not need to modify them in this course.

