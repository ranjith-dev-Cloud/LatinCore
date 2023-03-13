$(document).ready(function () {
  //generateSalesOrderNumber();
  fetchCustomerData();
  $("#quantity").focusout(function () {
    calculateTotalAmount(this, 0);
  });

  //Item Details Table Drag and Drop
  $("#tblData").find("tr:even").addClass("even");
  $("#tblData").find("tr:odd").addClass("odd");
  $("#tblData").tableDnD({
    onDragClass: "myDragClass",
    onDrop: function (table, row) {
      $("#tblData").find("tr").removeClass("even odd");
      $("#tblData").find("tr:even").addClass("even");
      $("#tblData").find("tr:odd").addClass("odd");
    }
  });
  //Function datepicker - sales order date and expected date
  $(function () {
    $('#salesOrderDatepicker').datepicker({
      language: "es",
      autoclose: true,
      format: "yyyy-mm-dd"
    });
  });
  $(function () {
    $('#datepicker2').datepicker({
      language: "es",
      autoclose: true,
      format: "yyyy-mm-dd"
    });
  });
  //autoResize();
});
//calculate Total Amount totalAmount = quantity*rateValueColumn
function calculateTotalAmount(quantityID, rowId) {
  // console.log(quantityID.id);
  var idValue = quantityID.id;

  if (rowId == 0) {
    quantityValue = $(quantityID).val();
    itemRate = $("#rateValueColumn").val();
    totalAmount = parseFloat(quantityValue * itemRate);
    $("#totalAmount").val(totalAmount.toFixed(2));
  } else {
    quantityValue = $(quantityID).val();
    var rcID = "#rateValueColumn" + rowId;
    itemRate = $(rcID).val();
    var totalAmountID = "#totalAmount" + rowId;
    //console.log(rcID + "" + itemRate);
    totalAmount = parseFloat(quantityValue * itemRate);
    //console.log(totalAmount);
    $(totalAmountID).val(totalAmount.toFixed(2));
  }
  calculateSubTotal();
}

//populate entered discount and other values to respective column for calculation
function populateValue() {

  var shippingChargesValue = (parseFloat(($("#shippingCharges").val()))).toFixed(2);
  var adjustmentValue = (parseFloat($("#adjustmentData").val())).toFixed(2)
  $("#shippingChargesValue").text(shippingChargesValue);
  $("#adjustmentValue").text(adjustmentValue);

  var subTotalValue = parseFloat($("#subTotal").text());
  var selectedDiscountType = $('#discountType').val();

  var discountValue = Math.round($("#discount").val(), 2);

  if (discountValue != 0) {
    if (selectedDiscountType === "$") {
      $("#discountForCalculation").text("-" + discountValue.toFixed(2));
    } else {
      var calculatedDiscount = (subTotalValue * discountValue) / 100;
      console.log(calculatedDiscount);
      $("#discountForCalculation").text("-" + Math.round(calculatedDiscount, 2));
    }
  }
}

// calcualte total for all items added
function calculateSubTotal() {
  var rowID = $("#rowID").val();
  var testSubTotalAmount = 0;
  var taxAmount = 0;
  var defaultTaxName = "Non-Taxable";
  var tax = 0;
  var taxPercentageValue = 0;
  var taxPercentage = $("#taxDetails option:selected").val();
  var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
  if (numberRegex.test(taxPercentage)) {
    console.log("is a number");
    taxValue = ($("#taxDetails option:selected").text()).match(/\d+/)[0];
    console.log(taxValue);
  }
  else {
    console.log("nontaxable item");
    taxValue = 0;
  }
  $(".totalAmount").each(function () {
    testSubTotalAmount += parseFloat($(this).val());
  });
  console.log("subTotalAmount with Class::" + testSubTotalAmount);

  if (taxValue != 0) {
    taxAmount = (testSubTotalAmount * taxValue) / 100;
    console.log("taxAmount:" + taxAmount);
    $("#taxDetailsValue").text(parseFloat(taxAmount).toFixed(2));
  }
  else {
    $("#taxDetailsValue").text(0);
  }
  $("#subTotal").text(parseFloat(testSubTotalAmount).toFixed(2));
}

