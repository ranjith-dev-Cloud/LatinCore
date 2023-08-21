void DeleteInline.deleteInlineSubformDataSales(int salesID)
{
	// 	SO-25634
	try 
	{
		// 		fetdetails = SO_New[SO_ID == 2089653000064977767];
		fetdetails = Sales_Order_Item[Sales_Order_ID == salesID];
		for each  item in fetdetails
		{
			fetItem = Items[Zoho_Books_ID == item.Item_ID];
			info "Item ID " + fetItem.Zoho_Books_ID;
			quantity = 0;
			for each  iteratesubform in fetItem.Sales_Order_Item
			{
				if(iteratesubform.Sales_Order_ID == salesID)
				{
					info iteratesubform.Sales_Order_No;
					iteratesubform.clear();
					// 	quantity = iteratesubform.Item_Quantity;
				}
			}
			for each  totalcnt in fetItem.Total_Count1
			{
				if(totalcnt.Year_field == item.Sales_Order_Date.getYear().toString())
				{
					totalcnt.Sales_Order_Total_Quantity=totalcnt.Sales_Order_Total_Quantity - item.Item_Quantity;
					totalcnt.Count_Difference=totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
					// 					info "from if " + (totalcnt.Sales_Order_Total_Quantity - item.Item_Quantity);
					// 					info totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
				}
				else if(totalcnt.Year_field == "Overall")
				{
					totalcnt.Sales_Order_Total_Quantity=totalcnt.Sales_Order_Total_Quantity - item.Item_Quantity;
					totalcnt.Count_Difference=totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
					// 					info "from else " + (totalcnt.Sales_Order_Total_Quantity - item.Item_Quantity);
					// 					info totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
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
