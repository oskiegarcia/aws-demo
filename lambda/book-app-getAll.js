const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10' });


exports.handler = async(event) => {

    console.log('Listing all books');

    const params = {
        TableName: "books"
    };

    const result = await getBooks(params)
    console.log('Result:', JSON.stringify(result));
    return result;


};


async function getBooks(params) {

    let getAllBooks = new Promise((res, rej) => {
        dynamodb.scan(params, function(err, data) {
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
                const items = data.Items.map(
                    (dataField) => {
                        return {
                            isbn: dataField.isbn.S,
                            title: dataField.title.S,
                            description: dataField.description.S,
                            authors: dataField.authors.SS,
                            published: dataField.PublishedDate.S,
                            publisher: dataField.publisher.S,
                            subjects: dataField.subjects.SS,
                        };
                    }
                );
                const response = {
                    statusCode: 200,
                    error: null,
                    data: items
                };

                res(response);
            }
        });
    });

    let response = {};
    await getAllBooks.then((result) => response = result)
        .catch((error) => response = error);

    return response;
}