//calculate overall sales order total amount
function calculateTotal() {
  var discountValue = parseInt($("#discountForCalculation").text());
  var shippingCharges = parseInt($("#shippingChargesValue").text());
  var adjustmentValue = parseInt($("#adjustmentValue").text());
  var taxValue = 0;
  console.log($("#taxDetailsValue").text());
  if ($("#taxDetailsValue").text() != "" || $("#taxDetailsValue").text() != null) {
    taxValue = parseFloat($("#taxDetailsValue").text());
  } else {
    taxValue = 0;
  }
  console.log("taxValue::" + taxValue);
  console.log("discountValue:" + discountValue);
  console.log("subTotal:" + parseFloat($("#subTotal").text()));
  totalAmount = parseFloat($("#subTotal").text()) + discountValue;
  console.log("afterdiscount::" + totalAmount)
  totalAmount = totalAmount + shippingCharges;
  console.log("after adding shipping charges::" + totalAmount);
  totalAmount = totalAmount + taxValue;
  console.log("after adding taxx::" + totalAmount);
  totalAmount = totalAmount + adjustmentValue;

  $("#totalValueCalculated").text(parseFloat(totalAmount).toFixed(2));
  console.log("totalAmount:")
}

// setvalues to Item Details table
function setValuesinTable(event) {

  var select = event.target.value;
  var selectedArray = select.split(",");
  console.log(selectedArray);
  var eventID = event.target.id;
  var targetId = eventID.replace("selectItem", "");
  var modifiedRowId = String(targetId);

  var sku = "#skuValueColumn" + modifiedRowId;
  var rate = "#rateValueColumn" + modifiedRowId;
  var itemID = "#selectedItemID" + modifiedRowId;

  var quantityID = "#quantity" + modifiedRowId;

  console.log($(itemID));

  var stockID = "#stockinHandValue" + modifiedRowId;
  var actualStockID = "#actualStockinHandValue" + modifiedRowId;

  $(itemID).val(selectedArray[0]);
  $(rate).val(selectedArray[1]);
  $(sku).val(selectedArray[2]);

  //console.log(itemID, sku, rate);
  //Disable tax column based on item's Tax Preference
  var itemTaxPreferene = selectedArray[3];
  var exemptionReasonValue = selectedArray[4];
  console.log("taxPreference" + itemTaxPreferene);
  var taxDetailsId = "#taxDetails" + modifiedRowId;
  var exemptionReasonId = "#exemptionReason" + modifiedRowId;

  if (itemTaxPreferene.toLowerCase() === ("Non-Taxable").toLowerCase) {
    $(taxDetailsId).attr("selected", "selected");
    $(taxDetailsId).prop('disabled', false);

    $(exemptionReasonId).val(exemptionReasonValue);
    //$(exemptionReasonId).css("display", "block");
  }
  calculateTotalAmount(quantityID, modifiedRowId);
  var stockDetails = getStockDetailsForItem(selectedArray[0], stockID, actualStockID);

}

