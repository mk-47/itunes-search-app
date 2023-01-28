

### 
 This app developed using itunes api and create react app.

 - Search box is used to search album, artist or song name, based on your search input itunes open api is called with search result
 - data returned form the api is displayed in table.
 - react-table library is used to render table data.
 - table support ascending and descending sorting, when you click on the column header table data will be sorted according to sort order and border on column header denotes the sorting order.
 - search api call is delayed using debouncing technique to reduce the load on server.

- clicking on album art will redirect to 'music.apple.com' to display the album details.
- loading screen is displayed while api loads the data.

- Genre filter and price filter will filter the data based on selected filter inputs.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

