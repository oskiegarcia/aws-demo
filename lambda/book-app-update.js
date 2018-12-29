const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10' });


exports.handler = async(event) => {

    console.log('Updating a book with ISBN ', event.isbn);

    const params = {
        Item: {
            "isbn": {
                S: event.isbn
            },
            "title": {
                S: event.title
            },
            "description": {
                S: event.description
            },
            "authors": {
                SS: event.authors
            },
            "PublishedDate": {
                S: event.published_date
            },
            "publisher": {
                S: event.publisher
            },
            "subjects": {
                SS: event.subjects
            }
        },
        TableName: "books"
    };

    const result = await updateBook(params)
    console.log('Result:', JSON.stringify(result));
    return result;


};


async function updateBook(params) {

    let createBook = new Promise((res, rej) => {
        dynamodb.putItem(params, function(err, data) {
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
                    data: { msg: 'Updated successfully' },
                };

                res(response);
            }
        });
    });

    let response = {};
    await createBook.then((result) => response = result)
        .catch((error) => response = error);

    return response;
}
