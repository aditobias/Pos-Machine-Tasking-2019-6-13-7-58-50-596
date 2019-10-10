const functionMap = require('../main');

describe('testing with errors', () => {

    it ('should handle when barcode is invalid', () => {
        let barcodeList = ['0A11', '0003', '0005', '0103'];

        expect(functionMap.mainApp(barcodeList)).toBe("ERROR MESSAGE 1");
    }); 

    it ('should handle when barcodeList is empty', () => {
        let barcodeList = [];

        expect(functionMap.mainApp(barcodeList)).toBe("ERROR MESSAGE 2");
    }); 
});

describe('testing without any errors', () => {

    it ('should generate receipt normally', () => {
        barcodeList = ['0001', '0003', '0005', '0003'];
        let receiptList = "Receipts\n------------------------------------------------------------\n" +
        "Coca Cola                       3          1\n" +
        "Pepsi-Cola                      5          2\n" +
        "Dr Pepper                       7          1\n" +
        "------------------------------------------------------------\n" +
        "Price: 20";
    
        expect(functionMap.mainApp(barcodeList)).toBe(receiptList);
    });

    it ('should generate receipt even barcodeList is not in order', () => {
        barcodeList = ['0005', '0003', '0005', '0003'];
        let receiptList = "Receipts\n------------------------------------------------------------\n" +
        "Pepsi-Cola                      5          2\n" +
        "Dr Pepper                       7          2\n" +
        "------------------------------------------------------------\n" +
        "Price: 24";
    
        expect(functionMap.mainApp(barcodeList)).toBe(receiptList);
    });

    it('should add to product list if product is not yet in product list', () => {
        let barcode = '0001';
        let receiptList = [];

        let receiptProduct = {
            id : '0001',
            name : 'Coca Cola',
            price : 3,
            total : 1
        };

        receiptList =  functionMap.addProduct(barcode, receiptList);
        returnReceiptProduct = receiptList.find(receiptItem => receiptItem.id == barcode);

        expect(returnReceiptProduct).toStrictEqual(receiptProduct);
    });

    it('should return the total of a given receipt list', () => {
        receiptList = [{id : '0001', name : 'Coca Cola', price : 3, total : 1}, {id : '0003', name : 'Pepsi-Cola', price : 5, total : 1}];

        total = functionMap.calculateTotal(receiptList);

        expect(total).toBe(8);
    });
});




