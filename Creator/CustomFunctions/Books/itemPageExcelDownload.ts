void Books.itemPageExcelDownload(int strt, int end, String yr, String ItemName, String SKU, String ys, String no)
{
	if(ys == "Yes" && no == "No")
	{
		GetRec = Items[Name == ItemName];
	}
	else if(ys == "No" && no == "Yes")
	{
		GetRec = Items[SKU == SKU.toString()];
		info " Message";
	}
	else if(ys == "Yes" && no == "Yes")
	{
		GetRec = Items[Name == ItemName && SKU == SKU];
		info "Double";
	}
	else if(ys == "No" && no == "No")
	{
		GetRec = Items[Zoho_Books_ID != null] range from strt to end;
		// 			fetItemID = Items[Zoho_Books_ID == 2089653000000221117.toString()] ;
	}
	else
	{
		GetRec = Items[Zoho_Books_ID != null] range from strt to end;
	}
	// 	GetRec = Items[Zoho_Books_ID != null] range from strt to end;
	// 	GetRec = Items[Zoho_Books_ID == 2089653000000221007.toString()];
	NewList = List();
	count = 0;
	ItemName = "Item Name";
	SKU = "SKU";
	year = "Year";
	actualQuantity = "Actual Quantity";
	openingStock = "Opening Stock";
	openingStockValue = "Opening Stock Value";
	PurchaseOrder = "Purchase Order";
	SalesOrder = "SalesOrder";
	Credit = "Credit Notes";
	Vendor = "Vendor";
	InventoryAdjut = "Inventory Adjustment";
	countDiff = "Consolidated Quantity";
	HeaderLine = "\"" + ItemName + "\",\"" + SKU + "\",\"" + year + "\",\"" + actualQuantity + "\",\"" + openingStock + "\",\"" + openingStockValue + "\",\"" + PurchaseOrder + "\",\"" + SalesOrder + "\",\"" + Vendor + "\",\"" + Credit + "\",\"" + InventoryAdjut + "\",\"" + countDiff + "\"";
	NewList.add(HeaderLine);
	for each  rec in GetRec
	{
		tempcount = 0;
		for each  item in rec.Total_Count1
		{
			if(item.Year_field == yr)
			{
				NewLine = "\"" + rec.Name + "\",\"" + rec.SKU + "\",\"" + yr + "\",\"" + rec.Warehouse_Stock_Details.Actual_Stock_on_Hand + "\",\"" + rec.Warehouse_Stock_Details.OPENING_STOCK + "\",\"" + rec.Warehouse_Stock_Details.OPENING_STOCK_VALUE + "\",\"" + item.Purchase_Order_Total_Quantity + "\",\"" + item.Sales_Order_Total_Quantity + "\",\"" + item.Vendor_Credit_Total_Quantity + "\",\"" + item.Credit_Notes_Total_Quantity + "\",\"" + item.Inventory_Adjustment_Quantity + "\",\"" + item.Count_Difference + "\"";
				NewList.add(NewLine);
				count = count + 1;
				tempcount = tempcount + 1;
			}
		}
		if(tempcount < 1)
		{
			NewLine = "\"" + rec.Name + "\",\"" + rec.SKU + "\",\"" + yr + "\",\"" + rec.Warehouse_Stock_Details.Actual_Stock_on_Hand + "\",\"" + rec.Warehouse_Stock_Details.OPENING_STOCK + "\",\"" + rec.Warehouse_Stock_Details.OPENING_STOCK_VALUE + "\",\"" + 0 + "\",\"" + 0 + "\",\"" + 0 + "\",\"" + 0 + "\",\"" + 0 + "\",\"" + 0 + "\"";
			NewList.add(NewLine);
			count = count + 1;
		}
	}
	// 	info NewLine;
	FileName = "Items-SO&PO--" + zoho.currentdate + ".csv";
	CSVFile = NewList.toString("\n").toFile(FileName);
	info CSVFile;
	info count;
	upload = insert into Test
	[
		Added_User=zoho.loginuser
		Date_field=zoho.currentdate
		File_upload=CSVFile
	];
	// 	info "ID" + var;
	fet = Test[ID == upload];
	openUrl("https://creatorexport.zoho.com/file/rbermejo/latin-core-order-management/All_Tests/" + fet.ID + "/File_upload/download?filepath=/" + fet.File_upload,"new window");
}
