 
itemID = item.get("item_id");
//organizationID = organization.get("organization_id");
numbersList = {1,2,3,4,5,6,7,8,9,10};
data = Map();
saleslist = List();
purchaseOrderCount = 0;
salesOrderCount = 0;
hasMoresalesOrder = true;
for each  num in numbersList
{
	if(hasMoresalesOrder == true)
	{
		salesOrders = zoho.books.getRecords("salesorders","701437914","item_id=" + itemID + "&page=" + num,"zbooks");
		//	info salesOrders.get("salesorders") ;
		for each  var1 in salesOrders.get("salesorders")
		{
			var1 = var1.toMap();
			//			info var1.get("salesorder_id");
			salesOrderID = var1.get("salesorder_id");
			//			info salesOrderID;
			salesOrderData = zoho.books.getRecordsByID("salesorders","701437914",salesOrderID,"zbooks");
			salesdetails = salesOrderData.get("salesorder");
			for each  item in salesdetails.get("line_items")
			{
				item = item.toMap();
				itemdetails = item.get("item_id");
				if(itemdetails == itemID)
				{
					quantity = item.get("quantity");
					salesOrderCount = salesOrderCount + quantity;
				}
			}
			// 				salesOrderCount = salesOrderCount + 1;
		}
		if(salesOrders.get("page_context").get("has_more_page") == false)
		{
			hasMoresalesOrder = false;
			break;
		}
	}
}
//info salesOrderCount ;
for each  num1 in numbersList
{
	if(hasMoresalesOrder == true)
	{
		purchaseOrders = zoho.books.getRecords("purchaseorders","701437914","item_id=" + itemID + "&page=" + num1,"zbooks");
		info salesOrders;
		for each  var1 in purchaseOrders.get("purchaseorders")
		{
			var1 = var1.toMap();
			//	info var1.get("salesorder_id");
			purchaseOrderID = var1.get("purchaseorder_id");
			//		info salesOrderID;
			purchaseOrderData = zoho.books.getRecordsByID("purchaseorders","701437914",purchaseOrderID,"zbooks");
			purchasedetails = purchaseOrderData.get("salesorder");
			for each  item in purchasedetails.get("line_items")
			{
				item = item.toMap();
				itemdetails = item.get("item_id");
				if(itemdetails == itemID)
				{
					quantity = item.get("quantity");
					purchaseOrderCount = purchaseOrderCount + quantity;
				}
			}
		}
		if(salesOrders.get("page_context").get("has_more_page") == false)
		{
			hasMoresalesOrder = false;
			break;
		}
	}
}
info salesOrderCount;
info purchaseOrderCount;
openurl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Count_of_SO_and_PO","new window");
