map Books.purchaseOrderYearWiseCount(int itemID)
{
	try 
	{
		fetItemDetails = Items[Zoho_Books_ID == itemID.toString()];
		dataMap = Map();
		yrlist = List();
		for each  item in fetItemDetails.Total_Count1
		{
			info item.Year_field;
			yrlist.add(item.Year_field);
			dataMap.put(item.Year_field,item.Purchase_Order_Total_Quantity);
		}
		dataMap.put("Years",yrlist);
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Purchase Order"
			Process_Description="Fetch Purchase order data by Item ID "
			Out_Response=e.message
		];
	}
	return dataMap;
}
