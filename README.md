# Express API - Lab 11

### Description:

This app is an API that utilizes the express framework. Following REST architecture the this app allows a resource to be READ, CREATED and DELETED. It runs the appropriate tests for getting the correct data and error messages.

### How to use:

* Run the server from the command line using `npm run start`
* Open a separate tab in the terminal
* From the second tab start by entering `http [optional request method] :8000/api/song [properties/id]`
* `GET` requests do not require a request method in the command line
  * followed by the songs items id like `id=='[unique-song-id]'`
* `POST` requests are made with `POST` as the request method
  * followed by key-value pairs like `name=[item-name]`
* `DELETE` requests are made like `GET` only with the `DELETE` as the request method
