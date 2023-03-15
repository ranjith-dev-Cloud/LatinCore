$(document).ready(function () {
  generateSalesOrderNumber();
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
  console.log(idValue);

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

