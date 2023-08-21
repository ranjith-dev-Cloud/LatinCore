void Books.inventoryMismatchPageExcelDownload()
{
	try 
	{
		GetRec = Items[ID != null];
		NewList = List();
		count = 0;
		ItemName = "Item Name";
		SKU = "SKU";
		WareHousename = "Warehouse Name";
		OpeningStock = "Opening Stock";
		OpeningStockValue = "Opening Stock Value";
		AccStockonHand = "Accounting Stock On Hand";
		AccCommitedStock = "Accounting Commited Stock";
		AccAvailableforSale = "Accounting - Available for Sale";
		phyActualStockonHand = "Physical - Actual StockOnHand";
		phyActualCommitedStockonHand = "Physical - Commited StockOnHand";
		phyActualAvailableforSale = "Physical - Available for Sale";
		soStatus = "SO Status";
		poStatus = "PO Status";
		tobeShipped = "To be Shipped";
		tobeReceived = "To be Received";
		tobeInvoiced = "To be Invoiced";
		tobeBilled = "To be Billed";
		HeaderLine = "\"" + ItemName + "\",\"" + SKU + "\",\"" + WareHousename + "\",\"" + OpeningStock + "\",\"" + OpeningStockValue + "\",\"" + AccStockonHand + "\",\"" + AccCommitedStock + "\",\"" + AccAvailableforSale + "\",\"" + phyActualStockonHand + "\",\"" + phyActualCommitedStockonHand + "\",\"" + phyActualAvailableforSale + "\",\"" + soStatus + "\",\"" + poStatus + "\",\"" + tobeShipped + "\",\"" + tobeReceived + "\",\"" + tobeInvoiced + "\",\"" + tobeBilled + "\"";
		NewList.add(HeaderLine);
		for each  rec in GetRec
		{
			if(rec.Warehouse_Stock_Details.Stock_on_Hand != rec.Warehouse_Stock_Details.Actual_Stock_on_Hand || rec.Warehouse_Stock_Details.Available_for_Sale != rec.Warehouse_Stock_Details.Actual_Available_for_Sale)
			{
				//check PO and So Status
				fetchSOCheckLog = SO_Check_Log_Form[Item_Name == rec.Zoho_Books_ID.toString()] sort by Added_Time desc range from 0 to 0;
				fetchPOCheckLog = PO_Check_Log_Form[Item_ID == rec.Zoho_Books_ID.toString()] sort by Added_Time desc range from 0 to 0;
				SoStatus = "";
				if(fetchSOCheckLog.Item_Name == null)
				{
					SoStatus = "Not Applicable";
				}
				else if(isEmpty(fetchSOCheckLog.Draft) == true && isEmpty(fetchSOCheckLog.Pending) == true && isEmpty(fetchSOCheckLog.Onhold) && isEmpty(fetchSOCheckLog.Invoiced_Not_Shipped) == true && isEmpty(fetchSOCheckLog.Shipped_Not_invoiced) == true && isEmpty(fetchSOCheckLog.Credit_Note) == true)
				{
					SoStatus = "Closed";
				}
				else
				{
					SoStatus = "Not Closed";
				}
				Postatus = "";
				if(fetchPOCheckLog.Item_ID == null)
				{
					Postatus = "Not Applicable";
				}
				else if(isEmpty(fetchPOCheckLog.Draft) == true && isEmpty(fetchPOCheckLog.Issued) == true && isEmpty(fetchPOCheckLog.Partially_Billed) && isEmpty(fetchPOCheckLog.Billed_and_Not_Received) == true && isEmpty(fetchPOCheckLog.Received_and_Not_Billed) == true && isEmpty(fetchPOCheckLog.Billed) == true)
				{
					Postatus = "Closed";
				}
				else
				{
					Postatus = "Not Closed";
				}
				NewLine = "\"" + ifNull(rec.Name," ") + "\",\"" + ifNull(rec.SKU," ") + "\",\"" + ifNull(rec.Warehouse_Stock_Details.WAREHOUSE_NAME," ") + "\",\"" + ifNull(rec.Warehouse_Stock_Details.OPENING_STOCK,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.OPENING_STOCK_VALUE,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.Stock_on_Hand,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.Committed_Stock,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.Available_for_Sale,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.Actual_Stock_on_Hand,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.Actual_Committed_Stock,0) + "\",\"" + ifNull(rec.Warehouse_Stock_Details.Actual_Available_for_Sale,0) + "\",\"" + SoStatus + "\",\"" + Postatus + "\",\"" + rec.To_be_Shipped + "\",\"" + rec.To_be_Received + "\",\"" + rec.To_be_Invoiced + "\",\"" + rec.To_be_Billed + "\"";
				NewList.add(NewLine);
				count = count + 1;
			}
		}
		// 	info NewLine;
		FileName = "Inventory Mismatch-" + zoho.currentdate + ".csv";
		CSVFile = NewList.toString("\n").toFile(FileName);
		// 	info CSVFile;
		upload = insert into Test
		[
			Added_User=zoho.loginuser
			Date_field=zoho.currentdate
			File_upload=CSVFile
			Page_Name="Inventory Mismatch"
		];
		// 	info "ID" + var;
		fet = Test[ID == upload];
		openUrl("https://creatorexport.zoho.com/file/rbermejo/latin-core-order-management/All_Tests/" + fet.ID + "/File_upload/download?filepath=/" + fet.File_upload,"same window");
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Iventory Mismatch Page Download"
			Process_Description="Iventory Mismatch Page Download Excel with Criteria"
			Out_Response=e.message
		];
	}
}
