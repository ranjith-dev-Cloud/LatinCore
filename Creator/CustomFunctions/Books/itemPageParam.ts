void Books.itemPageParam(int strt, int end, String year, String Itemname, String SKU)
{
	try 
	{
		fetTotalItem = Items[ID != null];
		// 			info "Total Count " + fetTotalItem.count();
		Itemname = Itemname.toString();
		SKU = SKU.toString();
		if(end + 100 > fetTotalItem.count())
		{
			if(Itemname == "" && SKU == "")
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + strt + "&end=" + end + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=No&NO=No","same window");
			}
			else if(Itemname != "" && SKU == "")
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + strt + "&end=" + end + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=Yes&NO=No","same window");
			}
			else if(Itemname == "" && SKU != "")
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + strt + "&end=" + end + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=No&NO=Yes","same window");
			}
			else if(Itemname != "" && SKU != "" && Itemname != "undefined" && SKU != "undefined")
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + strt + "&end=" + end + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=Yes&NO=Yes","same window");
			}
			else
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + strt + "&end=" + end + "&year=" + year + "&ItemName=&SKU=&YES=No&NO=No","same window");
			}
			// 		openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + strt + "&end=" + end + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU,"same window");
		}
		else
		{
			Itemfrom = end + 1;
			Itemto = end + 200;
			if(Itemname == "" && SKU == "")
			{
				// 			 openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year+ "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=No&NO=No" ,"same window");
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year + "&ItemName=&SKU=&YES=No&NO=No","same window");
			}
			else if(Itemname != "" && SKU == "")
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=Yes&NO=No","same window");
			}
			else if(Itemname == "" && SKU != "")
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=No&NO=Yes","same window");
			}
			//info
			else if(Itemname != "" && SKU != "" && Itemname != "undefined" && SKU != "undefined")
			{
				// 				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year + "&ItemName=&SKU=&YES=Yes&NO=Yes","same window");
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year + "&ItemName=" + Itemname + "&SKU=" + SKU + "&YES=Yes&NO=Yes","same window");
			}
			else
			{
				openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year + "&ItemName=&SKU=&YES=No&NO=No","same window");
			}
			// 		openUrl("https://creatorapp.zoho.com/rbermejo/latin-core-order-management/#Page:Items_Page?strt=" + Itemfrom + "&end=" + Itemto + "&year=" + year+ "&ItemName=" + Itemname + "&SKU=" + SKU,"same window");
			//thisapp.Books.itemPageParam(0,0,input.Item_Year.year_field,input.Item_Name.Name,input.SKU,"Yes","Yes");
		}
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Page Param"
			Process_Description="append a paramter and open a openurl in item page(Front Page)"
			Out_Response=e.message
		];
	}
}
