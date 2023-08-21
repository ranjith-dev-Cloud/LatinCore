void InlineAutomationAdd.creditNotesAddtoInline(int creditNotesID)
{
	try 
	{
		// 				fetcreditnotesdata = Credit_Notes_Item1[Is_Created != true && CN_New != null] range from 1 to 50;
		fetcreditnotesdata = Credit_Notes_Item1[Credit_ID == creditNotesID];
		info fetcreditnotesdata.count();
		count = 0;
		// 		info fetItem.Total_Count1.Year_field;
		for each  creditNotesDetails in fetcreditnotesdata
		{
			info creditNotesDetails;
			fetItemDetails = Items[Zoho_Books_ID == creditNotesDetails.Item_ID];
			if(creditNotesDetails.CN_New != null && creditNotesDetails.Is_Created != true)
			{
				row1 = Items.Credit_Notes();
				row1.Credit_No=creditNotesDetails.Credit_No;
				row1.Item_Quantity=creditNotesDetails.Item_Quantity;
				row1.Credit_Date=creditNotesDetails.Credit_Date;
				row1.Credit_ID=creditNotesDetails.Credit_ID;
				col = Collection();
				col.insert(row1);
				fetItemDetails.Credit_Notes.insert(col);
				creditNotesDetails.Is_Created=true;
				count = count + 1;
				yr = fetItemDetails.Total_Count1.Year_field;
				if(yr.contains(creditNotesDetails.Credit_Date.getYear().toString()) == false)
				{
					info "Year Created";
					row2 = Items.Total_Count1();
					row2.Year_field=creditNotesDetails.Credit_Date.getYear().toString();
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
				fetItem = Items[Zoho_Books_ID == creditNotesDetails.Item_ID];
				for each  year in fetItem.Total_Count1
				{
					if(year.Year_field == creditNotesDetails.Credit_Date.getYear().toString())
					{
						year.Credit_Notes_Total_Quantity=year.Credit_Notes_Total_Quantity + creditNotesDetails.Item_Quantity;
						year.Count_Difference=year.Purchase_Order_Total_Quantity + year.Credit_Notes_Total_Quantity - (year.Sales_Order_Total_Quantity + year.Vendor_Credit_Total_Quantity);
						// 						 info  yr.Sales_Order_Total_Quantity + salesDetails.Item_Quantity ;
					}
					else if(year.Year_field == "Overall")
					{
						year.Credit_Notes_Total_Quantity=year.Credit_Notes_Total_Quantity + creditNotesDetails.Item_Quantity;
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
			Module="Credit Notes"
			Process_Description="Update Credit Notes Item Details to Items Inline Subform"
			Out_Response=e.message
		];
	}
}
