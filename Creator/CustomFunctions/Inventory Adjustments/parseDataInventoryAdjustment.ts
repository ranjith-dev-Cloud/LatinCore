void InventoryAdjustment.parseDataInventoryAdjustment(int importAdjustID)
{
	//4008259000005318005
	fetchImportfile = Adjust_Form[ID == importAdjustID];
	cnt = fetchImportfile.File_upload.content;
	rowslist = cnt.toList("\n");
	count = 0;
	successRecord = 0;
	for each  rl in rowslist
	{
		elementsList = rl.tolist(",");
		count = count + 1;
		if(count > 1)
		{
			if(elementsList.size() > 0 && !elementsList.isEmpty() && elementsList.get(0) != "" && elementsList.get(3) == "None" && elementsList.get(4).trim() != "")
			{
				// 				info "chk " + elementsList.get(4);
				// 				info elementsList.get(4);
				fetchItemAdjInv = Items[Name == elementsList.get(0)];
				insertData = insert into Inventory_Adjustments_Data
				[
					Added_User=zoho.loginuser
					Mode_of_Adjustments="quantity"
					Date_field=fetchImportfile.Date_field
					Item_name=elementsList.get(0)
					Item_ID=fetchItemAdjInv.Zoho_Books_ID
					Reference_Number=fetchImportfile.Reference_Number
					Advance_Inventory_Tracking=elementsList.get(3)
					Quantity_Adjusted=elementsList.get(4)
					Reason=fetchImportfile.Reason
					Account=fetchItemAdjInv.Account1
				];
				thisapp.Books.inventoryToCreator(insertData);
				// 								fetchInvAdjustmentData = Inventory_Adjustments_Data[ID == insertData];
				//                                 fetchInvAdjustmentData.Quantity_Adjusted=fetchInvAdjustmentData.Quantity_Adjusted_temp;
			}
		}
		// 		if(count == 100)
		// 		{
		// 			break;
		// 		}
	}
}
