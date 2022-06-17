const { lockData, getMedicineHistory } = require("./controller/medicine");

const privateKey =
  "aa8b63ae8addb0d467233cf6353bde8a2b0bd279bab2854f7bc5dfe33cecad66";

// lockData(privateKey, "berberin", 3).then(console.log);

getMedicineHistory(2).then(console.log);
