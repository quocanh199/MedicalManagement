const isHex = (input) => {
  const regex = /[0-9A-Fa-f]{6}/g;
  return regex.test(input);
};

const parser = (web3, input) => {
  return isHex(input) ? web3.utils.hexToNumberString(input) : input;
};

const signTransaction = async (web3, data, to, privateKey) => {
  // const web3 = connection.web3;
  const address = web3.eth.accounts.privateKeyToAccount(privateKey);
  const txObj = {
    gas: web3.utils.toHex(2000000),
    to,
    value: "0x00",
    data: data,
    from: address.address,
  };

  return new Promise((resolve, reject) => {
    web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        if (signedTx.rawTransaction)
          web3.eth
            .sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
              if (err) {
                return reject(err);
              } else {
              }
            })
            .on("receipt", (res) => {
              let nftId;
              try {
                nftId = parser(web3, res.logs[0].topics[3]);
              } catch (error) {
                nftId = 0;
              }
              return resolve(nftId);
            });
      }
    });
  });
};

const hashFuntion = (connection, data) =>
  connection.web3.utils.soliditySha3(data) || "";
module.exports = { signTransaction, hashFuntion };
