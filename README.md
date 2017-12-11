# How to run

## MongoDB configuration

Before running the app, be sure you've got MongoDB running and accessible.

Any MongoDB configs other than ```localhost``` and it's default port of ```27017```, have to be properly configured by connection url in ```config.json``` file. Also, you can change app's database name.

## Running the app

To run fullstack app:
```
npm i
npm run build
npm run compile
npm start
```

Then, go to http://localhost:8000 in your browser.

Port number can be re-configured in ```config.json``` file.

## Testing

To run server-side integration tests:
```
npm test
```

## Angular client-side app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
