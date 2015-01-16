/**
 * Created by mkale on 14/11/2014.*/



function savePost() {

    //alert('in save post...');

    var savePostDS = new kendo.data.DataSource({
        type: 'everlive',
        transport: {
            // Required by Backend Services
            create: {
                url: "http://api.everlive.com/v1/IMregDJC77R1b1yM/PostX",
                type: "POST",
                dataType: "json"
            }
        },

        schema: {
            model: {
                id: "ID",
                fields: {
                    Title:{
                        type:"string"
                    },
                    PostCategory:{
                        type:"string"
                    },
                    Description:{
                        type:"string"
                    },
                    SaleEndDate:{
                        type:"date"
                    },
                    Picture:{
                        type:"file"
                    },
                    Location:{
                        type:"GeoPoint"
                    },
                    LocationName:{
                        type:"string"
                    },
                    Price:{
                        type:"string"
                    },
                    ItemCategory:{
                        type:"string"
                    }

                }
            }//end of model
        }//end of schema
    });//end of data source

    var latti = $("#lattitude").val();
    var longi = $("#longitude").val();
    
    console.log('latti is : '+latti);
    console.log('longi is : '+longi);
    
    var latNumber = Number(latti);
    var longiNumber = Number(longi);
    console.log('IN JS lat fetched in number : ' +latNumber);
    console.log('IN JS longi fetched in number : ' +longiNumber);

    var location = new Everlive.GeoPoint(longiNumber,latNumber);
    console.log('location: lat : '+location.latitude);
    console.log('location: long : '+location.longitude);

    var itemsToInsert = {
        Title:$('#postTitle').val(),
        ItemCategory:$('#postCategory').val(),
        Description:$('#postDescription').val(),
        SaleEndDate:$('#saleEndDate').val(),
        Picture:$('#postPicture').val(),
        Location: location,
        LocationName:$('#postLocation').val(),
        Price:$('#postPrice').val()
        //User_id: Users().currentUser.id
    };

    savePostDS.add(itemsToInsert);
    savePostDS.sync();

    $('#postTitle').val('');
    $('#postCategory').val('');
    $('#postDescription').val('');
    $('#saleEndDate').val('');
    $('#postPicture').val('');
    $('#postLocation').val('');
    $('#postPrice').val('');

    console.log("Datasourse sync successfully");

}//end of function

function getDetails()
{

    $.ajax({
        type: "GET",
        url: 'http://api.everlive.com/v1/IMregDJC77R1b1yM/Files',
        contentType: "application/json",
        success: function(data){

            var lastId;
            var fileId;
            console.log(JSON.stringify(data.Result));
            alert(JSON.stringify(data.Result));
            console.log(JSON.stringify(data.Count));

            var obj = JSON.stringify(data.Result);

            console.log("obj "+obj);

            parseData = JSON.parse(obj);

            console.log("After parsing "+parseData);
            console.log("After parsing length is "+((parseData.length)+1));

            for(i=0; i<parseData.length; i++)
            {
                //var fileId  = parseData[i];
                lastId = parseData[i].Id;
                console.log("After parsing "+parseData[i].Id);
                //index = (parseData.length);
                //console.log("Last ID "+index-1);
                //console.log("Last ID "+((parseData.length)-1));
            }
        

            var contentData = el.data('PostX');
            var query = new Everlive.Query();
            query.select('Id');
            contentData.get(query) // filter
            .then(function(data){
                alert(JSON.stringify(data));
                
                for(i=0; i<data.result.length; i++)
                {
                    fileId = data.result[i].Id;
                }

                console.log("Last ID "+lastId);
                console.log("contentData "+fileId);

            // Code Of Association Here

            var item = {
                Id: fileId,
                'Picture': lastId
            };

            var associateData = el.data('PostX');
            
            associateData.updateSingle(item,
                function(data){
                    alert(JSON.stringify(data));
                },
                function(error){
                    alert(JSON.stringify(error));
                });
            },
                function(error){
                        alert(JSON.stringify(error));
                    });
            },
                error: function(error){
                    alert(JSON.stringify(error));
            }
        })
    }