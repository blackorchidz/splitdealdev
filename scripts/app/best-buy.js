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

