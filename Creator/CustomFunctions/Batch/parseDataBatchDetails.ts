void Batch.parseDataBatchDetails(int recID)
{
	fetchImportFile = Batch_Quantity_Adjusted[ID == recID];
	cnt = fetchImportFile.Batch_File_upload.content;
	rowslist = cnt.toList("\n");
	count = 0;
	successRecord = 0;
	for each  rl in rowslist
	{
		elementsList = rl.tolist(",");
		count = count + 1;
		if(count > 1)
		{
			if(elementsList.size() > 0 && !elementsList.isEmpty() && elementsList.get(0) != "")
			{
				info "Item Name " + elementsList.get(0);
				// 								info elementsList.get(4);
				insertData = insert into Batch_Data_Adjustment
				[
					Added_User=zoho.loginuser
					Item_Name=elementsList.get(0)
					SKU=elementsList.get(1)
					Item_ID=elementsList.get(2)
					Batch_Number=elementsList.get(3)
					Quantity_IN=elementsList.get(4)
					Quantity_Available=elementsList.get(5)
					Expiry_Date=elementsList.get(6)
					Batch_IN_ID=elementsList.get(7)
					Warehouse_ID=elementsList.get(8)
					Status=elementsList.get(9)
					Quantity_Adjusted=elementsList.get(10)
				];
				// 								thisapp.Batch.pushBatchDatatoZohoBooks(insertDate);
			}
		}
	}
}
