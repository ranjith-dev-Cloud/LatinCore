void fetchData.getSalesPersonDetails()
{
		salesPersonDetails = invokeurl
		[
			url :"https://www.zohoapis.com/books/v3/users?organization_id=701437914"
			type :GET
			connection:"zohobooks"
		];
		//info salesPersonDetails;
		userDetails = salesPersonDetails.get("users");
		for each  user in userDetails
		{
			salesPerson = insert into Sales_Persons
			[
				Added_User=zoho.loginuser
				Sales_Person=user.get("name")
				Email=user.get("email")
				Zoho_Books_ID=user.get("user_id")
				Status=user.get("status")
				User_Role=user.get("user_role")
				User_Role_ID=user.get("role_id")
			];
		}
	// crmUserDetails = invokeurl
	// [
	// 	url :"https://www.zohoapis.com/crm/v2/users?organization_id=701437914"
	// 	type :GET
	// 	connection:"crmconnection"
	// ];
	// info crmUserDetails;
}