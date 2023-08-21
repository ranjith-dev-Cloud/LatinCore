void Books.itemPageBackParam(int strt, int end, String year, String ItemName, String SKU)
{
	try 
	{
		if(strt == 1 && end == 200)
		{
			openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=1&end=200&year=" + year,"same window");
		}
		else
		{
			Itemfrom = strt - 200;
			Itemto = end - 200;
			openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year,"same window");
		}
		// 		if(strt == 1 && end == 200 && (ItemName == "" || SKU == ""))
		// 		{
		// 			openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=1&end=200&year=" + year,"same window");
		// 		}
		// 		else if(ItemName == "" || SKU == "")
		// 		{
		// 			Itemfrom = strt - 200;
		// 			Itemto = end - 200;
		// 			openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year,"same window");
		// 		}
		// 		if(ItemName != ""){
		// 			openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=1&end=200&year=" + year + "&ItemName=" + ItemName,"same window");
		// 		}
		// 		else{
		// 			openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=1&end=200&year=" + year + "&ItemName=&SKU=" + SKU,"same window");
		// 		}
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Item Page"
			Process_Description="Pass a parameter and open a Item Page function"
			Out_Response=e.message
		];
	}
}
