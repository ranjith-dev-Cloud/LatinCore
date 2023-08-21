void InlineAutomationAdd.inventoryAddtoInlineItem(int invAdjustID)
{
	/*
	Ranjith M
	17/04/2023
	Used to update the inventory to inline Inventory subform
	*/
	try 
	{
		// 		fetcreditnotesdata = Credit_Notes_Item1[Is_Created != true && CN_New != null] range from 1 to 50;
		fetinvAdjustmentdata = Inventory_Adjustments[Inventory_Adjustments_ID == invAdjustID];
		info fetinvAdjustmentdata.count();
		count = 0;
		// 		info fetItem.Total_Count1.Year_field;
		for each  invAdjustmentDetails in fetinvAdjustmentdata
		{
			info invAdjustmentDetails;
			fetItemDetails = Items[Zoho_Books_ID == invAdjustmentDetails.Item_ID];
			if(invAdjustmentDetails.Is_Created != true)
			{
				row1 = Items.Inventory();
				row1.Inventory_No=invAdjustmentDetails.Inventory_No;
				row1.Quantity_Adjusted=invAdjustmentDetails.Item_Quantity;
				row1.Inventory_Adjustments_Date=invAdjustmentDetails.Inventory_Adjustments_Date;
				row1.Inventory_Adjustments_ID=invAdjustmentDetails.Inventory_Adjustments_ID;
				row1.Value_Adjusted=invAdjustmentDetails.Value_Adjusted;
				col = Collection();
				col.insert(row1);
				fetItemDetails.Inventory.insert(col);
				invAdjustmentDetails.Is_Created=true;
				count = count + 1;
				yr = fetItemDetails.Total_Count1.Year_field;
				if(yr.contains(invAdjustmentDetails.Inventory_Adjustments_Date.getYear().toString()) == false)
				{
					info "Year Created";
					row2 = Items.Total_Count1();
					row2.Year_field=invAdjustmentDetails.Inventory_Adjustments_Date.getYear().toString();
					row2.Purchase_Order_Total_Quantity=0.00;
					row2.Sales_Order_Total_Quantity=0.00;
					row2.Vendor_Credit_Total_Quantity=0.00;
					row2.Credit_Notes_Total_Quantity=0.00;
					row2.Count_Difference=0.00;
					col2 = Collection();
					col2.insert(row2);
					fetItemDetails.Total_Count1.insert(col2);
				}
				if(yr.contains("Overall") == false)
				{
					info "Overall created";
					row3 = Items.Total_Count1();
					row3.Year_field="Overall";
					row3.Purchase_Order_Total_Quantity=0.00;
					row3.Sales_Order_Total_Quantity=0.00;
					row3.Vendor_Credit_Total_Quantity=0.00;
					row3.Credit_Notes_Total_Quantity=0.00;
					row3.Count_Difference=0.00;
					col3 = Collection();
					col3.insert(row3);
					fetItemDetails.Total_Count1.insert(col3);
				}
				fetItem = Items[Zoho_Books_ID == invAdjustmentDetails.Item_ID];
				for each  year in fetItem.Total_Count1
				{
					if(year.Year_field == invAdjustmentDetails.Inventory_Adjustments_Date.getYear().toString())
					{
						year.Inventory_Adjustment_Quantity=year.Inventory_Adjustment_Quantity + invAdjustmentDetails.Item_Quantity;
					}
					else if(year.Year_field == "Overall")
					{
						year.Inventory_Adjustment_Quantity=year.Inventory_Adjustment_Quantity + invAdjustmentDetails.Item_Quantity;
					}
				}
			}
		}
		info count;
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Inventory Adjustment"
			Process_Description="Update Inventory Adjustment Details to Items Inline Subform"
			Out_Response=e.message
		];
	}
}
