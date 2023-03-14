void SalesOrderFunc(int salesOrderId)
{
	try 
	{
		lineItemList = List();
		//resp = Sale_Order[ID == 4008259000000230059];
		//info resp;
		//salesOrderId
		resp = Sale_Order[ID == salesOrderId];
		customerInfo = Customers[ID == resp.Customer_Name];
		paymentInfo = Payments_Terms[ID == resp.Payment_Terms];
		deliveryInfo = Delivery_Method[ID == resp.Delivery_Method];
		warehouseInfo = Warehouse[ID == resp.Warehouse_Name];
		salesPersonInfo = Sales_Persons[ID == resp.Sales_Persons];
		salesOrderDetailsMap = Map();
		salesOrderDetailsMap.put("customer_name",ifnull(customerInfo.Customer_Name,""));
		salesOrderDetailsMap.put("customer_id",ifnull(customerInfo.Zoho_Books_ID,null));
		//salesOrderDetailsMap.put("salesorder_number",ifnull(resp.Sales_Order,""));
		salesOrderDetailsMap.put("reference_number",ifnull(resp.Reference,""));
		salesOrderDetailsMap.put("date",ifnull(resp.Sales_Order_Date.toString("yyyy-MM-dd"),null));
		// 	date = zoho.currentdate.toString("yyyy-MM-dd");
		// 	info date ;
		salesOrderDetailsMap.put("shipment_date",ifnull(resp.Expected_Shipment_Date.toString("yyyy-MM-dd"),null));
		// 	datamap.put("shipment_date",ifnull(resp.Expected_Shipment_Date,null));
		// 		salesOrderDetailsMap.put("delivery_method",ifnull(deliveryInfo.Delivery_Method,""));
		salesOrderDetailsMap.put("delivery_method","Truck");
		salesOrderDetailsMap.put("delivery_method_id","2089653000000624723");
		salesOrderDetailsMap.put("payment_terms_label",ifnull(paymentInfo.Term_Name,""));
		salesOrderDetailsMap.put("payment_terms",ifnull(paymentInfo.Number_of_Days,""));
		salesOrderDetailsMap.put("warehouse_name",ifnull(warehouseInfo.Warehouse_Name,""));
		salesOrderDetailsMap.put("warehouse_id",ifnull(warehouseInfo.Warehouse_ID,""));
		// 		salesOrderDetailsMap.put("salesperson_name",ifnull(salesPersonInfo.Sales_Person,""));
		// 		salesOrderDetailsMap.put("salesperson_id",ifnull(salesPersonInfo.Zoho_Books_ID,""));
		salesOrderDetailsMap.put("salesperson_name","Olga Malanco");
		salesOrderDetailsMap.put("salesperson_id","2089653000000220027");
		salesOrderDetailsMap.put("sub_total",ifnull(resp.Sub_Total.round(2),null));
		salesOrderDetailsMap.put("discount",ifnull(resp.Discount,null));
		salesOrderDetailsMap.put("shipping_charge",ifnull(resp.Shipping_Charges,null));
		salesOrderDetailsMap.put("adjustment",ifnull(resp.Adjustment,null));
		salesOrderDetailsMap.put("total",ifnull(resp.Total.round(2),null));
		salesOrderDetailsMap.put("notes",ifnull(resp.Customer_Notes,""));
		salesOrderDetailsMap.put("terms",ifnull(resp.Terms_Conditions,""));
		salesOrderDetailsMap.put("attachment_name",ifnull(resp.Attach_File_s_to_Sales_Order,""));
		//  	info datamap ;
		// 	Item Subform
		lineItemDetails = resp.Items;
		taxdata = Taxes[ID == lineItemDetails.Tax1];
		itemdata = Items[ID == resp.Items];
		lineItemDetailsMap = Map();
		lineItemDetailsMap.put("rate",ifnull(lineItemDetails.rate.round(2),null));
		lineItemDetailsMap.put("name",ifnull(lineItemDetails.Item_Name,""));
		lineItemDetailsMap.put("bcy_rate",ifnull(lineItemDetails.Amount,null));
		lineItemDetailsMap.put("sku",ifnull(lineItemDetails.SKU,""));
		lineItemDetailsMap.put("description",ifnull(lineItemDetails.Item_Description,""));
		lineItemDetailsMap.put("quantity",ifnull(lineItemDetails.Quantity.round(0),""));
		lineItemDetailsMap.put("tax_name",ifnull(taxdata.Tax_Name,""));
		lineItemList.add(lineItemDetailsMap);
		salesOrderDetailsMap.put("line_items",lineItemList);
		// 		salesOrderCreateResponse = zoho.books.createRecord("salesorders","701437914",salesOrderDetailsMap,"zohobooks");
		// 		logDetails = insert into Developer_log
		// 		[
		// 			Added_User=zoho.loginuser
		// 			Out_Response=salesOrderCreateResponse.get("message")
		// 			Process_Description="PushSalesOrderDetailsToBooks"
		// 			Module="Sales Order"
		// 		];
		// 		salesOrderBooksID = salesOrderCreateResponse.get("salesorder_id");
		// 		info salesOrderBooksID;
		//info createBooks;
	}
	catch (e)
	{
		logDetails = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Out_Response=e.message
			Process_Description="PushSalesOrderDetailsToBooks"
			Module="Sales Order"
		];
	}
}