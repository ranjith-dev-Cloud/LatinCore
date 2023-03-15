/******************************
 * Creator - JS APi Calls Starts Here
 ******************************/

/**
 * This fucntion is fetch all customer data based on pagenum
 */
function fetchCustomerData() {
  var creatorSdk = ZOHO.CREATOR.init();

  creatorSdk.then(function (data) {
    getCustomerData("1");
  });
  async function getCustomerData(pageNum) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Customers",
      criteria: "(Customer_Name != \"\") sort by ID desc",
      page: pageNum,
      pageSize: 200
    }
    var getRecords = ZOHO.CREATOR.API.getAllRecords(config);
    getRecords.then(function (response) {
      $.each(response.data, function (idx, dataList) {
        $('#CustomerNameField').append('<option value="' + dataList.ID + '">' + dataList.Customer_Name + '</option>');
      });
      var recordsLength = Object.keys(response.data).length;
      // if (recordsLength == 200) {

      //   getCustomerData(parseInt(pageNum) + 1);
      // }
      // else {
      //   console.log("Less than 200");
      // }
    }).catch(err => console.log("No matching records"));
  }
  fetchWareHouse();
  fetchPaymentTerms();
  fetchDeliveryMethod();
  fetchSalesPerson();
}

/**
 * This function is to get the warehouse details from creator
 * 
 */
function fetchWareHouse() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Warehouses"
    };
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //console.log("resp" + JSON.stringify(response));
      if (response.code == 3000) {
        $.each(response.data, function (index, dataList) {
          $('#wareHouseName').append('<option value="' + dataList.ID + '">' + dataList.Warehouse_Name + '</option>');
        });
      } else {
        console.log("Error Calling Creator API:" + response.code);
      }
    });
  });
}
/**
 * This function is to get the payment terms data from creator
 * 
 */

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
/**
 * This function is to get the delivery method list from creator
 * 
 */
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
/**
 * This function is to get the sales person list from creator
 * 
 */
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
/**
 * This function is to get the item Details for salesorder
 * Fetched data will be populated in Item Details table
 * invoked on change of Customer 
 */
function getItemListForTable() {
  var creatorSdk = ZOHO.CREATOR.init();
  creatorSdk.then(function (data) {
    getItemDetailsData("1");
  });
  async function getItemDetailsData(pageNum) {
    itemDetailsConfig = {
      appName: "latin-core-order-management",
      reportName: "All_Items",
      page: pageNum,
      pageSize: 200
    };
    var getRecords = ZOHO.CREATOR.API.getAllRecords(itemDetailsConfig);
    getRecords.then(function (response) {
      //console.log("item Details:"+JSON.stringify(response.data));
      $.each(response.data, function (index, dataList) {
        var optionValue = dataList.ID + "," + dataList.Selling_Price + "," + dataList.SKU + "," + dataList.Tax_Preference + "," + dataList.Exemption_Reason;
        selectValue = '<option value="' + optionValue + '">' + dataList.Name + '</option>';
        $('#selectItem').append(selectValue);
      });
      // var recordsLength = Object.keys(response.data).length;
      // if (recordsLength == 200) {

      //   getItemDetailsData(parseInt(pageNum) + 1);
      // }
      // else {
      //   console.log("No more Items to Fetch");
      // }
    }).catch(err => console.log("No matching records"));
  }

}

/** This function is to get the Acutal Stock and Stock on Hand details from Item Stock Subform */
function getStockDetailsForItem(seletectedItemId, stockId, actualStockID) {
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
        $(stockId).val(0.00);
        $(actualStockID).val(0.00);
      }
    });
  });
}
/** This function is to construct JSON Object for main form along with Item Details SubForm
 * Get all the values for main form
 * Iterate through each row in Item Details Table and construct subform JSON Object
 * Call addRecord API to submit the Sales Order Form in Creator
 * Format SalesOrder Date and Expected Shipment date from String to Date
 */
