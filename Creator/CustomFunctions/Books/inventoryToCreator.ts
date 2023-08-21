void Books.inventoryToCreator(int id)
{
	try 
	{
		getInvAdj = Inventory_Adjustments_Data[ID == id];
		dataMap = Map();
		dataMap.put("date",getInvAdj.Date_field);
		dataMap.put("reason",getInvAdj.Reason);
		dataMap.put("reference_number",getInvAdj.Reference_Number);
		dataMap.put("adjustment_type",getInvAdj.Mode_of_Adjustments);
		info getInvAdj.Mode_of_Adjustments;
		info dataMap;
		lineItems = List();
		subform = Map();
		subform.put("adjustment_account_name",getInvAdj.Account);
		subform.put("quantity_adjusted",getInvAdj.Quantity_Adjusted.tolong());
		subform.put("item_id",getInvAdj.Item_ID);
		lineItems.add(subform);
		dataMap.put("line_items",lineItems);
		response = zoho.books.createRecord("inventoryadjustments","701437914",dataMap);
		// 		info response;
		getInvAdj.Zoho_Inventory_Adjustment_ID=response.get("inventory_adjustment").get("inventory_adjustment_id");
		if(response.get("message") == "Inventory Adjustment has been added")
		{
			getInvAdj.Status="Success";
		}
		else
		{
			getInvAdj.Status="Failure";
		}
	}
	catch (e)
	{
		insertLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Inventory Adjustment Data"
			Out_Response=e.message
			Process_Description="Inventory Adjustment Data Function"
		];
	}
}
