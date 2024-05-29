# Required Tools

In order to run this project you first have to install the following things:

- NodeJS: https://nodejs.org/en/ (^14.18.0)
- NPM. It should have come bundled together with NodeJS (^6.14.15)

# Install Dependencies

The project requires a series of dependencies (ie. React) in order to run. These dependencies are all included in the _package.json_ file. To install the dependencies, simply run `npm install` in the project root folder

# Environment Variables

The app reads some data from the environment of the application. The React Scripts used to run the app and the webpack they configure should automatically include all the variables present in the `.env` file in the project root. You can find an example of the required variables in the `.env.template` included in the repository.

**Keep in mind that variables are required to be prefixed by REACT_APP for them to actually reach the process running the react app**

# Run the app

After having configured everything previously explained, simply run `npm run start` in the project root. The React Scripts will handle setting the development server up. Once they're done, the app should be accessible with your browser at [localhost:3000](http://localhost:3000)

> Written with [StackEdit](https://stackedit.io/).
