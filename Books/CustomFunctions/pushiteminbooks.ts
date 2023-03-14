
/*
Push data in zoho creator
*/
res = zoho.books.getRecordsByID("items","701437914",item.get("item_id"),"zbooks");
//info res;
item_map = res.get("item");
//info item_map;
data = Map();
data.put("Type_field",if(item_map.get("product_type") == "goods","Goods","Service"));
data.put("Name",item_map.get("name"));
data.put("Unit",item_map.get("unit"));
data.put("SKU",item_map.get("sku"));
data.put("Category",if(item_map.get("category_name") != null,item_map.get("category_name"),""));
data.put("Returnable_Item",item_map.get("is_returnable"));
data.put("Length_field",ifnull(item_map.get("package_details").get("length").round(2),null));
data.put("Width",ifnull(item_map.get("package_details").get("width").round(2),null));
data.put("Height",ifnull(item_map.get("package_details").get("height").round(2),null));
data.put("Weight",ifnull(item_map.get("package_details").get("weight").round(2),null));
data.put("Unit_Weight",item_map.get("package_details").get("weight_unit"));
data.put("Dimention_Unit",item_map.get("package_details").get("dimension_unit"));
data.put("Manufacturer",if(item_map.get("manufacturer") != "",item_map.get("manufacturer"),""));
data.put("Brand",if(item_map.get("brand") != "",item_map.get("brand"),""));
data.put("UPC",ifnull(item_map.get("upc"),null));
data.put("MPN",if(item_map.get("part_number") != "",item_map.get("part_number"),""));
data.put("EAN",ifnull(item_map.get("ean"),null));
data.put("ISBN",if(item_map.get("isbn") != "",item_map.get("isbn"),""));
data.put("Location",if(item_map.get("custom_field_hash").get("cf_location") != "" && item_map.get("custom_field_hash").get("cf_location") != null,item_map.get("custom_field_hash").get("cf_location"),""));
data.put("Best_Before_Date",item_map.get("custom_field_hash").get("cf_best_before_date"));
data.put("Product_Code",if(item_map.get("custom_field_hash").get("cf_product_code") != "",item_map.get("custom_field_hash").get("cf_product_code"),""));
data.put("Selling_Price",ifnull(item_map.get("rate").round(2),null));
data.put("Account",if(item_map.get("account_name") != "",item_map.get("account_name"),""));
data.put("Description",if(item_map.get("description") != "",item_map.get("description"),""));
data.put("Cost_Price",ifnull(item_map.get("purchase_rate").round(2),null));
data.put("Account1",if(item_map.get("purchase_account_name") != "",item_map.get("purchase_account_name"),""));
data.put("Description1",if(item_map.get("purchase_description") != "",item_map.get("purchase_description"),""));
data.put("Tax_Preference",if(item_map.get("is_taxable") == true,"Taxable","Non-Taxable"));
data.put("Exemption_Reason",if(item_map.get("tax_exemption_code") != "",item_map.get("tax_exemption_code"),""));
if(item_map.get("inventory_account_name") != "" && item_map.get("inventory_account_name") != null)
{
	data.put("Track_Inventory_for_this_item",true);
}
if(item_map.get("track_serial_number") == true)
{
	data.put("Advanced_Inventory_Tracking","Track Serial Number");
}
else if(item_map.get("track_batch_number") == true)
{
	data.put("Advanced_Inventory_Tracking","Track Batches");
}
else
{
	data.put("Advanced_Inventory_Tracking","None");
}
data.put("Sales_Information",if(item_map.get("account_name") != null && item_map.get("account_name") != "",true,false));
data.put("Purchase_Information",if(item_map.get("purchase_account_name") != null && item_map.get("purchase_account_name") != "",true,false));
data.put("Inventory_Account",if(item_map.get("inventory_account_name") != "",item_map.get("inventory_account_name"),""));
data.put("Reorder_Point",if(item_map.get("reorder_level") != null,item_map.get("reorder_level").round(2),null));
data.put("Preferred_Vendor",if(item_map.get("vendor_name") != "",item_map.get("vendor_name"),""));
data.put("Zoho_Books_ID",item.get("item_id"));
//info data;
ls = list();
for each  rec in item_map.get("warehouses")
{
	warehouse_map = Map();
	warehouse_map.put("WAREHOUSE_NAME",rec.get("warehouse_name"));
	warehouse_map.put("OPENING_STOCK",if(rec.get("initial_stock") != null,rec.get("initial_stock").round(2),null));
	warehouse_map.put("OPENING_STOCK_VALUE",if(rec.get("initial_stock_rate") != null,rec.get("initial_stock_rate").round(2),null));
	warehouse_map.put("Stock_on_Hand",if(rec.get("warehouse_available_stock") != null,rec.get("warehouse_available_stock").round(2),null));
	warehouse_map.put("Committed_Stock",if(rec.get("warehouse_committed_stock") != null,rec.get("warehouse_committed_stock").round(2),null));
	warehouse_map.put("Available_for_Sale",if(rec.get("warehouse_available_for_sale_stock") != null,rec.get("warehouse_available_for_sale_stock").round(2),null));
	warehouse_map.put("Actual_Stock_on_Hand",if(rec.get("warehouse_actual_available_stock") != null,rec.get("warehouse_actual_available_stock").round(2),null));
	warehouse_map.put("Actual_Committed_Stock",if(rec.get("warehouse_actual_committed_stock") != null,rec.get("warehouse_actual_committed_stock").round(2),null));
	warehouse_map.put("Actual_Available_for_Sale",if(rec.get("warehouse_actual_available_for_sale_stock") != null,rec.get("warehouse_actual_available_for_sale_stock").round(2),null));
	ls.add(warehouse_map);
}
data.put("Warehouse_Stock_Details",ls);
//info data;
if(item_map.get("custom_field_hash").get("cf_zoho_creator_id") != "" && item_map.get("custom_field_hash").get("cf_zoho_creator_id") != null)
{
	// 	info "insideupdate";
	// 	// 	info item_map.get("custom_field_hash").get("cf_zoho_creator_id");
	// 	//info data;
	// 	creatorID = item_map.get("custom_field_hash").get("cf_zoho_creator_id");
	// 	info creatorID;
	// 	update_creator = zoho.creator.updateRecord("rbermejo","latin-core-order-management","All_Items",item_map.get("custom_field_hash").get("cf_zoho_creator_id"),data,Map(),"zcreator");
	updateDataInCreator = zoho.creator.updateRecord("rbermejo","latin-core-order-management","All_Items",item_map.get("custom_field_hash").get("cf_zoho_creator_id"),data,Map(),"zcreator");
	//info updateDataInCreator;
}
else
{
	res_creator = zoho.creator.createRecord("rbermejo","latin-core-order-management","Items",data,Map(),"zcreator");
	info res_creator;
	if(res_creator.get("code") == 3000)
	{
		custom_map = Map();
		custom_map.put("label","Zoho Creator ID");
		custom_map.put("value",res_creator.get("data").get("ID"));
		ls = list();
		ls.add(custom_map);
		creator_map = Map();
		creator_map.put("custom_fields",ls);
		update_books = zoho.books.updateRecord("items","701437914",item.get("item_id"),creator_map,"zbooks");
		// 		info update_books;
	}
}
