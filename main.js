const productDatabase = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

let errorMessage;

function mainApp(barcodeList){
    let receiptList = [];
    errorMessage = "";
    barcodeList.sort((a, b) => (a > b) ? 1 : -1);

    
    hasErrors(barcodeList);
    barcodeList.forEach(function(barcode){
        if(productDatabase.find(product => product.id == barcode)){
            if(receiptList.find(receiptItem => receiptItem.id == barcode)){
                increaseCurrentTotalOfProduct(barcode, receiptList);
            }else{
                receiptList = addProductToReceiptList(barcode,receiptList);
            }
        }
    });

    return printFinalReceipt(receiptList);
}


function hasErrors(barcodeList){
    
    barcodeList.forEach(function(barcode){
        if(!productDatabase.find(product => product.id == barcode)){
            errorMessage = "ERROR MESSAGE 1";
        }
    });
    if(barcodeList.length === 0){
        errorMessage = "ERROR MESSAGE 2";
    }
}
function increaseCurrentTotalOfProduct(barcode, receiptList) {
    receiptList[receiptList.findIndex(receiptItem => receiptItem.id == barcode)].total += 1;
}

function addProductToReceiptList(barcode, receiptList) {
    
    let product = productDatabase.find(product => product.id == barcode);
    receiptList.push({
        id: product.id,
        name: product.name,
        price: product.price,
        total: 1
    });
    
    return receiptList;
}

function printFinalReceipt(receiptList){
    if(!errorMessage.length){
        let header = "Receipts\n";
        let seperator = "------------------------------------------------------------\n"; 
        let bodyReceipt = "";
        let total = "Price: " + calculateTotal(receiptList);
        receiptList.forEach(function(receiptItem){
            bodyReceipt += receiptItem.name + spaceCreator(receiptItem.name.length, 31) + receiptItem.price + spaceCreator(receiptItem.price.toString().length, 10) + receiptItem.total + "\n";
        });
    
        return finalString = header + seperator + bodyReceipt + seperator + total;
    }
    return errorMessage;
}

function spaceCreator(stringLength, totalSpace){
    let initialSpace = "";
    for(stringLength; stringLength <= totalSpace; stringLength++){
        initialSpace += " ";
    }
    return initialSpace;
}

function calculateTotal(receiptList){
    let total = 0;

    receiptList.forEach(function(receiptItem){
        total += receiptItem.price * receiptItem.total;
    });

    return total;
}

module.exports = {
    mainApp : mainApp,
    addProduct : addProductToReceiptList,
    calculateTotal : calculateTotal
}


