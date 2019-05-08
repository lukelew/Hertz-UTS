<?php
	if ( !function_exists('json_decode') ){ 
		function json_decode($json) 
		{  
		    // Author: walidator.info 2009 
		    $comment = false; 
		    $out = '$x='; 

		    for ($i=0; $i<strlen($json); $i++) 
		    { 
		        if (!$comment) 
		        { 
		            if ($json[$i] == '{' || $json[$i] == '[')        $out .= ' array('; 
		            else if ($json[$i] == '}' || $json[$i] == ']')    $out .= ')'; 
		            else if ($json[$i] == ':')    $out .= '=>'; 
		            else                         $out .= $json[$i];            
		        } 
		        else $out .= $json[$i]; 
		        if ($json[$i] == '"')    $comment = !$comment; 
		    } 
		    eval($out . ';'); 
		    return $x; 
		}  
	}
?>