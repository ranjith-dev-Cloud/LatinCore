void Inline.addCreditNotesinItems()
{
	try 
	{
		// 		2089653000000235057 2089653000020098160 2089653000035054568
		// 		itemID = 2089653000035054568;
		fetchItemDataID = Items[Zoho_Books_ID != null] range from 2001 to 2100;
		totalcount = 0;
		for each  itemid in fetchItemDataID
		{
			// 			info itemid.Zoho_Books_ID;
			fetchCreditDataID = Credit_Notes_Item1[Item_ID == itemid.Zoho_Books_ID.toString()];
			// 		info fetchCreditDataID.count();
			totalcount = totalcount + 1;
			for each  creditdata in fetchCreditDataID
			{
				creditdata.Item_Creation=true;
				row1 = Items.Credit_Notes();
				row1.Credit_No=creditdata.Credit_No;
				row1.Item_Quantity=creditdata.Item_Quantity;
				row1.Credit_Date=creditdata.Credit_Date;
				row1.Credit_ID=creditdata.Credit_ID;
				col = Collection();
				col.insert(row1);
				itemid.Credit_Notes.insert(col);
				//  row1.insert(col);
			}
			if(fetchCreditDataID.count() > 0)
			{
				itemid.Inline_Credit_Item_creation=true;
			}
		}
		info totalcount;
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Item"
			Process_Description="Credit Notes Inline Subform"
			Out_Response=e.message
		];
	}
}
