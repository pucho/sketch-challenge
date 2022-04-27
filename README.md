# Sketch Challenge

This is a simple viewer for Sketch documents

The latest version of this app is currently deployed [here](https://sketch-challenge.vercel.app/)

## How to run it locally

This project uses yarn, run:
`yarn install` to install dependencies

To start the development environment, you will need to create a .env.local file
with your root api route `API_ROUTE=<YOURAPIROUTE>`
After that you can run:
`yarn dev`

For running tests run:
`yarn test`
You can keep this running on a separate terminal and it will run everytime a test is updated.
(Currently there are no tests)

## Technical Decisions

Decided to go with NextJS particularly for the included router and next/image component that
provides great functionality out of the box.

For CSS I landed on TailwindCSS, the utility first approach makes it easier to prototype faster for me.
I don't have to worry about setting up variables and a lot of the styling since I can pull from the already
excellent classes provided by them.

For testing I decided to try vitest, but the documentation for testing NextJS pages with ssr is slim, and I
didn't want to spend all my time figuring it out instead of having an actual application. Probably going with
a simple Cypress setup would have been better for this.

## TODO / UPGRADES

Make the image viewer a component that could be reused in the future depending on our needs.

Manage placeholder for pictures, while the pages are using server side rendering, the images get pulled
after the data gets painted on the browser and it is creating layout shifts after load the first time
a user visits the page.

Working on accessibility which in the current iteration does not look good.

I would like to investigate more on how to manage the cache with NextJS and GraphQL to minimize hitting
api if the document hasn't been updated since last load.
Also having generated types from the schema on the frontend would have been great for the dx.

I'd think about streamlining the navbar depending on where the user is located instead of having custom bars on each page.

Would like to add a dynamic landing, where we get the list of documents from the api so the users can select the documents they want to see
