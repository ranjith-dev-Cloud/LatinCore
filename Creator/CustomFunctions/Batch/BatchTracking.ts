void Batch.BatchTracking()
{
	/*
			Ranjith M
			20/07/2023
			2089653000029872525,2089653000039092195
			*/
	try 
	{
		getBatchItems = Items[Advanced_Inventory_Tracking == "Track Batches" && Zoho_Books_ID == 2089653000061229113.toString()];
		// 			getBatchItems = Items[Advanced_Inventory_Tracking == "Track Batches"];
		for each  itemBatch in getBatchItems
		{
			BookID = itemBatch.Zoho_Books_ID;
			fetchBatchBooks = invokeurl
			[
				url :"https://inventory.zoho.com/api/v1/items/batches?item_id=" + BookID + "&organization_id=701437914"
				type :GET
				connection:"zohoinventoryconnection"
			];
			info "Batch Details " + fetchBatchBooks;
			// 		  info fetchBatchBooks.get("batches");
			//            ********************** Subform Insertion *************** 
			if(fetchBatchBooks.get("batches") != null || fetchBatchBooks.get("batches") != "")
			{
				for each  batchArray in fetchBatchBooks.get("batches")
				{
					info "Batch IN" + batchArray.get("batch_in_id");
					info batchArray.get("batch_number");
					info batchArray.get("expiry_date");
					info batchArray.get("in_quantity").round(0);
					info batchArray.get("balance_quantity").round(0);
					info batchArray.get("warehouse_id");
					info batchArray.get("status");
					// 									  row1 = Items.Batch_Tracking();
					// 									  row1.Batch_Reference = batchArray.get("batch_number");
					// 									  row1.Expiry_Date = batchArray.get("expiry_date");
					// 									  row1.Quantity_IN = batchArray.get("in_quantity").round(0);
					// 									  row1.Quantity_Available = batchArray.get("balance_quantity").round(0);
					// 									  row1.Batch_IN_ID = batchArray.get("batch_in_id");
					// 									  row1.Warehouse_ID = batchArray.get("warehouse_id");
					// 									  row1.Status = batchArray.get("status");	  
					// 									  col = Collection();
					// 									  col.insert(row1);
					// 									  itemBatch.Batch_Tracking.insert(col);
				}
			}
			// if condition ends
		}
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Items(Batch)"
			Process_Description="Items Batch Report Download Process"
			Out_Response=e.message
		];
	}
}
