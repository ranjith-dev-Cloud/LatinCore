map Books.getItemsBasedonCriteria(String yr, int strt, int end, String ItemName, String SKU, String ys, String no)
{
	try 
	{
		// 	SKU = 10020784925679;	
		if(ys == "Yes" && no == "No")
		{
			fetItemID = Items[Name == ItemName];
		}
		else if(ys == "No" && no == "Yes")
		{
			fetItemID = Items[SKU == SKU.toString()];
			info " Message";
		}
		else if(ys == "Yes" && no == "Yes")
		{
			fetItemID = Items[Name == ItemName && SKU == SKU];
			info "Double";
		}
		else if(ys == "No" && no == "No")
		{
			fetItemID = Items[Zoho_Books_ID != null] range from strt to end;
			// 			fetItemID = Items[Zoho_Books_ID == 2089653000000221117.toString()] ;
		}
		// 		info SKU;
		// 		fetchsku = Items[SKU == SKU];
		// 		info fetchsku.Name;
		count = 0;
		itemMap = Map();
		idlist = List();
		for each  item in fetItemID
		{
			idlist.add(item.Zoho_Books_ID);
			datamap = Map();
			datamap.put("Item_Name",item.Name);
			datamap.put("SKU",item.SKU);
			datamap.put("ActualQuantity",item.Warehouse_Stock_Details.Actual_Stock_on_Hand);
			datamap.put("TobeShiped",item.To_be_Shipped);
			datamap.put("TobeReceived",item.To_be_Received);
			datamap.put("TobeInvoiced",item.To_be_Invoiced);
			datamap.put("TobeBilled",item.To_be_Billed);
			if(item.Warehouse_Stock_Details.OPENING_STOCK == null)
			{
				datamap.put("OpeningStock",0);
			}
			else
			{
				datamap.put("OpeningStock",item.Warehouse_Stock_Details.OPENING_STOCK);
			}
			datamap.put("OpeningStockValue",item.Warehouse_Stock_Details.OPENING_STOCK_VALUE);
			for each  item2 in item.Total_Count1
			{
				if(item2.Year_field == yr)
				{
					count = count + 1;
					// 					info "Year " + item2.Year_field;
					datamap.put("Year",item2.Year_field);
					datamap.put("purchase",item2.Purchase_Order_Total_Quantity);
					datamap.put("sales",item2.Sales_Order_Total_Quantity * -1);
					datamap.put("vendor",item2.Vendor_Credit_Total_Quantity * -1);
					datamap.put("Creditnotes",item2.Credit_Notes_Total_Quantity);
					datamap.put("inventoryAdjustment",item2.Inventory_Adjustment_Quantity);
					datamap.put("ConsolidatedDiff",item2.Count_Difference);
				}
			}
			itemMap.put(item.Zoho_Books_ID,datamap);
		}
		itemMap.put("BookID",idlist);
		info itemMap;
		info count;
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Items"
			Process_Description="Get all Items based on Year - Item Page"
			Out_Response=e.message
		];
	}
	return itemMap;
}
