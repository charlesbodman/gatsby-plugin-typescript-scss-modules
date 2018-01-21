# Gatsby Plugin Typescript SCSS Modules
This [GatsbyJS](gatsbyjs.org) plugin facilitates the use of SCSS imports with TypeScript. Using this plugin, you can import an *.scss file and webpack will automatically generate typings.

The code is a hybrid of [gatsby-plugin-typescript-css-modules
](https://github.com/jcreamer898/gatsby-plugin-typescript-css-modules) and Gatsbys [official SCSS plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-postcss-sass).

Ultimately, this is an extension of [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader).

### Use

In my experience, this module requires node-sass and sass-loader to be dependencies of the gatsby project.

```bash
npm i gatsby-plugin-typescript-scss-modules
```

Then, add the plugin to your `gatsby-config.js`...

```js
  "gatsby-plugin-typescript-scss-modules"
]
```
