/**
 * Created by mkale on 14/11/2014.
 */
 

function savePost() {

    var savePostDS = new kendo.data.DataSource({
        type: 'everlive',
        transport: {
            // Required by Backend Services
            create: {
                url: "http://api.everlive.com/v1/IMregDJC77R1b1yM/Posts",
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
                        type:"string"
                    },
                    Location:{
                        type:"Location"
                    },
                    Price:{
                        type:"string"
                    }

                }
            }//end of model
        }//end of schema
    });//end of data source

    var itemsToInsert = {
        Title:$('#postTitle').val(),
        PostCategory:$('#postCategory').val(),
        Description:$('#postDescription').val(),
        SaleEndDate:$('#saleEndDate').val(),
        Picture:$('#postPicture').val(),
        Location:$('#postLocation').val(),
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