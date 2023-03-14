void fetchData.getWareHouseFromInventory()
{
	warehouseDetails = invokeurl
	[
		url :"https://www.zohoapis.com/inventory/v1/settings/warehouses?organization_id=701437914"
		type :GET
		connection:"zohoinventoryconnection"
	];
	//info warehouseDetails;
	warehouses = warehouseDetails.get("warehouses");
	//info warehouses;
	for each  warehouseData in warehouses
	{
		warehouseFormDetails = insert into Warehouse
		[
			Added_User=zoho.loginuser
			Warehouse_Name=warehouseData.get("warehouse_name")
			Attention=warehouseData.get("attention")
			Warehouse_ID=warehouseData.get("warehouse_id")
			Street1=warehouseData.get("address2")
			Street_2=warehouseData.get("address")
			City=warehouseData.get("city")
			Country=warehouseData.get("country")
			State=warehouseData.get("state")
			Zip_Code=warehouseData.get("zip")
			Phone_Number=warehouseData.get("phone")
			Email=warehouseData.get("email")
		];
	}
	//info warehouseFormDetails;
}