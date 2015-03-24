var templite = function (id,data){
	var options = {
		openTag:"{{",
		closeTag:"}}"
	};
	var for_flag = false;
	var temp_html = document.getElementById(id).innerHTML;
	var rs = temp_html.split(options.openTag);
	
	// code generation 
	var head = "var _out='';";
	var body = "";
	var foot = "return _out;";
	var add=[ "_out+=","_out"];
	// add code in body
	for(var i in rs){
		var fenzu = rs[i].split(options.closeTag);
		if(fenzu.length==1){
			body += html(fenzu[0]);
		}else{
			body += logic(fenzu[0]);
			body += html(fenzu[1]);
		}
	}
	console.log(body);
	// result : _out += '+str+';
	function html(str){
		return add[0] + "'"+str.replace(/\'/g,"\\'").replace(/[\r\n]/g,"")+"';\n"
	}
	// deal logic code in template 
	function logic(str){
		var shuzu = str.trim().split(" ");
		var first = shuzu.shift();
		var _rs = "";
		if(first=="for"){
			/** to do: validation and index iterator */
			var _bianliang = shuzu[0];
			var _shuju = shuzu[2];
			_rs +=  "for (var i in _data['"+_shuju+"']){\n"+
				"var "+_bianliang+" = _data['"+_shuju+"'][i];\n \
				console.log(wenzhang);\n";
			for_flag=true;
		}else if(first=="endfor"){
			_rs += "}\n";
			for_flag=false;
		}else{
			if(for_flag){
				_rs +=add[0] +str+";\n";
			}else{
				_rs +=add[0]+"_data."+str.trim()+";\n";
			}
			
		}
		return _rs;
	}
	// code concat
	var code = head+body+foot;
	var create = new Function("_data",code);
	// return render function 
	return  create;
}