%params = ();
$queryString = $ENV{"QUERY_STRING"};
@keyValuePairs = split(/\&/, $queryString);
foreach my $keyValuePair (@keyValuePairs) {
	($key, $value) = split(/\=/, $keyValuePair);
	# URL decode the key
	$key =~ s/%([a-f0-9]{2})/chr(hex($1))/eig;
	# URL decode the value
	$value =~ s/%([a-f0-9]{2})/chr(hex($1))/eig;
	$params{$key} = $value;
}
print "Content-Type: text/plain\n";
print "\n";
print "GET Parameters:\n";
foreach my $parameterName (keys %params) {
	print $parameterName." => ".$params{$parameterName}."\n";
}