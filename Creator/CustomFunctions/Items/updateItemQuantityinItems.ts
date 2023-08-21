void Item.updateItemQuantityinItems()
{
	fetchItems = Items[Zoho_Books_ID != null && quantity_from_Books != true] range from 1 to 50;
	for each  item in fetchItems
	{
		//item quantity
		quantityResponse = invokeurl
		[
			url :"https://inventory.zoho.com/api/v1/items/" + item.Zoho_Books_ID + "/inventorysummary?organization_id=701437914"
			type :GET
			connection:"zohoinventoryconnection"
		];
		info item.Zoho_Books_ID;
		// 		info quantityResponse;
		item.To_be_Shipped=ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_shipped"),0);
		item.To_be_Received=ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_received"),0);
		item.To_be_Invoiced=ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_invoiced"),0);
		item.To_be_Billed=ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_billed"),0);
		item.quantity_from_Books=true;
	}
}
