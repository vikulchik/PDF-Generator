# PdfConverter



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Project structure:
 - main - Entry folder with all necessary configurations, routes, etc...
 - components - reusable components across applications
 - services - shared services across pages, components, services (ID generator, Storage)

PDF generator component: 
Contains PDF viewer and PDF generation history.

Due to lake of time PDF history should be separated to the external component,
to follow Single Responsibility Principle



### Tests coverage:
PDF component:
- Check that by generate button click downloadFile was called
- Check after successful API request, pdf was rendered

PDF History service:
- Generating History entity
- Get all history

Storage service:
- Get item from storage
- Set item to the storage
- Removing item from the storage
- Clear all items from the storage
