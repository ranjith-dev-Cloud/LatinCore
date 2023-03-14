if(input.Tax_Preference == "Taxable" && input.Tax_Preference != "")
{
	show Tax_Rates;
	hide Tax_Exemptions;
	hide Tax_Agency1;
}
else if(input.Tax_Preference == "Tax Exempt" && input.Tax_Preference != "")
{
	hide Tax_Rates;
	show Tax_Exemptions;
	show Tax_Agency1;
}
