# aws-demo

## API Gateway

### Endpoints
```
	/books
	   POST
	   GET
	/books/{isbn}
	   DELETE
	   GET
	   PUT
```

### Integration Request Mapping Template for DELETE/GET:
	{
	"isbn" : "$input.params('isbn')"
	}
	
### Integration Request Mapping Template for PUT:
	
	{
	  "isbn" : "$input.params('isbn')",
	   "title" : $input.json('$.title'),
	   "description" : $input.json('$.description'),
	   "authors" : $input.json('$.authors'),
	   "published_date" : $input.json('$.published_date'),
	   "publisher" : $input.json('$.publisher'),
	   "subjects" : $input.json('$.subjects')
	}
