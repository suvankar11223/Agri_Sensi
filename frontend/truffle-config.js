module.exports = {
    networks: {
      development: {
        host: process.env.REACT_APP_WEB3_PROVIDER_HOST || "127.0.0.1",
        port: process.env.REACT_APP_WEB3_PROVIDER_PORT || 7545,
        network_id: process.env.REACT_APP_WEB3_NETWORK_ID || "5777",
      }
    },
    compilers: {
      solc: {
        version: "0.8.19"
      }
    }
  };
  