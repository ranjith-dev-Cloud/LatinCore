salesorderID = salesorder.get("salesorder_id");
salesorderdate = salesorder.get("date").toDate();
organizationID = organization.get("organization_id");
GetsalesCreator = zoho.creator.getRecords("rbermejo","latin-core-order-management","SO_New_Report","SO_ID==" + salesorder.get("salesorder_id"),1,10,"creator");
//info GetsalesCreator ;
for each  creatordata in GetsalesCreator.get("data")
{
	rec = creatordata.get("ID");
	deleteRecord = invokeurl
	[
		url :"https://creator.zoho.com/api/v2/rbermejo/latin-core-order-management/report/SO_New_Report/" + rec
		type :DELETE
		connection:"creator"
	];
}