function salesOrderAdd() {

  ZOHO.CREATOR.init().then(function (data) {

    formData = {};
    formData['Customer_Name'] = $('#CustomerNameField').val();
    formData['Sales_Order'] = $('#saleord').val();
    formData['Reference'] = $('#ref').val();

    var salesOrderDate = new Date($('#salesOrderDatepicker').val());
    var expDate = new Date($("#datepicker2").val());
    // var expDate_match = /(\d+)\/(\d+)\/(\d+)/.exec(expDate);
    // var expectedShipmentDate = new Date(expDate_match[3], expDate_match[2], expDate_match[1]);

    formData['Sales_Order_Date'] = salesOrderDate.toLocaleDateString();
    formData['Expected_Shipment_Date'] = expDate.toLocaleDateString();
    formData['Payment_Terms'] = $('#paymentTerms option:selected').val();
    formData['Delivery_Method'] = $('#deliveryMethod option:selected').val();
    formData['Warehouse_Name'] = $('#wareHouseName option:selected').val();
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
        var selectedItemID = currentRow.find("td:eq(0) .selectedItemID").val();
        var skuValue = currentRow.find("td:eq(2) .skuValueColumn").val();
        var quantity = currentRow.find("td:eq(3) .Quantity").val();
        var stockOnHand = currentRow.find("td:eq(3) .stockinHandValue").val();
        var actualStock = currentRow.find("td:eq(3) .actualStockinHandValue").val();
        var rateValue = currentRow.find("td:eq(4) .rateValueColumn").val();
        var taxDetails = currentRow.find("td:eq(5) .taxDetailsDropdown").val();
        var totalAmount = currentRow.find("td:eq(6) .totalAmount").val();

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
    });
  });
}

/** This function is to generate Salers Order number and disable the sales order number field */
function generateSalesOrderNumber() {
  ZOHO.CREATOR.init().then(function (data) {
    config = {
      appName: "latin-core-order-management",
      reportName: "All_Sale_Orders",
      criteria: "Sales_Order != null sort by ID desc"
    }
    console.log(config);
    ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      console.log(response.data);
      if (response.code == 3000) {
        var salesOrderNumber = response.data[0].Sales_Order;
        console.log("salesOrdernumber:"+salesOrderNumber);
        var salesOrderID = salesOrderNumber.split("-");
        var salesOrderUniqueID = "SO-" + (parseInt(salesOrderID[1]) + 1);
        console.log(salesOrderUniqueID);

        $("#saleord").val(salesOrderUniqueID);
        $("#saleord").prop("disabled", "true");
      } else {
        console.log(response.err);
      }

    });
  });
}
/**
 *  This function is to show the address and tax details of the selected customer
 */
function showAddressDetails() {
  var selectedCustomerID = $("#CustomerNameField option:selected").val();
  ZOHO.CREATOR.init().then(function (data) {
    addressDetailsConfig = {
      appName: "latin-core-order-management",
      reportName: "All_Customers",
      id: selectedCustomerID
    }
    console.log(addressDetailsConfig);
    ZOHO.CREATOR.API.getRecordById(addressDetailsConfig).then(function (response) {
      //console.log(JSON.stringify(response.data));
      if (response.code == 3000) {
        customerDetails = response.data;
        billingAddressDetails = customerDetails.Address_Street_1 + " " + customerDetails.Address_Street_2 + "\n" + customerDetails.City
          + "\n" + customerDetails.State.display_value + " " + customerDetails.Z + "\n" + customerDetails.Country;
        shippingAddressDetails = customerDetails.Address_Street_11 + " " + customerDetails.Address_Street_21 + "\n" + customerDetails.City1
          + "\n" + customerDetails.Shipping_State + " " + customerDetails.Zip_Code + "\n" + customerDetails.Shipping_Country;
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
          $("#tax").val(taxName);
          $("#customerTaxRate").val($(".taxDetailsDropdown option:selected").val());
        }
        else {
          console.log("Inside else");
        }
        $("#billingAddr").append(billingAddressDetails);
        $("#shippingAddr").append(shippingAddressDetails);

        $("#addressTaxDiv").attr("style", "display:block");
        autoResize();
      } else {
        console.log(response.code);
        console.log(response.err);
      }

    });
  });
}

/**
 * 
 * @returns 
 */
function populateTransactionsModal(selectorID) {
  var itemID = $(selectorID).closest('tr').find('.selectedItemID').val();
  //.attr('class');
  console.log(itemID);
  ZOHO.CREATOR.init().then(function (data) {
    itemDetailsConfig = {
      appName: "latin-core-order-management",
      reportName: "All_Items",
      id: itemID
    }
    console.log(itemDetailsConfig);
    ZOHO.CREATOR.API.getRecordById(itemDetailsConfig).then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.code == 3000) {
        var itemDetailsData = response.data;
        $(".modal-body #itemName").text(itemDetailsData.Name);
        $(".modal-body #skuDetails").text(itemDetailsData.SKU);
        $(".modal-body #unitValue").text(itemDetailsData.Unit);
        $(".modal-body #categoryValue").text(itemDetailsData.Category);
        $(".modal-body #salesPrice").text(itemDetailsData.Selling_Price);
        $(".modal-body #salesAccount").text(itemDetailsData.Account);
        $(".modal-body #purchasePrice").text(itemDetailsData.Cost_Price);
        $(".modal-body #purchaseAccount").text(itemDetailsData.Account1);
      } else {
      }
    });
  });
  populateStockLocationDetails(selectorID);
}

