const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10' });


exports.handler = async(event) => {

    console.log('Deleting a book with ISBN ', event.isbn);

    const params = {
        Key: {
            "isbn": {
                S: event.isbn
            }
        },
        TableName: "books"
    };

    const result = await deleteBook(params)
    console.log('Result:', JSON.stringify(result));
    return result;


};


async function deleteBook(params) {

    let getBook = new Promise((res, rej) => {
        dynamodb.deleteItem(params, function(err, data) {
            if (err) {
                console.log("Error:", JSON.stringify(err));
                const errResponse = {
                    statusCode: 500,
                    error: err,
                    data: null,
                };
                rej(errResponse);
            }
            else {
                console.log("Success:", data);
                const response = {
                    statusCode: 200,
                    error: null,
                    data: data
                };

                res(response);
            }
        });
    });

    let response = {};
    await getBook.then((result) => response = result)
        .catch((error) => response = error);

    return response;
}
