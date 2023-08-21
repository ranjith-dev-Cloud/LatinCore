
/*response = invokeurl
[
	url :"https://www.zohoapis.com/books/v3/salesorders?organization_id=701437914&page=58&per_page=50"
	type :GET
	connection:"zbooks"
];
//info response;
count = 0;
for each  eachItem in response.get("salesorders")
{*/
salesorderID = salesorder.get("salesorder_id");
salesorderdate = salesorder.get("date").toDate();
organizationID = organization.get("organization_id");
getsalesorder = zoho.books.getRecordsByID("salesorders","701437914",salesorderID,"zbooks");
salesorder = getsalesorder.get("salesorder");
SO_Map = Map();
SO_Map.put("SO_No",salesorder.get("salesorder_number"));
SO_Map.put("SO_ID",salesorder.get("salesorder_id"));
ItemList = List();
newList = List();
for each  salesitem in salesorder.get("line_items")
{
	datamap = Map();
	datamap.put("Item_Name",salesitem.get("name"));
	datamap.put("Item_ID",salesitem.get("item_id"));
	datamap.put("Item_Quantity",salesitem.get("quantity").round(2));
	datamap.put("Sales_Order_No",salesorder.get("salesorder_number"));
	datamap.put("Sales_Order_Date",salesorder.get("date").toString("MM/dd/yyyy"));
	datamap.put("Sales_Order_ID",salesorder.get("salesorder_id"));
	ItemList.add(datamap);
	itemMap = Map();
	ls = list();
	if(salesitem.get("item_id") != "")
	{
		getItem = zoho.books.getRecordsByID("items","701437914",salesitem.get("item_id"),"zbooks");
		//info getItem ;
		rec = getItem.get("item");
		for each  warehouseDetails in rec.get("warehouses")
		{
			//	info warehouseDetails;
			//	info warehouseDetails.get("warehouse_committed_stock");
			warehouse_map = Map();
			warehouse_map.put("WAREHOUSE_NAME",warehouseDetails.get("warehouse_name"));
			warehouse_map.put("OPENING_STOCK",if(warehouseDetails.get("initial_stock") != null,warehouseDetails.get("initial_stock").round(2),null));
			warehouse_map.put("OPENING_STOCK_VALUE",if(warehouseDetails.get("initial_stock_rate") != null,warehouseDetails.get("initial_stock_rate").round(2),null));
			warehouse_map.put("Stock_on_Hand",if(warehouseDetails.get("warehouse_available_stock") != null,warehouseDetails.get("warehouse_available_stock").round(2),null));
			warehouse_map.put("Committed_Stock",if(warehouseDetails.get("warehouse_committed_stock") != null,warehouseDetails.get("warehouse_committed_stock").round(2),null));
			warehouse_map.put("Available_for_Sale",if(warehouseDetails.get("warehouse_available_for_sale_stock") != null,warehouseDetails.get("warehouse_available_for_sale_stock").round(2),null));
			warehouse_map.put("Actual_Stock_on_Hand",if(warehouseDetails.get("warehouse_actual_available_stock") != null,warehouseDetails.get("warehouse_actual_available_stock").round(2),null));
			warehouse_map.put("Actual_Committed_Stock",if(warehouseDetails.get("warehouse_actual_committed_stock") != null,warehouseDetails.get("warehouse_actual_committed_stock").round(2),null));
			warehouse_map.put("Actual_Available_for_Sale",if(warehouseDetails.get("warehouse_actual_available_for_sale_stock") != null,warehouseDetails.get("warehouse_actual_available_for_sale_stock").round(2),null));
			ls.add(warehouse_map);
		}
		itemMap.put("Warehouse_Stock_Details",ls);
		//item quantity
		quantityResponse = invokeurl
		[
			url :"https://inventory.zoho.com/api/v1/items/" + salesitem.get("item_id") + "/inventorysummary?organization_id=701437914"
			type :GET
			connection:"newinventory"
		];
		itemMap.put("To_be_Shipped",ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_shipped"),0));
		itemMap.put("To_be_Received",ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_received"),0));
		itemMap.put("To_be_Invoiced",ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_invoiced"),0));
		itemMap.put("To_be_Billed",ifNull(quantityResponse.get("inventory_summary").get("qty_to_be_billed"),0));
		//below 4 line code update the Recent transaction against Items
		itemMap.put("Book_Date",salesorder.get("date").toString("MM/dd/yyyy"));
		itemMap.put("Module","SO");
		itemMap.put("Book_Status","Creation");
		itemMap.put("Record_Number",salesorder.get("salesorder_number"));
		for each  creator in rec.get("custom_fields")
		{
			//	info creator.get("label");
			if(creator.get("label") == "Zoho Creator ID")
			{
				//info creator.get("value") ;
				updateDataInCreator = zoho.creator.updateRecord("rbermejo","latin-core-order-management","All_Items",creator.get("value"),itemMap,Map(),"zcreator");
				//	info updateDataInCreator;
			}
		}
	}
}
SO_Map.put("SO_Items",ItemList);
otherparams = Map();
response = zoho.creator.createRecord("rbermejo","latin-core-order-management","SO_New",SO_Map,otherparams,"creator");
info response;
if(response.get("code") == 3002)
{
	errormap = Map();
	errormap.put("Module","SO New");
	errormap.put("Process_Description","SO create in creator");
	errormap.put("In_Data",salesorderID);
	errormap.put("Out_Response",response);
	error_response = zoho.creator.createRecord("rbermejo","latin-core-order-management","Developer_log",errormap,Map(),"creator");
	info error_response;
}
// 	count = count + 1;
// }
// info count;
// 	info zoho.currenttime;
