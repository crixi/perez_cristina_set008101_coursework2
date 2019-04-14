


function decoderot13()
{
	var plain_text = document.getElementById("messagereceivedRot13").value;	
	var cypher_text=[];
	var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	for(var idx=0; idx<plain_text.length; idx ++)
	{
		input = alphabet.indexOf(plain_text[idx]);
		if(input == -1 )
		{			
			cypher_text.push(plain_text[idx]) ;
		}
		else
		{
			var coded = (input+13)%26;
			var letter = alphabet[coded];
			cypher_text.push(letter);
		}		
	}
	document.getElementById("messagedecoderot13").innerHTML = cypher_text.join("");

}

function decodeb64() {
    var plain_text = document.getElementById("messagereceivedB64").value;    
    var coded = btoa("messagereceivedB64");
    var decoded = atob(coded);
    
    document.getElementById("messagedecodeb64").innerHTML = coded;

}