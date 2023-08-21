void InlineAutomationAdd.salesAddtoInline(int salesOrdID)
{

	//sales Inline update
	try 
	{
		// 				fetsalesdata = Sales_Order_Item[Is_Created != true && SO_New != null] range from 1 to 50;
		fetsalesdata = Sales_Order_Item[Sales_Order_ID == salesOrdID];
		info fetsalesdata.count();
		count = 0;
		// 		info fetItem.Total_Count1.Year_field;
		for each  salesDetails in fetsalesdata
		{
			info salesDetails;
			fetItemDetails = Items[Zoho_Books_ID == salesDetails.Item_ID];
			if(salesDetails.SO_New != null && salesDetails.Is_Created != true)
			{
				row1 = Items.Sales_Order_Item();
				row1.Sales_Order_No=salesDetails.Sales_Order_No;
				row1.Item_Quantity=salesDetails.Item_Quantity;
				row1.Sales_Order_Date=salesDetails.Sales_Order_Date;
				row1.Sales_Order_ID=salesDetails.Sales_Order_ID;
				col = Collection();
				col.insert(row1);
				fetItemDetails.Sales_Order_Item.insert(col);
				salesDetails.Is_Created=true;
				count = count + 1;
				yr = fetItemDetails.Total_Count1.Year_field;
				if(yr.contains(salesDetails.Sales_Order_Date.getYear().toString()) == false)
				{
					info "Year Created";
					row2 = Items.Total_Count1();
					row2.Year_field=salesDetails.Sales_Order_Date.getYear().toString();
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
				fetItem = Items[Zoho_Books_ID == salesDetails.Item_ID];
				for each  year in fetItem.Total_Count1
				{
					if(year.Year_field == salesDetails.Sales_Order_Date.getYear().toString())
					{
						year.Sales_Order_Total_Quantity=year.Sales_Order_Total_Quantity + salesDetails.Item_Quantity;
						year.Count_Difference=year.Purchase_Order_Total_Quantity + year.Credit_Notes_Total_Quantity - (year.Sales_Order_Total_Quantity + year.Vendor_Credit_Total_Quantity);
						// 						 info  yr.Sales_Order_Total_Quantity + salesDetails.Item_Quantity ;
					}
					else if(year.Year_field == "Overall")
					{
						year.Sales_Order_Total_Quantity=year.Sales_Order_Total_Quantity + salesDetails.Item_Quantity;
						year.Count_Difference=year.Purchase_Order_Total_Quantity + year.Credit_Notes_Total_Quantity - (year.Sales_Order_Total_Quantity + year.Vendor_Credit_Total_Quantity);
						// 					   info  yr.Sales_Order_Total_Quantity + salesDetails.Item_Quantity ;
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
			Module="Sales Order"
			Process_Description="Add Sales Order Item Details to Items Inline Subform"
			Out_Response=e.message
		];
	}
}
