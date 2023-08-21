void InlineAutomationUpdate.vendorUpdateInline(int SOID)
{
	try 
	{
		fetchVC = Vendor_Credit_Item1[Vendor_Credit_ID == 2089653000063434001 && VC_New != null];
		quantity = 0;
		for each  item in fetchVC
		{
			fetchitem = Items[Zoho_Books_ID == item.Item_ID.toString()];
			for each  VendorCreditrec in fetchitem.Vendor_Credit
			{
				if(VendorCreditrec.Vendor_Credit_ID == 2089653000063434001)
				{
					quantity = VendorCreditrec.Item_Quantity;
				}
			}
			if(item.Item_Quantity == quantity)
			{
				// true the new record & delete the existing record
				maketrue = Vendor_Credit_Item1[Vendor_Credit_ID == 2089653000063434001 && Item_ID == 2089653000063434001.toString() && Item_Creation != null];
				maketrue.Item_Creation=true;
				// 						delete from Sales_Order_Item [ Vendor_Credit_ID == && Item_ID ==  &&  VC_New!= null];
			}
			else
			{
				//iterate the total count and update the item quantity with total count as well
				yr = fetchitem.Total_Count1.Year_field;
				if(yr.contains(item.Vendor_Credit_Date.getYear().toString()) == false)
				{
					info "Year Created";
					row2 = Items.Total_Count1();
					row2.Year_field=item.Vendor_Credit_Date.getYear().toString();
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
					if(year.Year_field == item.Vendor_Credit_Date.getYear().toString())
					{
						year.Vendor_Credit_Total_Quantity=year.Vendor_Credit_Total_Quantity + item.Item_Quantity;
						year.Count_Difference=year.Purchase_Order_Total_Quantity + year.Credit_Notes_Total_Quantity - (year.Sales_Order_Total_Quantity + year.Vendor_Credit_Total_Quantity);
						// 						 info  yr.Sales_Order_Total_Quantity + salesDetails.Item_Quantity ;
					}
					else if(year.Year_field == "Overall")
					{
						year.Vendor_Credit_Total_Quantity=year.Vendor_Credit_Total_Quantity + item.Item_Quantity;
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
