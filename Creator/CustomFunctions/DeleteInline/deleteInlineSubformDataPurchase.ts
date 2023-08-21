void DeleteInline.deleteInlineSubformDataPurchase(int purchaseID)
{
	try 
	{
		// 		fetdetails = PO_New[PO_ID == purchaseID];
		fetdetails = Purchase_Order_Item1[Purchase_Order_ID == purchaseID];
		for each  item in fetdetails
		{
			fetItem = Items[Zoho_Books_ID == item.Item_ID];
			quantity = 0;
			for each  iteratesubform in fetItem.Purchase
			{
				if(iteratesubform.Purchase_Order_ID == purchaseID)
				{
					info iteratesubform.Purchase_Order_No;
					// 				iteratesubform.clear();
					quantity = iteratesubform.Item_Quantity;
				}
			}
			for each  totalcnt in fetItem.Total_Count1
			{
				if(totalcnt.Year_field == item.Purchase_Order_Date.getYear().toString())
				{
					// 	totalcnt.Purchase_Order_Total_Quantity = (totalcnt.Purchase_Order_Total_Quantity - item.Item_Quantity);
					//  totalcnt.Count_Difference = totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
					info "from if " + (totalcnt.Purchase_Order_Total_Quantity - item.Item_Quantity);
					info totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
				}
				else if(totalcnt.Year_field == "Overall")
				{
					// 	totalcnt.Purchase_Order_Total_Quantity = (totalcnt.Purchase_Order_Total_Quantity - item.Item_Quantity);
					// 	totalcnt.Count_Difference = totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
					info "from else " + (totalcnt.Purchase_Order_Total_Quantity - item.Item_Quantity);
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
