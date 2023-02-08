## Project Structure

This project takes cues from the project structure in [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

### Source Directory

```sh
src/
- assets        # contains all static assets like images, json files, svgs, etc.
- shared        # shared modules used throughout the application and depended on by features
   - components # shared components
   - hooks      # shared hooks
   - stores     # shared stores
   - types:     # base types used across the application
- pages:        # components used as top-level route components, these are passed directly to the router and act as specific pages of the site.
- features:     # modules based on domain features
```
```sh
src/             
├── assets        # contains static files such as images, svg, json, etc.
├── features      # feature modules
├── pages         # used as top-level, page components for the router
└── shared        # shared modules
   ├── components # shared components
   ├── hooks      # shared hooks
   ├── stores     # shared stores
   └── types      # base application types
```

### Features

Features are modules that are isolated from other features. A feature can only import shared functionality from a 'shared' module such as `shared/components`. Features explicitely export types, routes, and components needed to integrate the feature with the application. All feature modules must be contained in the `features` directory.

```sh
<feature-name>    # the top level directory is named for the feature it contains
    components    # components used internally or exported 
    routes        # aggregate components suitable as a top level route for the feature
    hooks         # feature hooks
    types         # types used by this componet, usually exported for integration
    tests         # feature tests
    index.ts      # exports feature code for intergration elsewhere
```
