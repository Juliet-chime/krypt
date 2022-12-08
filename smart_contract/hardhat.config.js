//https://eth-goerli.g.alchemy.com/v2/_2L0NO4I8iGY8_CrmN6YCasqZpXNEtJy


require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
    url:'https://eth-goerli.g.alchemy.com/v2/_2L0NO4I8iGY8_CrmN6YCasqZpXNEtJy',
    accounts:['4e86b8a8333b58fab5f144d054e72805a00b1f26e185db406a217a8ea0e2b5e2']
    }
  }
}





// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };
