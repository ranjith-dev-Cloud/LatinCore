void DownloadBatchDetails(Items batchObject)
{
	// 	info batchObject;
	NewList = List();
	count = 0;
	ItemName = "Item Name";
	SKU = "SKU";
	ZohoBookID = "Zoho Book ID";
	BatchNumber = "Batch Number";
	QuantityIn = "Quantity IN";
	QuantityAvailable = "Quantity Available";
	ExpiryDate = "Expiry Date";
	BatchInID = "Batch IN ID";
	WareHouseID = "Warehouse ID";
	Status = "Status";
	QuantityAdjusted = "Quantity Adjusted";
	HeaderLine = "\"" + ItemName + "\",\"" + SKU + "\",\"" + ZohoBookID + "\",\"" + BatchNumber + "\",\"" + QuantityIn + "\",\"" + QuantityAvailable + "\",\"" + ExpiryDate + "\",\"" + BatchInID + "\",\"" + WareHouseID + "\",\"" + Status + "\",\"" + QuantityAdjusted + "\"";
	NewList.add(HeaderLine);
	for each  itemBatch in batchObject
	{
		getItemBatchSubformDetails = Items[ID == itemBatch.ID && Advanced_Inventory_Tracking == "Track Batches"];
		// 		info "Batch Tracking " + getItemBatchSubformDetails.Batch_Tracking;
		if(getItemBatchSubformDetails.Batch_Tracking != null)
		{
			for each  subformRow in getItemBatchSubformDetails.Batch_Tracking
			{
				NewLine = "\"" + ifNull(itemBatch.Name," ") + "\",\"" + ifNull(itemBatch.SKU," ") + "\",\"" + ifNull(itemBatch.Zoho_Books_ID," ") + "\",\"" + subformRow.Batch_Reference + "\",\"" + subformRow.Quantity_IN + "\",\"" + subformRow.Quantity_Available + "\",\"" + subformRow.Expiry_Date + "\",\"" + subformRow.Batch_IN_ID + "\",\"" + subformRow.Warehouse_ID + "\",\"" + subformRow.Status + "\",\"" + " " + "\"";
				NewList.add(NewLine);
			}
		}
		else
		{
			NewLine = "\"" + ifNull(itemBatch.Name," ") + "\",\"" + ifNull(itemBatch.SKU," ") + "\",\"" + ifNull(itemBatch.Zoho_Books_ID," ") + "\",\"" + " " + "\",\"" + " " + "\",\"" + " " + "\",\"" + subformRow.Expiry_Date + "\",\"" + " " + "\",\"" + " " + "\",\"" + " " + "\",\"" + " " + "\"";
			NewList.add(NewLine);
		}
	}
	FileName = "Items Batch Details-" + zoho.currentdate + ".csv";
	CSVFile = NewList.toString("\n").toFile(FileName);
	addFiletoBatchDownload = insert into Batch_Download_File
	[
		Added_User=zoho.loginuser
		File_upload=CSVFile
	];
	fetchBatchDownload = Batch_Download_File[ID == addFiletoBatchDownload];
	// 	info fetchBatchDownload;
	openUrl("https://creatorexport.zoho.com/file/rbermejo/latin-core-order-management/All_Batch_Download_Files/" + fetchBatchDownload.ID + "/File_upload/download?filepath=/" + fetchBatchDownload.File_upload,"same window");
}
