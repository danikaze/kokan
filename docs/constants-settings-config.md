# Constants vs Settings vs Configuration

There are some values that can be customized to affect the execution of the application. Depending on how they are declared and used, they are named in a different way:

* [Build-time Constants](#build-time-constants)
* [Constants](#constants)
* [Settings](#server-settings)
* [Configuration](#configuration)

<a name="build-time-constants"></a>
## Build-time Constants

This is a list of the constants that are available at build time and can be used anywhere in the code.

The main difference between normal constants is that, they are related to the environment more than to the code itself, and they can be used to perform some optimizations, such as **removing code based on their value** (i.e. we wouldn't want some code executed only in server side to be packed in the client side build).

Their declaration and documentation can be found in the `global.d.ts` file, which provides the correct TypeScript definitions. The definition of their values is done in in webpack (`next.config.js`) using `DefinePlugin`.

<a name="constants"></a>
## Constants

Constants defined in the `constants` folder are just values used for development (to avoid hardcoded values/magic numbers), that are not going to change in a build. They cannot be configured by the user at any time (nor at starting the server like the `settings`, nor at real time like the `config`).

<a name="server-settings"></a>
## Server Settings

Server Settings (or just Settings) are values loaded by the server when loaded via setting files (.json files). Their values don't change in runtime but providing them via a .json file makes them easier to be customized: The server needs to be restarted for the new values to be applied, but there's no need to rebuild the code.

This settings are stored in the `data/settings` folder and right now there are only two files that can be applied:

* `default.json` is always loaded
* `dev.json` **extends** the default settings when the build is not for production

<a name="configuration"></a>
## Configuration

Configuration values are stored in the database and applied in real time.
