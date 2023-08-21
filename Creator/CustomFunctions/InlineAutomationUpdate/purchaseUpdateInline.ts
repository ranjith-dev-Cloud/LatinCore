void InlineAutomationUpdate.purchaseUpdateInline(int POID)
{
	try 
	{
		fetchPO = Purchase_Order_Item1[Purchase_Order_ID == POID && PO_New != null];
		quantity = 0;
		for each  item in fetchPO
		{
			fetchitem = Items[Zoho_Books_ID == item.Item_ID.toString()];
			for each  purchaserec in fetchitem.Purchase
			{
				if(purchaserec.Purchase_Order_ID == POID)
				{
					quantity = purchaserec.Item_Quantity;
				}
			}
			if(item.Item_Quantity == quantity)
			{
				// true the new record & delete the existing record
				maketrue = Purchase_Order_Item1[Purchase_Order_ID == POID && Item_ID == item.Item_ID.toString() && Is_Created != null];
				maketrue.Is_Created=true;
				// 						delete from Sales_Order_Item [ Purchase_Order_ID == POID && Item_ID == item.Item_ID.toString() &&  PO_New!= null];
			}
			else
			{
				//iterate the total count and update the item quantity with total count as well
				yr = fetchitem.Total_Count1.Year_field;
				if(yr.contains(item.Purchase_Order_Date.getYear().toString()) == false)
				{
					info "Year Created";
					row2 = Items.Total_Count1();
					row2.Year_field=item.Purchase_Order_Date.getYear().toString();
					row2.Purchase_Order_Total_Quantity=0.00;
					row2.Sales_Order_Total_Quantity=0.00;
					row2.Vendor_Credit_Total_Quantity=0.00;
					row2.Credit_Notes_Total_Quantity=0.00;
					row2.Count_Difference=0.00;
					col2 = Collection();
					col2.insert(row2);
					fetchitem.Total_Count1.insert(col2);
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
					fetchitem.Total_Count1.insert(col3);
				}
				fetItem = Items[Zoho_Books_ID == item.Item_ID];
				for each  year in fetItem.Total_Count1
				{
					if(year.Year_field == item.Purchase_Order_Date.getYear().toString())
					{
						year.Purchase_Order_Total_Quantity=year.Purchase_Order_Total_Quantity + item.Item_Quantity;
						year.Count_Difference=year.Purchase_Order_Total_Quantity + year.Credit_Notes_Total_Quantity - (year.Sales_Order_Total_Quantity + year.Vendor_Credit_Total_Quantity);
						// 						 info  yr.Sales_Order_Total_Quantity + salesDetails.Item_Quantity ;
					}
					else if(year.Year_field == "Overall")
					{
						year.Purchase_Order_Total_Quantity=year.Purchase_Order_Total_Quantity + item.Item_Quantity;
						year.Count_Difference=year.Purchase_Order_Total_Quantity + year.Credit_Notes_Total_Quantity - (year.Sales_Order_Total_Quantity + year.Vendor_Credit_Total_Quantity);
						// 					   info  yr.Sales_Order_Total_Quantity + salesDetails.Item_Quantity ;
					}
				}
			}
		}
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="SO New"
			Process_Description="Update Sales Order Item Details to Items Inline Subform"
			Out_Response=e.message
		];
	}
}
