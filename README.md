# GeoSpatial-Queries-Example-Data

### Setup

###### Download two example datasets: geoData-1.js and geoData-2.js. 

These contain the collections neighborhoods and restaurants respectively. After downloading the datasets, import them into the database:

mongoimport <path to geoData-1.js> -c neighborhoods

mongoimport <path to geoData-2.js> -c restaurants


###### Create a 2dsphere index on each collection using the mongo shell:

db.restaurants.createIndex({ location: "2dsphere" })

db.neighborhoods.createIndex({ coordinates: "2dsphere" })

###### Example

Refer to geospatialQueiriesCodeExample.js for the Restaurant Finder queries example.







