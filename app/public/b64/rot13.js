
function encode()
{
	var plain_text = document.getElementById("message").value;	
	var cypher_text = btoa(plain_text);
	
	
	document.getElementById("message").innerHTML = cypher_text;

}

function decode()
{
	var plain_text = document.getElementById("message").value;	
	var cypher_text = atob(plain_text);
	
	
	document.getElementById("message").innerHTML = cypher_text;

}