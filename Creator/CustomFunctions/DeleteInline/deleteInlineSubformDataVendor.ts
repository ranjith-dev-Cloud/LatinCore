void DeleteInline.deleteInlineSubformDataVendor(int vendorID)
{
	try 
	{
		// 		fetdetails = VC_New[Vendor_Credit_ID == vendorID];
		fetdetails = Vendor_Credit_Item1[Vendor_Credit_ID == vendorID];
		for each  item in fetdetails
		{
			fetItem = Items[Zoho_Books_ID == item.Item_ID];
			quantity = 0;
			for each  iteratesubform in fetItem.Vendor_Credit
			{
				if(iteratesubform.Vendor_Credit_ID == vendorID)
				{
					info iteratesubform.Vendor_Credit_No;
					// 				iteratesubform.clear();
					quantity = iteratesubform.Item_Quantity;
				}
			}
			for each  totalcnt in fetItem.Total_Count1
			{
				if(totalcnt.Year_field == item.Vendor_Credit_Date.getYear().toString())
				{
					// 	totalcnt.Vendor_Credit_Total_Quantity = (totalcnt.Vendor_Credit_Total_Quantity - item.Item_Quantity);
					// 	totalcnt.Count_Difference = totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity  + totalcnt.Vendor_Credit_Total_Quantity);
					info "from if " + (totalcnt.Vendor_Credit_Total_Quantity - item.Item_Quantity);
					info totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
				}
				else if(totalcnt.Year_field == "Overall")
				{
					// 	totalcnt.Vendor_Credit_Total_Quantity = totalcnt.Vendor_Credit_Total_Quantity + item.Item_Quantity;
					// 	totalcnt.Count_Difference = totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity  + totalcnt.Vendor_Credit_Total_Quantity);
					info "from else " + (totalcnt.Vendor_Credit_Total_Quantity - item.Item_Quantity);
					info totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
				}
			}
		}
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="SO New - Delete function"
			Process_Description="Delete Inline Subformdata when SO New is deleted"
			Out_Response=e.message
		];
	}
}