/**
 * 
 */
function populateStockLocationDetails(selectorID) {
  var itemID = $(selectorID).closest('tr').find('.selectedItemID').val();
  console.log(itemID);
  ZOHO.CREATOR.init().then(function (data) {
    stockDetailsConfig = {
      appName: "latin-core-order-management",
      reportName: "Item_Stock_subform_Report",
      criteria: "(Items == " + itemID + ")"
    }
    console.log(stockDetailsConfig);
    ZOHO.CREATOR.API.getAllRecords(stockDetailsConfig).then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.code == 3000) {
        stockDetails = response.data;
        $("#stockOnHand").text(stockDetails[0].Stock_on_Hand);
        $("#committedStock").text(stockDetails[0].Committed_Stock);
        $("#availableForSale").text(stockDetails[0].Available_for_Sale);
        $("#physicalStockOnHand").text(stockDetails[0].Actual_Stock_on_Hand);
        $("#physicalCommittedStock").text(stockDetails[0].Actual_Committed_Stock);
        $("#physicalAvailableForSale").text(stockDetails[0].Actual_Available_for_Sale);

        var warehouseName = stockDetails[0].WAREHOUSE_NAME;
        var stockOnHandValue = stockDetails[0].Stock_on_Hand;
        //Set values for Stock Location Tab
        $('#stockLocations').on('change', function () {
          var selectedStock = $(this).val();
          if (selectedStock === "Physical") {
            var stockTableData = "<tr><td class='text-left'>" + warehouseName + "</td><td class='text-right'>" + stockDetails[0].Stock_on_Hand
              + "</td><td class='text-right'>" + stockDetails[0].Committed_Stock + "</td><td class='text-right'>" + stockDetails[0].Available_for_Sale + "</td></tr>";
          }
          else if (selectedStock === "Accounting") {
            var stockTableData = "<tr><td class='text-left'>" + warehouseName + "</td><td class='text-right'>" + stockDetails[0].Actual_Stock_on_Hand
              + "</td><td class='text-right'>" + stockDetails[0].Actual_Committed_Stock + "</td><td class='text-right'>" + stockDetails[0].Actual_Available_for_Sale + "</td></tr>";
          }
          console.log(stockTableData);
          removeRowStock();
          $("#stockTable tbody").append(stockTableData);

        });
      }
      showRecentTransactionModal();
    });
  });
  populateTransactionsDetails(selectorID);
}
/**
 * 
 */
function populateTransactionsDetails(selectorID){
  var itemID = $(selectorID).closest('tr').find('.selectedItemID').val();
   //console.log(itemID);
  ZOHO.CREATOR.init().then(function (data) {
    itemDetailsConfig = {
      appName: "latin-core-order-management",
      reportName: "Items_Widget_Subform_Report",
      Item_Name: itemID
    }
    //console.log(itemDetailsConfig);
    ZOHO.CREATOR.API.getAllRecords(itemDetailsConfig).then(function (response) {
      //console.log("subform details");
      //console.log(JSON.stringify(response.data));
      if (response.code == 3000) {
        $.each(response.data, function (idx, dataList) {
          associatedSalesOrderID = dataList.Sale_Order_ID.ID;
          console.log(associatedSalesOrderID);
          var quantity = dataList.Quantity;
          var itemPrice = dataList.rate;
           getSalesOrderDetails(associatedSalesOrderID,quantity,itemPrice);
       });
      }
    });
  });
showRecentTransactionModal();
}
/**
 * 
 */
function getSalesOrderDetails(salesOrderID,quantityValue,itemPriceValue){
        ZOHO.CREATOR.init().then(function (data) {
          salesOrderDetailsConfig = {
            appName: "latin-core-order-management",
            reportName: "All_Sale_Orders",
            //ID: salesOrderID
            criteria: "(ID == " + salesOrderID + ")"
          }
          console.log(salesOrderDetailsConfig);
          ZOHO.CREATOR.API.getAllRecords(salesOrderDetailsConfig).then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.code == 3000) {
              var dataList = response.data[0];
                var transactionstabledata = "<tr><td class='text-left'><p>"+ dataList.Customer_Name.display_value +"</p><p>"+ dataList.Sales_Order +" | " 
                + dataList.Sales_Order_Date + "</p><p></p></td><td class='text-right'><p>Item Price :<span>" 
                + itemPriceValue + "</span></p><p>Quantity Sold :<span>" + quantityValue + "</span></p></td></tr>";
                // console.log(transactionstabledata);
                $("#transactionTable tbody").append(transactionstabledata);
            }
          });
        });
}
/*********************
 * JS API Calls Ends Here!!!!!!!
 **********************/