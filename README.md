# Noisycharts Composer v0.2

This is the next iteration of our experiments with audiocharts. It is an app for creating, editing and recording charts with the data represented sonically as well as graphically. You can see a live work-in-progress version [here](https://nickjevershed.github.io/noisycharts/)

Built with svelte, vite, d3 and tone-js. 

To run locally:

```
npm run dev
```

Example chart data URLs:

bar chart
https://docs.google.com/spreadsheets/d/1FiaIHyTZCeCVZY39n82eUWm4wBFBqQ0o3OYF7G9Brac/edit#gid=0

rainfaill chart
https://docs.google.com/spreadsheets/d/1XleDoofVMLqs4hdpfoEBt0m2hW086wWWW-cHaeehVDA/edit#gid=0

global co2
https://docs.google.com/spreadsheets/d/10EMTCsz3lOVDFImtDm_LxIufnDw0QMYLcqd6ceLNOdc/edit#gid=0

dog barking attribution
https://docs.google.com/spreadsheets/d/1AcvbBg8rX-gYxW6A_OMme-fxI8rirr71NSMFdhNDsf8/edit#gid=1261944629

meta market cap
https://docs.google.com/spreadsheets/d/1Ul1db0A8O3FPj052kZw0X_6W22efEFbJ2m1T2mW7ZmU/edit#gid=1161881088

elon msuk
https://docs.google.com/spreadsheets/d/11fiuWaK5Hiq9dBCAQnQjvhJIFMEOzXCRQyXH4hqw8FM/edit#gid=1161881088

dog ranking line
https://docs.google.com/spreadsheets/d/1iIMah1HsMrPThZ98a0JNQ0augHcQRM54surN7p5rIFw/edit#gid=1524900328

pound hits all time low
https://docs.google.com/spreadsheets/d/1V3bro2kQaK_HzKA1viV1zW3qbc1nQNrGGlG2vaPiTOs/edit#gid=1304924483

inflation 
https://docs.google.com/spreadsheets/d/1VhJMAYf7bl-3LwbDfrFIlcyJzxbdLx1K_GUeJOi7TJ8/edit#gid=1304924483

zuck
https://docs.google.com/spreadsheets/d/1UHlyqkwnGnL5hQd4irq2mcDfXJDQINjV_Mf0-8a71ZQ/edit#gid=0

continuous testing
https://docs.google.com/spreadsheets/d/14avK1c9BAywhkBHzXBtdW6lXm9OG_nuJ2b3Z2ePLNhg/edit#gid=0

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
