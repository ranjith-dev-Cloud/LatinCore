void Batch.pushBatchDatatoZohoBooks(int recID)
{
	/*
	Ranjith M
	24/07/2023
	*/
	try 
	{
		// 				getBranches = invokeurl
		// 				[
		// 					url :"https://inventory.zoho.com/api/v1/branches?organization_id=701437914"
		// 					type :GET
		// 					connection:"zohoinventoryconnection"
		// 				];
		// 				info "Branch " + getBranches;
		// 				fetchBatchDataAdjustmentReport = Batch_Data_Adjustment[ID == 4008259000006256003]; "branch_id":"",
		// 		dataMap = Map();
		dataMap = {"line_items":{{"item_id":"2089653000061229113","name":"ClouudLion Test","quantity_adjusted":"5","unit":"cm","adjustment_account_id":"2089653000000034003","warehouse_id":"2089653000000462031","batches":{{"batch_number":"test Batch","external_batch_number":"56478","manufacturer_date":"2023-07-14","expiry_date":"2023-07-15","in_quantity":"1"}},"description":"","asset_price":11,"tags":{},"item_order":1}},"date":"2023-07-24","reason":"Damaged goods","adjustment_type":"quantity","reference_number":"","status":"draft","custom_fields":{},"documents":{}};
		sendData = invokeurl
		[
			url :"https://inventory.zoho.com/api/v1/inventoryadjustments?organization_id=701437914"
			type :POST
			parameters:dataMap.toString()
			connection:"zohoinventoryconnection"
		];
		info "Send Data " + sendData;
	}
	catch (e)
	{
		// Developer Log
	}
}
