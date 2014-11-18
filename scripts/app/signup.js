function signup() {
    console.log("Sign up called successfully");

    var savePostDS = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    // Required by Backend Services
                    create: {
                        url: "http://api.everlive.com/v1/IMregDJC77R1b1yM/Users",
                        type: "POST",
                        dataType: "json"
                    }
                },

                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            DisplayName: {
                                type: "string"
                            },
                            Email: {
                                type: "string"
                            },
                            Username: {
                                type: "string"
                            },
                            Password: {
                                type: "string"
                            },
                            BirthDate:{
                                type: "date"
                            },
                            Gender:{
                                type:"number"
                            }

                        }
                    }//end of model
                }//end of schema
            }
        )
        ;//end of data source

    var itemsToInsert = {
        DisplayName: $('#signupName').val(),
        Email: $('#signupEmail').val(),
        Username: $('#signupUsername').val(),
        Password: $('#signupPassword').val(),
        BirthDate: $('#signupBirthDatePicker').val(),
        Gender: $('#signupGenderPicker').val(),


    };

    savePostDS.add(itemsToInsert);
    savePostDS.sync();

    $('#signupName').val('');
    $('#signupEmail').val('');
    $('#signupUsername').val('');
    $('#signupPassword').val('');
    $('#signupBirthDatePicker').val('');
    $('#signupGenderPicker').val('');


    console.log("Datasourse sync successfully");

}//end of function