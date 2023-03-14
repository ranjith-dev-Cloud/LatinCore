
/*
This is a sample function. Uncomment to execute or make changes to this function.
customerID = customer.get("contact_id");
companyName = customer.get("company_name");
organizationID = organization.get("organization_id");
*/
resp = zoho.books.getRecordsByID("contacts","701437914",customer.get("contact_id"),"zbooks");
// info resp ;
customerDetails = resp.get("contact");
// 	info customerDetails ;
customerDetailsMap = Map();
if(customerDetails.get("customer_sub_type") == "business")
{
	customerDetailsMap.put("Customer_Type","Business");
}
else if(customerDetails.get("customer_sub_type") == "individual")
{
	customerDetailsMap.put("Customer_Type","Individual");
}
customerDetailsMap.put("Customer_Name",ifnull(customerDetails.get("first_name"),"") + "" + ifnull(customerDetails.get("last_name"),""));
customerDetailsMap.put("Company_Name",ifnull(customerDetails.get("company_name"),""));
customerDetailsMap.put("Contact_Name",ifnull(customerDetails.get("contact_name"),""));
customerDetailsMap.put("Customer_Email",ifnull(customerDetails.get("email"),""));
customerDetailsMap.put("Mobile",ifnull(customerDetails.get("phone"),null));
customerDetailsMap.put("Customer_Phone",ifnull(customerDetails.get("mobile"),null));
customerDetailsMap.put("Skype_Name_Number",ifnull(customerDetails.get("skype"),""));
customerDetailsMap.put("Designation",ifnull(customerDetails.get("designation"),""));
customerDetailsMap.put("Department",ifnull(customerDetails.get("department"),""));
if(customerDetails.get("website") != null)
{
	newmap = Map();
	newmap.put("value","URL");
	newmap.put("url",customerDetails.get("website"));
	newmap.put("title","URL");
	customerDetailsMap.put("Website",newmap);
}
//Billing Address
if(customerDetails.get("billing_address") != null)
{
	customerDetailsMap.put("Attention",ifnull(customerDetails.get("billing_address").get("attention"),""));
	customerDetailsMap.put("Country",ifnull(customerDetails.get("billing_address").get("country"),""));
	customerDetailsMap.put("Address_Street_1",ifnull(customerDetails.get("billing_address").get("address"),""));
	customerDetailsMap.put("Address_Street_2",ifnull(customerDetails.get("billing_address").get("street2"),""));
	customerDetailsMap.put("City",ifnull(customerDetails.get("billing_address").get("city"),""));
	customerDetailsMap.put("State2",ifnull(customerDetails.get("billing_address").get("state"),null));
	customerDetailsMap.put("Z",ifnull(customerDetails.get("billing_address").get("zip"),""));
	customerDetailsMap.put("Billing_Address_Phone",ifnull(customerDetails.get("billing_address").get("phone"),null));
	customerDetailsMap.put("Fax",ifnull(customerDetails.get("billing_address").get("fax"),""));
}
//Shipping Address
if(customerDetails.get("shipping_address") != null)
{
	customerDetailsMap.put("Attention1",ifnull(customerDetails.get("shipping_address").get("attention"),""));
	customerDetailsMap.put("Shipping_Country",ifnull(customerDetails.get("shipping_address").get("country"),null));
	customerDetailsMap.put("Address_Street_11",ifnull(customerDetails.get("shipping_address").get("address"),""));
	customerDetailsMap.put("Address_Street_21",ifnull(customerDetails.get("shipping_address").get("street2"),""));
	customerDetailsMap.put("City1",ifnull(customerDetails.get("shipping_address").get("city"),""));
	customerDetailsMap.put("Shipping_State",ifnull(customerDetails.get("shipping_address").get("state"),null));
	customerDetailsMap.put("Zip_Code",ifnull(customerDetails.get("shipping_address").get("zip"),""));
	customerDetailsMap.put("Shipping_Address_Phone",ifnull(customerDetails.get("shipping_address").get("phone"),null));
	customerDetailsMap.put("Shipping_Address_Fax",ifnull(customerDetails.get("shipping_address").get("fax"),""));
}
//Other Details
customerDetailsMap.put("Bank_Account_Payment",ifnull(customerDetails.get("bank_accounts"),null));
customerDetailsMap.put("Enable_Portal",ifnull(customerDetails.get("portal_status"),""));
customerDetailsMap.put("Tax_Preference","Taxable");
if(customerDetails.get("tax_name") != null)
{
	customerDetailsMap.put("Tax_Rates1",customerDetails.get("tax_name") + "" + customerDetails.get("tax_percentage").floor());
}
customerDetailsMap.put("Tax_Rates1",customerDetails.get("tax_name"));
if(customerDetails.get("facebook") != null)
{
	fbmap = Map();
	fbmap.put("value","URL");
	fbmap.put("url",customerDetails.get("facebook"));
	fbmap.put("title","URL");
	customerDetailsMap.put("Facebook",fbmap);
}
if(customerDetails.get("twitter") != null)
{
	TwitterMap = Map();
	TwitterMap.put("value","URL");
	TwitterMap.put("url",customerDetails.get("twitter"));
	TwitterMap.put("title","URL");
	customerDetailsMap.put("Twitter",TwitterMap);
}
customerDetailsMap.put("Opening_Balance",ifnull(customerDetails.get("opening_balance_amount"),null));
customerDetailsMap.put("Credit_Limit",ifnull(customerDetails.get("credit_limit"),""));
customerDetailsMap.put("Payment_Terms1",ifnull(customerDetails.get("payment_terms_label"),""));
customerDetailsMap.put("Currencies1",ifnull(customerDetails.get("currency_name_formatted"),""));
customerDetailsMap.put("Zoho_Books_ID",customerDetails.get("contact_id"));
if(customerDetails.get("custom_field_hash").get("cf_zoho_creator_id") != "" && customerDetails.get("custom_field_hash").get("cf_zoho_creator_id") != null)
{
	update_creator = zoho.creator.updateRecord("rbermejo","latin-core-order-management","All_Customers",customerDetails.get("custom_field_hash").get("cf_zoho_creator_id"),customerDetailsMap,Map(),"zcreator");
	// 	info update_creator;
}
else
{
	res_creator = zoho.creator.createRecord("rbermejo","latin-core-order-management","Customers",customerDetailsMap,Map(),"zcreator");
	// 	info res_creator;
	if(res_creator.get("code") == 3000)
	{
		custom_map = Map();
		custom_map.put("label","Zoho Creator ID");
		custom_map.put("value",res_creator.get("data").get("ID"));
		ls = list();
		ls.add(custom_map);
		creator_map = Map();
		creator_map.put("custom_fields",ls);
		update_books = zoho.books.updateRecord("contacts","701437914",customer.get("contact_id"),creator_map,"zbooks");
	}
}
