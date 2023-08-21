void fetchData.createSONew(list SORecIDs)
{
	/*
	Ranjith M
	14/06/2023
	*/
	try 
	{
		//  	testvar = {2089653000069316248,2089653000069340747};
		count = 0;
		for each  eachItem in SORecIDs
		{
			salesorderID = eachItem;
			getsalesorder = zoho.books.getRecordsByID("salesorders","701437914",salesorderID,"zohobooks");
			salesorder1 = getsalesorder.get("salesorder");
			SO_Map = Map();
			SO_Map.put("SO_No",salesorder1.get("salesorder_number"));
			SO_Map.put("SO_ID",salesorder1.get("salesorder_id"));
			addSONewRecord = insert into SO_New
			[
				Added_User=zoho.loginuser
				SO_ID=salesorder1.get("salesorder_id")
				SO_No=salesorder1.get("salesorder_number")
			];
			fetchSONew = SO_New[ID == addSONewRecord];
			for each  salesitem in salesorder1.get("line_items")
			{
				row1 = SO_New.SO_Items();
				row1.Item_Name=salesitem.get("name");
				row1.Item_ID=salesitem.get("item_id");
				row1.Item_Quantity=salesitem.get("quantity").round(2);
				row1.Sales_Order_No=salesorder1.get("salesorder_number");
				row1.Sales_Order_Date=salesorder1.get("date").toString("MM/dd/yyyy");
				row1.Sales_Order_ID=salesorder1.get("salesorder_id");
				col = Collection();
				col.insert(row1);
				fetchSONew.SO_Items.insert(col);
				if(salesitem.get("item_id") != "")
				{
					getItem = zoho.books.getRecordsByID("items","701437914",salesitem.get("item_id"),"zohobooks");
					//info getItem ;
					rec = getItem.get("item");
					warehouse_map = Map();
					for each  warehouseDetails in rec.get("warehouses")
					{
						warehouse_map.put("WAREHOUSE_NAME",warehouseDetails.get("warehouse_name"));
						warehouse_map.put("OPENING_STOCK",if(warehouseDetails.get("initial_stock") != null,warehouseDetails.get("initial_stock").round(2),null));
						warehouse_map.put("OPENING_STOCK_VALUE",if(warehouseDetails.get("initial_stock_rate") != null,warehouseDetails.get("initial_stock_rate").round(2),null));
						warehouse_map.put("Stock_on_Hand",if(warehouseDetails.get("warehouse_available_stock") != null,warehouseDetails.get("warehouse_available_stock").round(2),null));
						warehouse_map.put("Committed_Stock",if(warehouseDetails.get("warehouse_committed_stock") != null,warehouseDetails.get("warehouse_committed_stock").round(2),null));
						warehouse_map.put("Available_for_Sale",if(warehouseDetails.get("warehouse_available_for_sale_stock") != null,warehouseDetails.get("warehouse_available_for_sale_stock").round(2),null));
						warehouse_map.put("Actual_Stock_on_Hand",if(warehouseDetails.get("warehouse_actual_available_stock") != null,warehouseDetails.get("warehouse_actual_available_stock").round(2),null));
						warehouse_map.put("Actual_Committed_Stock",if(warehouseDetails.get("warehouse_actual_committed_stock") != null,warehouseDetails.get("warehouse_actual_committed_stock").round(2),null));
						warehouse_map.put("Actual_Available_for_Sale",if(warehouseDetails.get("warehouse_actual_available_for_sale_stock") != null,warehouseDetails.get("warehouse_actual_available_for_sale_stock").round(2),null));
					}
					// 				info "WarehouseMap " + warehouse_map;
					//WarehouseMap {"WAREHOUSE_NAME":"Latin Core Inc","OPENING_STOCK":0.00,"OPENING_STOCK_VALUE":0.00,"Stock_on_Hand":-18194.37,"Committed_Stock":572.14,"Available_for_Sale":-18766.50,"Actual_Stock_on_Hand":-18245.56,"Actual_Committed_Stock":560.44,"Actual_Available_for_Sale":-18806.00}
					info "sep " + warehouse_map.get("Committed_Stock");
					for each  creator in rec.get("custom_fields")
					{
						//	info creator.get("label");
						if(creator.get("label") == "Zoho Creator ID")
						{
							fetchItem = Items[Zoho_Books_ID == creator.get("label")];
							row2 = Items.Warehouse_Stock_Details();
							row2.WAREHOUSE_NAME=warehouse_map.get("WAREHOUSE_NAME");
							row2.OPENING_STOCK=warehouse_map.get("OPENING_STOCK");
							row2.OPENING_STOCK_VALUE=warehouse_map.get("OPENING_STOCK_VALUE");
							row2.Stock_on_Hand=warehouse_map.get("Stock_on_Hand");
							row2.Committed_Stock=warehouse_map.get("Committed_Stock");
							row2.Available_for_Sale=warehouse_map.get("Available_for_Sale");
							row2.Actual_Stock_on_Hand=warehouse_map.get("Actual_Stock_on_Hand");
							row2.Actual_Committed_Stock=warehouse_map.get("Actual_Committed_Stock");
							row2.Actual_Available_for_Sale=warehouse_map.get("Actual_Available_for_Sale");
							col2 = Collection();
							col2.insert(row2);
							fetchItem.Warehouse_Stock_Details.insert(col2);
						}
					}
				}
			}
		}
	}
	catch (e)
	{
		inserterror = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="SO NEW "
			Process_Description="SO Create in Creator"
			Out_Response=e.message
		];
	}
}