//add another Item Details -- Need to work with JS String Templates
function addNewTableRow() {
  rowId = parseInt($("#rowID").val()) + 1;
  $("#rowID").val(rowId);
  console.log(rowId);
  rowWithCounterId = "selectItem" + rowId;
  rateColumnId = "rateValueColumn" + rowId;
  skuColumnId = "skuValueColumn" + rowId;
  var quantityColumnId = "quantity" + rowId;
  var totalAmountID = "totalAmount" + rowId;
  var markup = "<tr scope='row' id='rowToClone'><td><select class='form-control' id='" + rowWithCounterId + "' name='itemDetailsSelect' onchange='setValuesinTable(event)'></select><br><input type='hidden' class='selectedItemID' id='selectedItemID" + rowId + "'></div><br>" +
    "<textarea name=itemDescription' class='itemDescription' rows='1' cols='30' style='resize: none' placeholder='Add a description to your item'></textarea></td><td></td> " +
    "<td><input type='text' class='skuValueColumn' name='skuValueColumn' id='" + skuColumnId + "'></td><td><input type='text' class='form-control'  class='Quantity' name='quantity' id='" + quantityColumnId + "' value='1.00'><br> " +
    "<label>Stock in Hand: <br /><input type='text' id='stockinHandValue" + rowId + "' class='stockinHandValue transparent-input' name='stockinHandValue'/>" +
    "<label>Actual Stock in Hand: <br /> <input type='text' id='actualStockinHandValue" + rowId + "' class='actualStockinHandValue transparent-input' name='actualStockinHandValue'/><br>" +
    "<a href='#' class='linkText' disabled>Latin core Inc</a></td>" +
    "<td><input type='text' class='form-control rateValueColumn' name='rateValueColumn' id='" + rateColumnId + "' value=''> <br> <select class='form-control' disabled><option value='Apply Price List'>Apply Price List</option> " +
    "<option value='Food Basics'>Food Basics</option></select><br> <a href='#'' id='transactionModal " + rowId + "' onclick='populateTransactionsModal(this)'>Recent Transactions</a></td> " +
    "<td><select disabled class='form-control taxDetailsDropdown' name='texDetails' id='taxDetails" + rowId + "'><option value='Non Taxable'>Non Taxable</option></select><br><input type='text' class='form-control transparent-input' id='exemptionReason'></td><td><input type='text' id='" + totalAmountID + "' name='totalAmount' class='totalAmount'></td><td>" +
    "<div class='dropdown'><button class='dropbtn'><i id='add_row' class='fas fa-ellipsis-h'  style='font-size:20px;color:#210f38;margin-top: 3px;' aria-hidden='true'></i></button>" +
    "<div class='dropdown-content'><a href='#' id='clone_tablerow' onclick='Clone()' value='Clone'>Clone</a></div></div></div> " +
    "<i id='deleteRow' class='far fa-times-circle' aria-hidden='true' style='font-size:20px;color:#880808;margin-top: 3px' onclick='deleteRow(this);'></i></td></tr>"
  $("#tblData").append(markup);

  addAnotherSelectID = "#" + rowWithCounterId;
  $('#selectItem').find('option').clone().appendTo(addAnotherSelectID);
  //taxDetails clone
  addAnotherTaxID = "#taxDetails" + rowId;
  $("#taxDetails").find('option').clone().appendTo(addAnotherTaxID);
  $("#" + quantityColumnId).focusout(function () {
    calculateTotalAmount(this, rowId);
  });
}

//Delete Item Details Row
function deleteRow(deleteRow) {
  console.log("Test:" + $(deleteRow).closest('tr'));
  $(deleteRow).closest('tr').remove();
  calculateSubTotal();
}

/**
 * This functions clones the selected row in the Item Details table with same data populated
 * Perform SubTotal calculation after cloning item details row
 */

function Clone() {
  var RowText = $('#clone_tablerow').text();
  console.log(RowText);
  if (RowText == "Clone" && RowText != "") {
    // alert(RowText);
    var row = document.getElementById("rowToClone");
    var table = document.getElementById("tbody");
    var clone = row.cloneNode(true);
    clone.id = "newID";
    table.appendChild(clone);
  }
  calculateSubTotal();
}

function disableTaxDetails() {
  var taxPercentage = $("#taxDetails option:selected").val();
  if (taxPercentage === "Non-Taxable") {
    $(taxDetailsId).prop('disabled', false);
  }

}

/******************************
 * Form Validation starts HERE!!!!!
 ******************************/
/**
 * 
 * @returns validationStatus
 * This method is to validate the mandatory fields in sales order widget
 * once validation status is true, call salesorderAdd function to add record in creator
 */
//validate form for mandatory fields 
function validateSalesOrderWidget() {
  console.log("inside form validation");
  var customerName = $("#CustomerNameField").val();
  var salesOrderDate = $("#salesOrderDatepicker").val();
  var wareHouseName = $("#wareHouseName").val();
  validationStatus = true;
  if (customerName == "") {
    $("#customerFieldErr").attr("visibility", "show");
    validationStatus = false;
  }
  if (salesOrderDate == "") {
    $("#salesOrderDateErr").attr("visibility", "show");
    validationStatus = false;
  }
  if (wareHouseName == "") {
    $("#wareHouseErr").attr("visibility", "show");
    validationStatus = false;
  }
  if (validationStatus) {
    salesOrderAdd();
  }
  return validationStatus;
}

