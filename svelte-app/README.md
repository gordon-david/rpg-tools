This application is developed using Sveltekit and the static adapter. It is largely a toy app used for testing and prototyping.

## SSG

Running `npm run build` executes a compilation of the site to the `/build` directory. This directory is appropriate for serving statically. This was achieved using the following...
- installing and using `@sveltejs/adaptor-static`. The settings for the adaptor can be seen in `svelte.config.js`. 
- adding "trailing slash support" in `/routes/+layout.js`. This ensures that links to pages like `/a` work, as the compiler will generate `/a/index.html`. By default the `/a` directory isn't created, and only a `/a.html` file is created, this may not be served in certain webserver environments.