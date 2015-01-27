function searchProduct(){
	alert("In searchProduct");
	$.ajax
    ({
        type: "GET",
        url: 'http://api.everlive.com/v1/IMregDJC77R1b1yM/Posts',
        contentType: "application/json",
        success: function(data){

            console.log(JSON.stringify(data.Result));
            
            console.log(JSON.stringify(data.Count));

            var obj = JSON.stringify(data.Result);

            console.log("obj "+obj);

            parseData = JSON.parse(obj);

            console.log("After parsing "+parseData);

            var autocomplete = $("#searchProduct").kendoAutoComplete({
                minLength: 1,
                dataTextField: "Title",
                dataSource: parseData
            }).data("kendoAutoComplete");

            console.log("After autocomplete "+parseData);

        },
        error: function(error){
            alert(JSON.stringify(error));
        }
    })
}