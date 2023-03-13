function fetchCustomerData() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Customers",
      criteria: "(Customer_Name != \"\")",
      pageSize: 200
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      console.log("resp Length" + JSON.stringify(response.data.length));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          //var customerName = (dataList.Customer_Name == "") ? dataList.Contact_Name : dataList.Customer_Name;
          $('#CustomerNameField').append('<option value="' + dataList.ID + '">' + dataList.Customer_Name + '</option>');
        });
        fetchWareHouse();
        fetchPaymentTerms();
        fetchDeliveryMethod();
        fetchSalesPerson();
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function fetchTaxRates() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Taxes"
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //console.log("resp" + JSON.stringify(response));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          $('#paymentTerms').append('<option value="' + dataList.ID + '">' + dataList.Tax_Name + '</option>');
        });
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function fetchWareHouse() {
  wareHouseName = "Latin Core Inc";
  $("#wareHouseName").append('<option value="' + wareHouseName + '">' + wareHouseName + '</option>')

}
function fetchPaymentTerms() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "Payments_Terms_Report"
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //console.log("resp" + JSON.stringify(response));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          $('#paymentTerms').append('<option value="' + dataList.ID + '">' + dataList.Term_Name + '</option>');
        });
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function fetchDeliveryMethod() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Delivery_Methods"
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //   console.log("resp" + JSON.stringify(response));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          $('#deliveryMethod').append('<option value="' + dataList.ID + '">' + dataList.Delivery_Method + '</option>');
        });
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function fetchSalesPerson() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "Sales_Persons_Report"
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //   console.log("resp" + JSON.stringify(response));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          $('#salesPerson').append('<option value="' + dataList.ID + '">' + dataList.Sales_Person + '</option>');
        });
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function getItemListForTable() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Items"
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //console.log("item resp" + JSON.stringify(response));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          //var optionValue = value.Selling_Price + "," + value.SKU + "," + value.StockInHand;
          var optionValue = dataList.ID + "," + dataList.Selling_Price + "," + dataList.SKU + "," + dataList.Tax_Preference + "," + dataList.Exemption_Reason;
          //console.log("itemId::"+dataList.ID);
          //var optionValue = dataList.ID + "," + dataList.Selling_Price + "," + dataList.SKU ;
          // selectValue = '<option value="'+ optionValue + '">' + dataList.Name + "\n  Rate: " + dataList.Selling_Price +" SKU : " + dataList.SKU + '</option>';
          selectValue = '<option value="' + optionValue + '">' + dataList.Name + '</option>';
          $('#selectItem').append(selectValue);
          //});
        });
      } else {
        //alert Error Message
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function fetchTaxRates() {
  selectedCustomer = $("#CustomerNameField").val();
  //console.log(selectedCustomer);
  taxDetailsArray = [];
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Customers",
      id: selectedCustomer
    };
    ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
      //console.log("resp" + JSON.stringify(response.data));
      if (response.code == 3000) {
        //console.log(response.data.Tax_Rates);
        taxDetails = response.data.Tax_Rates;
        if (taxDetails != "") {
          taxId = response.data.Tax_Rates.ID;
          taxName = response.data.Tax_Rates.display_value;
          //console.log(taxId+""+ taxName);

          if ($(".taxDetailsDropdown option[value='" + taxId + "']").length > 0) {
            $(".taxDetailsDropdown option[value='" + taxId + "']").prop('selected', true);
          } else {
            $(".taxDetailsDropdown").append('<option value="' + taxId + '">' + taxName + '</option>');
            $(".taxDetailsDropdown option").prop('selected', true);
            $("#taxName").text(taxName);
          }
          $("#customerTaxRate").val($(".taxDetailsDropdown option:selected").val());
        }
        else {
          console.log("Inside else");
        }
        //});

      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
function getStockDetailsForItem(seletectedItemId, stockId, actualStockID) {

  //console.log(seletectedItemId);

  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "Item_Stock_subform_Report",
      criteria: "(Items == " + seletectedItemId + ")"
    };
    //console.log(config);
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //console.log("resp" + JSON.stringify(response.data));
      if (response.code == 3000) {

        var actualStockOnHand = response.data[0].Actual_Stock_on_Hand;
        var stockOnHand = response.data[0].Stock_on_Hand;

        // console.log(stockOnHand);
        // console.log(actualStockOnHand);
        $(stockId).val(stockOnHand);
        $(actualStockID).val(actualStockOnHand);
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}

function salesOrderAdd() {

  ZOHO.CREATOR.init().then(function (data) {

    formData = {};
    formData['Customer_Name'] = $('#CustomerNameField').val();
    formData['Sales_Order'] = $('#saleord').val();
    formData['Reference'] = $('#ref').val();
  
    var salesOrderDate = new Date($('#salesOrderDatepicker').val());
    console.log(salesOrderDate.toLocaleDateString());
    var expDate = $("#datepicker2").val();
    var expDate_match = /(\d+)\/(\d+)\/(\d+)/.exec(expDate);
    var expectedShipmentDate = new Date(expDate_match[3], expDate_match[2], expDate_match[1]);
    console.log(expectedShipmentDate);
    console.log("variable type2:"+ $.type(expectedShipmentDate));
    console.log(expectedShipmentDate.toLocaleDateString());

    //formData['Sales_Order_Date'] = $('#datepicker').val();
    //formData['Expected_Shipment_Date'] = $('#fecha1').val();
    console.log($('#paymentTerms option:selected').val());
    console.log($('#deliveryMethod option:selected').val());
    console.log($('#salesPerson option:selected').val());
    formData['Sales_Order_Date'] = salesOrderDate.toLocaleDateString();
    formData['Expected_Shipment_Date'] = expectedShipmentDate.toLocaleDateString();
    formData['Payment_Terms'] = $('#paymentTerms option:selected').val();
    formData['Delivery_Method'] = $('#deliveryMethod option:selected').val();
    //formData['Warehouse_Name'] = $('#wareHouseName').val();
    formData['Sales_Persons'] = $('#salesPerson option:selected').val()

    formData['Sub_Total'] = parseFloat($("#subTotal").text());
    formData['Discount'] = parseFloat($("#discountForCalculation").text());
    formData['Shipping_Charges'] = parseFloat($("#shippingChargesValue").text());
    formData['Adjustment'] = parseFloat($("#adjustmentValue").text());
    if (parseFloat($("#totalValueCalculated").text()) != null) {
      formData['Total'] = parseFloat($("#totalValueCalculated").text());
    }
    formData['Customer_Notes'] = $('#exampleFormControlTextarea1').val();
    formData['Terms_Conditions'] = $('#exampleFormControlTextarea2').val();

    //insert formData - get salesorder iD - insert subItemData with salesorderID

    // var arrData=[];
    var subFormItemData = [];

    $("#tblData tr").each(function (index, element) {

      if (index != 0) {
        var currentRow = $(this);
        var itemDescription = currentRow.find("td:eq(0) .itemDescription").val();
        // console.log(itemDescription);
        var selectedItemID = currentRow.find("td:eq(0) .selectedItemID").val();
        // console.log(selectedItemID);
        var skuValue = currentRow.find("td:eq(2) .skuValueColumn").val();
        // console.log(skuValue);
        var quantity = currentRow.find("td:eq(3) .Quantity").val();
        // console.log(quantity);
        var stockOnHand = currentRow.find("td:eq(3) .stockinHandValue").val();
        // console.log(stockOnHand);
        var actualStock = currentRow.find("td:eq(3) .actualStockinHandValue").val();
        // console.log(actualStock);
        var rateValue = currentRow.find("td:eq(4) .rateValueColumn").val();
        // console.log(rateValue);
        var taxDetails = currentRow.find("td:eq(5) .taxDetailsDropdown").val();
        // console.log(taxDetails);
        var totalAmount = currentRow.find("td:eq(6) .totalAmount").val();
        // console.log(totalAmount);

        tableRowsObject = {};
        tableRowsObject.Item_Name = selectedItemID;
        tableRowsObject.Item_Description = itemDescription;
        tableRowsObject.SKU = (skuValue);
        tableRowsObject.Quantity = quantity;
        tableRowsObject.Stock_on_Hand = (stockOnHand);
        tableRowsObject.Actual_Stock_on_Hand = (actualStock);
        tableRowsObject.rate = (rateValue);
        tableRowsObject.Tax1 = taxDetails;
        tableRowsObject.Amount = (totalAmount);

        subFormItemData.push(tableRowsObject);

      }
    });

    // console.log(subFormItemData);
    formData['Items'] = subFormItemData;

    salesOrderData = {
      "data": formData
    }
    console.log(JSON.stringify(salesOrderData));

    var config = {
      appName: "latin-core-order-management",
      formName: "Sale_Order",
      data: salesOrderData
    }
    console.log(config);

    ZOHO.CREATOR.API.addRecord(config).then(function (response) {
      if (response.code == 3000) {
        alert("Data Added Successfully");
        console.log("Record added successfully");
      } else {
        console.log("Error Calling Creator API- Add Record - On Form Submit from Widgets:" + response.code);
      }
      console.log(JSON.stringify(response));
      console.log(JSON.stringify(response.code));
      console.log(JSON.stringify(response.message));
    });
    console.log("hiii");
  });
}

function generateSalesOrderNumber(){
  ZOHO.CREATOR.init().then(function(data) {
          config = {
          appName : "latin-core-order-management",
	        reportName : "All_Sale_Orders",
          criteria :  "Sales_Order != null sort by ID desc"
         }
         console.log(config);
          ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
             console.log(response.data);
             var salesOrderNumber = response.data[0].Sales_Order;
             var salesOrderID = salesOrderNumber.split("-");
             var salesOrderUniqueID = "SO-" + (parseInt(salesOrderID[1]) +1);
             console.log(salesOrderUniqueID);
             
              $("#saleord").val(salesOrderUniqueID);
              $("#saleord").prop("disabled","true");
           });
});
}
// function getSalesOrderData() {
//   ZOHO.CREATOR.init().then(function (data) {
//     config = {
//       appName: "latin-core-order-management",
//       reportName: "All_Sale_Orders",
//       id : "4008259000000202031"
//     };
//     ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
//       console.log("resp" + JSON.stringify(response));
//       // if (response.code == 3000) {
//       //   $.each(response.data, function (index, dataList) {
//       //     $('#paymentTerms').append('<option value="' + dataList.ID + '">' + dataList.Tax_Name + '</option>');
//       //   });
//       // } else {
//       //   console.log("Error Calling Creator API:" + response.code);
//       // }
//     });
//   });
// }