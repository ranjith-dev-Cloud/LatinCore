void DeleteInline.deleteInlineSubformDataCreditNotes(int CreditNotesID)
{
	try 
	{
		// 		fetdetails = CN_New[Credit_ID == CreditNotesID];
		fetdetails = Credit_Notes_Item1[Credit_ID == CreditNotesID];
		for each  item in fetdetails
		{
			fetItem = Items[Zoho_Books_ID == item.Item_ID];
			quantity = 0;
			for each  iteratesubform in fetItem.Credit_Notes
			{
				if(iteratesubform.Credit_ID == CreditNotesID)
				{
					info iteratesubform.Credit_No;
					// 				iteratesubform.clear();
					quantity = iteratesubform.Item_Quantity;
				}
			}
			for each  totalcnt in fetItem.Total_Count1
			{
				if(totalcnt.Year_field == item.Credit_Date.getYear().toString())
				{
					// 	totalcnt.Credit_Notes_Total_Quantity = (totalcnt.Credit_Notes_Total_Quantity - item.Item_Quantity);
					// 	totalcnt.Count_Difference = totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity   + totalcnt.Vendor_Credit_Total_Quantity);
					info "from if " + (totalcnt.Credit_Notes_Total_Quantity - item.Item_Quantity);
					info totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity + totalcnt.Vendor_Credit_Total_Quantity);
				}
				else if(totalcnt.Year_field == "Overall")
				{
					// 	totalcnt.Credit_Notes_Total_Quantity = (totalcnt.Credit_Notes_Total_Quantity - item.Item_Quantity);
					// 		totalcnt.Count_Difference = totalcnt.Purchase_Order_Total_Quantity + totalcnt.Credit_Notes_Total_Quantity - (totalcnt.Sales_Order_Total_Quantity   + totalcnt.Vendor_Credit_Total_Quantity);
					info "from else " + (totalcnt.Credit_Notes_Total_Quantity - item.Item_Quantity);
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
