const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3009/', // Important for Module Federation
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sharedApp',
      filename: 'remoteEntryShared.js',
      exposes: {
        './sharedApp': './src/App', // Expose the App component
        './Cart': './src/components/cart/cart.jsx',  // Exposing the Header component
        './Header': './src/components/header/header.jsx',  // Exposing the Header component
        './Footer': './src/components/footer/footer.jsx',  // Exposing the Footer component
        './CopyRight': './src/components/footer/copyright.jsx',  // Exposing the Footer component
        './Loading': './src/components/loading/loading.jsx',  // Exposing the Loading component
        './Info': './src/components/info/info.jsx',  // Exposing the Info component
        './Logo': './src/components/logo/logo.jsx',  // Exposing the Info component
        './ProductModal': './src/components/product-modal/ProductModal.jsx',  // Exposing the Info component
        './CartContext': './src/context/cart.contect.jsx',
        './CartService': './src/api-service/cart.service.jsx',
        './AuthService': './src/api-service/auth.service.jsx',
        './ProductService': './src/api-service/product.service.jsx',
        './OrderService': './src/api-service/order.service.jsx',
        './PaymentService': './src/api-service/payment.service.jsx',
      },
      remotes: {
        containerApp: 'containerApp@http://localhost:3000/remoteEntryContainer.js', // Reference to the host app's remote entry
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.1.0' }, // Match container's React version
        'react-dom': { singleton: true, requiredVersion: '^19.1.0' }, // Match container's React version
        'react-router-dom': { singleton: true, requiredVersion: '^7.4.1' }, // Match container's React version or remove if not used.
        axios: { singleton: true, requiredVersion: '^1.8.4'}, // Adjust version as needed
        'react-hook-form': { singleton: true, requiredVersion: '^7.55.0'}, // Adjust version as needed
        'react-icons': { singleton: true, requiredVersion: '^5.5.0'}, // Adjust version as needed
        'react-spinners': { singleton: true, requiredVersion: '^0.15.0'} //adjust version as needed
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3009,
    historyApiFallback: true,
    hot: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow CORS
    },
  },
};