/******************************
 * Form Validation Ends HERE!!!!!
 ******************************/

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
  // fetchWareHouse();
  // fetchPaymentTerms();
  // fetchDeliveryMethod();
  // fetchSalesPerson();
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
      console.log(JSON.stringify(response));
      console.log(JSON.stringify(response.code));
      console.log(JSON.stringify(response.message));
    });
    console.log("hiii");
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
        //showRecentTransactionModal();
        
      } else {

      }
    });
  });
  populateStockLocationDetails(selectorID);
}

/**
 * 
 */
function populateStockLocationDetails(selectorID){
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
        // var stockTableData = "<tr><td class='text-left'>"+ warehouseName +"</td><td class='text-right'>"+ stockOnHandValue +"</td><td class='text-right'>"+ CommittedStock_Value +"</td><td class='text-right'>"+ AvbForSale_Value +"</td></tr>";
        // console.log(stockTableData);
        var selectedStock = $("#stockLocations option:selected").val();
        if(selectedStock === "Physical"){
          $("#stockOnHand").text(stockDetails[0].Stock_on_Hand);
          $("#committedStock").text(stockDetails[0].Committed_Stock);
          $("#availableForSale").text(stockDetails[0].Available_for_Sale);
        }
        if(selectedStock === "Account"){
          $("#physicalStockOnHand").text(stockDetails[0].Actual_Stock_on_Hand);
          $("#physicalCommittedStock").text(stockDetails[0].Actual_Committed_Stock);
          $("#physicalAvailableForSale").text(stockDetails[0].Actual_Available_for_Sale);
        }
        showRecentTransactionModal();
      }

    });
  });
  //populateTransactionsDetails(selectorID);
}
/**
 * 
 */
// function populateTransactionsDetails(selectorID){
//   var itemID = $(selectorID).closest('tr').find('.selectedItemID').val();
//    console.log(itemID);
//   ZOHO.CREATOR.init().then(function (data) {
//     itemDetailsConfig = {
//       appName: "latin-core-order-management",
//       reportName: "Items_Widget_Subform_Report",
//       Item_Name: itemID
//     }
//     console.log(itemDetailsConfig);
//     ZOHO.CREATOR.API.getAllRecords(itemDetailsConfig).then(function (response) {
//       //console.log(JSON.stringify(response.data));
//       if (response.code == 3000) {
//         $.each(response.data, function (idx, dataList) {
//         associatedSalesOrderID = dataList.Sale_Order_ID.ID;
//         console.log(associatedSalesOrderID);
//         });
//       }
//     });
//   });
     //showRecentTransactionModal();

// }
/*********************
 * JS API Calls Ends Here!!!!!!!
 **********************/

/***********************
 * *Utility Function starts Here 
 ***********************/

/**Jquery Function to auto resize the textarea for Biling and shipping Address 
  * 
 */
function autoResize() {
  $(".autoResizeTextArea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  }).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  });
}
/**
 * This function is to display the modal
 */
function showRecentTransactionModal() {
  $('#recentTransactionModal').modal({ show: true });
  $('.modal.right, .modal-dialog').css({ "position": "fixed", "margin": "auto", "width": "100%", "height": "100%", "-webkit-transform": "translate3d(0%, 0, 0)", "-ms-transform": "translate3d(0%, 0, 0)", "-o-transform": "translate3d(0%, 0, 0)", "transform": "translate3d(0%, 0, 0)" });
  $('.modal.right, .modal-content').css({ "height": "100%", "overflow-y": "auto" });
  $('.modal.right.fade, .modal-dialog').css({ "right": "0", "-webkit-transition": "opacity 0.3s linear, right 0.3s ease-out", "-moz-transition": "opacity 0.3s linear, right 0.3s ease-out", "-o-transition": "opacity 0.3s linear, right 0.3s ease-out", "transition": "opacity 0.3s linear, right 0.3s ease-out" });
  $('.modal.right.fade.in, .modal-dialog').css({ "right": "0" });
}
/***********************
 * *Utility Function Ends Here 
 ***********************/
