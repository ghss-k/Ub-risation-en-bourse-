
const path = require("path");
module.exports = {
  contracts_build_directory: path.join(__dirname, "./frontend/src/abi"),


  networks: {
    
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
    
  },

  
  mocha: {
    
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
      
    }
  },

 

  db: {
    enabled: false
  }
};
