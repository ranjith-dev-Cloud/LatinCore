salesorderID = salesorder.get("salesorder_id");
salesorderdate = salesorder.get("date").toDate();
organizationID = organization.get("organization_id");
dc = organization.get("data_center_extension");
bson = Map();
res = invokeurl
[
	url :"https://books.zoho" + dc + "/api/v1/salesorders/" + salesorderID + "?organization_id=" + organizationID
	type :GET
	connection:"invbooks"
];
info res;
pack = res.get("salesorder").get("packages");
info pack;
for each  p in pack
{
	packID = p.get("package_id");
	ms = Map();
	ms.put("delivery_method","Test");
	json = Map();
	json.put("JSONString",ms);
	deleivery = invokeurl
	[
		url :"https://books.zoho" + dc + "/api/v1/shipmentorders?salesorder_id=" + salesorderID + "&package_ids=" + packID + "&organization_id=" + organizationID
		type :POST
		parameters:json
		connection:"invbooks"
	];
	info deleivery;
}
