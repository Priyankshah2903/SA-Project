//webpack.confid.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3000/'
    // publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'containerApp',
      // library: { type: "var", name: "containerApp" },
      filename: "remoteEntryContainer.js",  // The entry file that will be loaded by the remote app
      remotes: {
        // 'auth_app': 'auth_app@http://localhost:3001/remoteEntry.js',
        home_app: 'home_app@http://localhost:3001/remoteEntryHome.js',
        // 'account_app': 'account_app@http://localhost:3003/remoteEntry.js'
        products_app: 'products_app@http://localhost:3002/remoteEntryProducts.js',
        auth_app: 'auth_app@http://localhost:3003/remoteEntryAuth.js',
        search_app: 'search_app@http://localhost:3004/remoteEntrySearch.js',
        myaccount_app: 'myaccount_app@http://localhost:3006/remoteEntryMyaccount.js',
        checkout_app: 'checkout_app@http://localhost:3005/remoteEntryCheckout.js',
        sharedApp: 'sharedApp@http://localhost:3009/remoteEntryShared.js', // Reference to the shared app's remote entry
      },
      exposes: {
      //   './Header': './src/components/header/header.jsx',  // Exposing the Header component
      //   './Footer': './src/components/footer/footer.jsx',  // Exposing the Footer component
      //   './CopyRight': './src/components/footer/copyright.jsx',  // Exposing the Footer component
      //   './Loading': './src/components/loading/loading.jsx',  // Exposing the Loading component
      //   './Info': './src/components/info/info.jsx',  // Exposing the Info component
      //   './Logo': './src/components/logo/logo.jsx',  // Exposing the Info component
      //   './ProductModal': './src/components/product-modal/ProductModal.jsx',  // Exposing the Info component
        './AuthContext': './src/context/auth.context.jsx',
        './CartContext': './src/context/cart.contect.jsx',
        // './RouterContext': './src/context/routes.context.jsx',
        // './CartService': './src/api-service/cart.service.jsx',
        // './AuthService': './src/api-service/auth.service.jsx',
        // './ProductService': './src/api-service/product.service.jsx',
        // './OrderService': './src/api-service/order.service.jsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.1.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.1.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^7.4.1' },
        axios: { singleton: true, requiredVersion: '^1.8.4'}, // Adjust version as needed
        'react-hook-form': { singleton: true, requiredVersion: '^7.55.0'}, // Adjust version as needed
        'react-icons': { singleton: true, requiredVersion: '^5.5.0'}, // Adjust version as needed
        'react-spinners': { singleton: true, requiredVersion: '^0.15.0'}, //adjust version as needed
        './src/context/auth.context': { singleton: true, },// Share your auth context
        './src/context/cart.contect': { singleton: true, },// Share your cart context
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow CORS
    },
    
  }
};