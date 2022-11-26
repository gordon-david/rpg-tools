This project is built with Create React App.

## Project Structure

*src*

- pages: contains components rendered directly by the router. These are treated as pages of the website, and should give a good overview of everything on a single page.
- shared: contains components, modules, and other assets that are used throughout the application.
- feature: these are feature modules organized logically or by project. They are isolated from other features and only import from the shared directory.