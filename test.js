const { nameByBarcode } = require('./db/nameByBarcode')
barcode = 1234
// nameByBarcode(barcode).then(name => console.log(name));
console.log(nameByBarcode(barcode))