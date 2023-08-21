void Inline.createTotalQuantityofEachItems()
{
	try 
	{
		fetItemID = Items[ID != null && Total_Creation == false] range from 10 to 10;
		// 		var = 2089653000010752429;
		// 		fetItemID = Items[Zoho_Books_ID == var.toString()];
		// 		itemRecID = 4008259000000374383;
		// 		fetItemID = Items[ID == itemRecID];
		for each  item in fetItemID
		{
			dataMap = Map();
			yearlist = List();
			info item.ID;
			for each  year in item.Sales_Order_Item.Sales_Order_Date
			{
				yearlist.add(toDate(year).getYear());
			}
			for each  year in item.Purchase.Purchase_Order_Date
			{
				yearlist.add(toDate(year).getYear());
			}
			for each  year in item.Vendor_Credit.Vendor_Credit_Date
			{
				yearlist.add(toDate(year).getYear());
			}
			for each  year in item.Credit_Notes.Credit_Date
			{
				yearlist.add(toDate(year).getYear());
			}
			for each  year in item.Inventory.Inventory_Adjustments_Date
			{
				yearlist.add(toDate(year).getYear());
			}
			info yearlist.distinct();
			dataMap.put("Years",yearlist.distinct());
			OverallSales = 0;
			Overallpurchase = 0;
			OverallVendor = 0;
			OverallCredit = 0;
			OverallInventory = 0;
			OvrallTotaldiff = 0;
			for each  ele in yearlist.distinct()
			{
				Totaldiff = 0;
				salesTotal = 0;
				for each  item2 in item.Sales_Order_Item
				{
					if(ele == toDate(item2.Sales_Order_Date).getYear())
					{
						salesTotal = salesTotal + item2.Item_Quantity;
						OverallSales = OverallSales + item2.Item_Quantity;
					}
				}
				// 				info "Sales Total " + ele + " " + salesTotal;
				purchaseTotal = 0;
				for each  item3 in item.Purchase
				{
					if(ele == toDate(item3.Purchase_Order_Date).getYear())
					{
						purchaseTotal = purchaseTotal + item3.Item_Quantity;
						Overallpurchase = Overallpurchase + item3.Item_Quantity;
					}
				}
				// 				info "Purchase Total " + ele + " " + purchaseTotal;
				VendorTotal = 0;
				for each  item4 in item.Vendor_Credit
				{
					if(ele == toDate(item4.Vendor_Credit_Date).getYear())
					{
						VendorTotal = VendorTotal + item4.Item_Quantity;
						OverallVendor = OverallVendor + item4.Item_Quantity;
					}
				}
				// 				info "Vendor Total " + ele + " " + VendorTotal;
				CreditTotal = 0;
				for each  item5 in item.Credit_Notes
				{
					if(ele == toDate(item5.Credit_Date).getYear())
					{
						CreditTotal = CreditTotal + item5.Item_Quantity;
						OverallCredit = OverallCredit + item5.Item_Quantity;
					}
				}
				// 				info "Credit Total " + ele + " " + CreditTotal; 
				InventoryTotal = 0;
				for each  item6 in item.Inventory
				{
					if(ele == toDate(item6.Inventory_Adjustments_Date).getYear())
					{
						InventoryTotal = InventoryTotal + ifNull(item6.Quantity_Adjusted,0);
						OverallInventory = OverallInventory + ifNull(item6.Quantity_Adjusted,0);
					}
				}
				Totaldiff = purchaseTotal + CreditTotal - (salesTotal + VendorTotal);
				row1 = Items.Total_Count1();
				row1.Year_field=ele;
				row1.Purchase_Order_Total_Quantity=purchaseTotal;
				row1.Sales_Order_Total_Quantity=salesTotal;
				row1.Vendor_Credit_Total_Quantity=VendorTotal;
				row1.Credit_Notes_Total_Quantity=CreditTotal;
				row1.Inventory_Adjustment_Quantity=InventoryTotal;
				row1.Count_Difference=Totaldiff;
				col = Collection();
				col.insert(row1);
				item.Total_Count1.insert(col);
				salesTotal = 0;
				purchaseTotal = 0;
				VendorTotal = 0;
				CreditTotal = 0;
				InventoryTotal = 0;
				Totaldiff = 0;
			}
			// year loop exit
			OvrallTotaldiff = Overallpurchase + OverallCredit - (OverallSales + OverallVendor);
			row2 = Items.Total_Count1();
			row2.Year_field="Overall";
			row2.Purchase_Order_Total_Quantity=Overallpurchase;
			row2.Sales_Order_Total_Quantity=OverallSales;
			row2.Vendor_Credit_Total_Quantity=OverallVendor;
			row2.Credit_Notes_Total_Quantity=OverallCredit;
			row2.Inventory_Adjustment_Quantity=OverallInventory;
			row2.Count_Difference=OvrallTotaldiff;
			col2 = Collection();
			col2.insert(row2);
			item.Total_Count1.insert(col2);
			OverallSales = 0;
			Overallpurchase = 0;
			OverallVendor = 0;
			OverallCredit = 0;
			OverallInventory = 0;
			item.Total_Creation=true;
		}
	}
	catch (e)
	{
		errorLog = insert into Developer_log
		[
			Added_User=zoho.loginuser
			Module="Items - Total Count"
			Process_Description="Update Total count data to All Items"
			Out_Response=e.message
		];
	}
}
