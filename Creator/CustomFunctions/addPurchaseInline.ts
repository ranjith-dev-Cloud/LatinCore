void addPurchaseInline()
{
	// 	fetpurchasedata = Purchase_Order_Item1[ID == 4008259000002474643];
	fetpurchasedata = Purchase_Order_Item1[Is_Created != true && PO_New != null] range from 1 to 500;
	info fetpurchasedata.count();
	count = 0;
	for each  purchaseDetails in fetpurchasedata
	{
		fetItemDetails = Items[Zoho_Books_ID == purchaseDetails.Item_ID];
		if(purchaseDetails.PO_New != null && purchaseDetails.Is_Created != true)
		{
			row1 = Items.Purchase();
			row1.Purchase_Order_No=purchaseDetails.Purchase_Order_No;
			row1.Item_Quantity=purchaseDetails.Item_Quantity;
			row1.Purchase_Order_ID=purchaseDetails.Purchase_Order_ID;
			row1.Purchase_Order_Date=purchaseDetails.Purchase_Order_Date;
			col = Collection();
			col.insert(row1);
			fetItemDetails.Purchase.insert(col);
			purchaseDetails.Is_Created=true;
			count = count + 1;
		}
	}
	info count;
}
