# Cryptobuddy PWA

The following project is build from the [Ionic PWA Toolkit Beta](https://github.com/ionic-team/ionic-pwa-toolkit) which
leverages [Stencil](https://stenciljs.com/) and an early release of Ionic (4.x+).

***Note: This project is a beta and uses an early release of Ionic 4.***

## Features Included in the Ionic PWA Toolkit

- Stencil for easily building and loading standardized Web Components
- Ionic Framework
- Routing
- Push Notifications setup
- Showing a toast when a new version of the PWA is available
- Unit Tests
- Pre-rendering
- zero config lazy loading
- zero config code splitting
- Polyfills selectively loaded depending on the browser support
- ES6 by default for new browsers, ES5 for older browsers
- Everything needed for an add to homescreen PWA (service worker, web manifest and iOS meta tags)
- lazy-img component for lazy loading below the fold images

## Getting Started

It's very simple to get developing just do:

```bash
yarn 
yarn start
```

## Production

To build your PWA for production, run:

```bash
yarn build
```
A production build includes everything needed for your project to be a PWA right out of the box. This includes both a Web Manifest (src/manifest.json) and a Service Worker (www/sw.js).

## Docker

The project has two Dockerfiles, the primary is based off the Node image and the slimmer `Dockerfile.alpine` uses the
node alpine variant.

Docker can be used for development but it's not really necessary.  If desired use **Docker Compose** as follows:

```
docker-compose -f docker-compose.debug.yml up --build
```

The real advantage is when we deploy to Heroku.  An alternative deployment strategy can be observed below from the original 
Ionic/Stencil docs which suggest Firebase. Firebase aught be more performant as it has H2 push which Heroku doesn't support 
just yet.

## Heroku Deployment

Heroku now allows deployment of Docker containers.

### Initial Setup

1. Ensure that you're logged in via the `heroku-cli`

```
heroku login
```

2. Login in to the Heroku Docker Registry via the cli

```
heroku container:login
```

3. Create a Heroku app.  The following name will be taken if you are cloning this repo so choose another or let heroku
   auto generate with `heroku create`.

```
heroku apps:create cryptobuddy-pwa
```

4.  Build the docker image, the Alpine image is smaller and thus quicker to upload and works perfectly for the current
    requirements.

```
docker build -f Dockerfile.alpine -t cryptobuddy-pwa .
```

5.  Use `docker tag` to label our build so Heroku can understand.

```
docker tag cryptobuddy-pwa:latest registry.heroku.com/cryptobuddy-pwa/web
```

6.  Now we can use `docker push` to upload the build.

```
docker push registry.heroku.com/cryptobuddy-pwa/web
```

7. Optionally you can open the Heroku website and see the PWA in all it's glory.  The following command opens the app in
   your default browser.

```
heroku open -a cryptobuddy-pwa
```

### Subsequent Build and Update Process

Once the app has been created and deployed for the first time develop some more and when comfortable to push observe the
following three step process.

```
docker build -f Dockerfile.alpine -t cryptobuddy-pwa .

docker tag cryptobuddy-pwa:latest registry.heroku.com/cryptobuddy-pwa/web

docker push registry.heroku.com/cryptobuddy-pwa/web
```

## Alternative Hosting - Firebase

For top PWA performance, your app should be hosted with a hosting provider that supports HTTPS and HTTP2 out of the box.

We currently recommend [Firebase Hosting](https://firebase.google.com/docs/hosting/), though we are working on Ionic PWA Hosting with even more features.

### H2 Push

To ensure the fastest possible load time for your PWA, we recommend setting up H2 push on Firebase. [Here is an example](https://github.com/ionic-team/ionic-stencil-hn-app/blob/master/firebase.json#L19-L25) of what this looks like in your `firebase.json` file. Lets go over the steps of how to setup H2 push properly for your Ionic PWA:

- Do a production build of your PWA with `npm run build`
- Serve your WWW folder locally using a local http server and open it in Chrome. https://www.npmjs.com/package/http-server works pretty well for this. If using the http-server package you can serve your www folder by running `http-server www`.
- Open Chrome Dev Tools on your PWA and open the [network tab of your chrome dev tools](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference). Reload the page and you should see all of your JS files show up in the network tab. Besides the `sw.js` file, these are the files you want to H2 push.
- You can then put these files in your push header setup by following this syntax https://github.com/ionic-team/ionic-stencil-hn-app/blob/master/firebase.json#L23.

** Note: In an upcoming release we will be automatically generating this H2 push config for you meaning you will not have to do any of the above anymore **

## Service Workers

For info on how Service Workers work in Stencil check out our [Service Worker docs](https://stenciljs.com/docs/service-workers).

## Developing with a Service Worker

In some cases, for instance when you are working on adding [web push notifications](https://developers.google.com/web/fundamentals/push-notifications/) or [background sync](https://developers.google.com/web/updates/2015/12/background-sync), both which require a Service Worker, it can be handy to be able to dev builds with a service worker.

To do this with the Ionic PWA toolkit simply run `yarn devWithSW`. This will start a dev build, but with the Service Worker also getting livereloaded.

## Lazy Loading Images

Check out the `lazy-img` component in `src/components/lazy-img/lazy-img.tsx`.

## Unit Tests

To run the unit tests once, run:

```
yarn test
```

To run the unit tests and watch for file changes during development, run:

```
yarn test.watch
```

## Testing your PWA's performance

We recommend using https://www.webpagetest.org/easy with the `Run Lighthouse Audit` option turned on. This will give you an in depth look into your PWAs load performance on the average device connected to the average network. For more info on how to use webpagetest check out https://zoompf.com/blog/2015/07/the-seo-experts-guide-to-web-performance-using-webpagetest-2.

## Why Stencil?

Stencil is a tool we developed at Ionic to make it easy to build Web Components and load them in an efficient manner. Generally, using a classic framework like Angular or React will make building a fast PWA challenging. Stencil provides a similar API to Angular and React but is focused on meeting the performance demands of modern Progressive Web Apps.
