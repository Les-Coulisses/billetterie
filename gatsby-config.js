const API_URL = 'api-url';
module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        precision: 8
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Potimarrants',
        short_name: 'Poti',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: `${__dirname}/src/images/favicon.png`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images/`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: `${API_URL}/gatsby`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        typePrefix: 'internal__',
        name: 'accounts',
        verboseOutput: true
      }
    }
  ]
};
