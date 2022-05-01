---
layout: page
title: Developer Guide

---

* Table of Contents
{:toc}
-----
This developer guide aims to provide a good overview of our website. Our purpose is to keep statistics of Korean students in NUS, and further utilize it to serve our population better.

## Acknowledgements

1. {To be added...}

## Tech Stack

1. Firebase - Auth, Firestore, Functions, Hosting, Storage
2. React.js
3. TypeScript
4. Jekyll for GitHub Pages

## Initial Setup

For new members of the IT team, one of the existing members will conduct an orientation session to introduce the major parts of the website. This focuses mostly on general understanding of the website structure and also on style/convention guidelines in using Java, Git, and GitHub.

## Website Structure

### Routes

For details, please look into [AppRouter Component](../src/components/AppRouter.tsx).

This section describes all accessible pages based on the permission level.

**Without Login**
1. [Home](../src/routes/Home.tsx)
2. [AboutUs](../src/routes/AboutUs.tsx)
3. [SignIn](../src/routes/SignIn.tsx)
4. [SignUp](../src/routes/SignUp.tsx)

**Any Logged In User**

*depends on the role (permission)

1. [BoardHome](../src/routes/BoardHome.tsx)
2. [Board](../src/routes/Board.tsx)
3. [Post](../src/routes/Post.tsx), [AddPost](../src/routes/AddPost.js), [EditPost](../src/routes/EditPost.js)
4. [Profile](../src/routes/Profile.tsx), [EditProfile](../src/routes/EditProfile.tsx)
5. [PasswordResetRequest](../src/routes/PasswordResetRequest.tsx)

**Admin**

1. [Verification](../src/routes/Verification.tsx)
2. (To be added) [Dashboard](../src/routes/Dashboard.tsx)

## Components

Each component is located in its corresponding route-name folder. For example, components related to the route Post will have the path of `/src/components/Post/...`. For components that do not belong to a specific route currently belongs to the components folder.

## Types

Type is similar to an Object in Java as it provides a blueprint for items and data in JavaScript. In this project, types are used mostly to describe data fetched from Firebase & Firestore and prevent accessing non-existent fields. Refer to [types folder](../src/types) to access the current list of types.

### When do I use types?

In this project, you should make use of types as much as possible. If any one of the condition below is met, you should definitely consider using types!

1. Data fetched will be used repeatedly and have similar structure.
2. There are a lot of key-value pair in the object, and it will be easier to understand with types.

Using types will likely enhance the readability of your code in the above two cases.

## Utility Classes and Functions

Utility classes have useful methods that can be used in many different classes within the project folder. 

1. [Firebase-related functions](../src/utils/firebaseFunctions.ts)
2. [Sample Comment](../src/utils/SampleComment.ts), [Sample Post](../src/utils/SamplePost.ts), and [User](../src/utils/SampleUser.ts)
> A sample comment has a randomized content, and a sample post has a randomized title and content.
3. [Time-related functions](../src/utils/TimeHelper.ts)
4. [Website colors](../src/utils/ThemeColor.ts): Color palette for our website
5. [Website text style](../src/utils/ThemeText.tsx): Font-related components for texts in the website. Headline is used for regular display texts

## Convention: JavaScript & TypeScript

This convention will be enforced by eslint.

## Convention: Git & GitHub

Please refer to this [link](https://se-education.org/guides/conventions/git.html).

Following Git & GitHub convention will allow your reviewer to review easily and approve your PR faster!

## Code Quality Management & Important Instructions

For now, follow these two to manage your code quality. This guide assumes that you know the general variable naming principles!

1. Avoid arrowhead style codes!
2. Avoid long functions (> 50 lines)
