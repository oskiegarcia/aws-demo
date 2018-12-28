const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10' });


exports.handler = async(event) => {

    console.log('Retrieving a book with ISBN ', event.isbn);

    const params = {
        Key: {
            "isbn": {
                S: event.isbn
            }
        },
        TableName: "books"
    };

    const result = await retrieveBook(params)
    console.log('Result:', JSON.stringify(result));
    return result;


};


async function retrieveBook(params) {

    let getBook = new Promise((res, rej) => {
        dynamodb.getItem(params, function(err, data) {
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
                    data: {
                        isbn: data.Item.isbn.S,
                        title: data.Item.title.S,
                        description: data.Item.description.S,
                        authors: data.Item.authors.SS,
                        published_date: data.Item.PublishedDate.S,
                        publisher: data.Item.publisher.S,
                        subjects: data.Item.subjects.SS,
                    }
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
