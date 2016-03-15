# GeoSpatial-Queries-Example-Data

### Setup

###### Download two example datasets: geoData-1.js and geoData-2.js. 

These contain the collections neighborhoods and restaurants respectively. After downloading the datasets, import them into the database:

mongoimport <path to geoData-1.js> -c neighborhoods

mongoimport <path to geoData-2.js> -c restaurants


###### Create a 2dsphere index on each collection using the mongo shell:

db.restaurants.createIndex({ location: "2dsphere" })

db.neighborhoods.createIndex({ coordinates: "2dsphere" })

### Example

#### Find the Current Neighborhood

<code>
db.neighborhoods.findOne({ 
	geometry: { $geoIntersects: 
				{ $geometry: { type: "Point", 
								coordinates: [ -74.013972, 40.705781 ] 
							} 
				} 
	} 
})
</code>


This query will return the following: 

<code>
{ 
	"_id" : ObjectId("..."),
	"geometry" : {
		"coordinates" : [
			[ ...
				[
	            -74.01244109278849,
	            40.71905767270331
				],
			]
		]
		"type" : "MultiPolygon",
	},
	"name" : "Battery Park City-Lower Manhattan"
}
</code>

#### Find all Restaurants in the neighborhood

<code>
var neighborhood = db.neighborhoods.findOne({ 
	geometry: { $geoIntersects: 
				{ $geometry: { type: "Point", 
								coordinates: [ -74.013972, 40.705781 ] 
							} 
				} 
	} 
})
</code>

<code>
db.restaurants.find({ 
	location: { 
		$geoWithin: { 
			$geometry: neighborhood.geometry 
		} 
	} 
}).count()
</code>

This query will tell you that there are 440 restaurants in Battery Park City. 


#### Find Restaurants within a Distance

To find restaurants within a specified distance of a point, you can use either $geoWithin with $centerSphere
to return results in unsorted order, or nearSphere with $maxDistance if you need results sorted by distance.

<code>
db.restaurants.find({ 
	location:{ 
		$geoWithin: { 
			$centerSphere: [ [ -74.013972, 40.705781 ], 50 ] } } })
</code>

<code>
db.restaurants.find({ 
	location: { 
		$nearSphere: { 
			$geometry: { 
				type: "Point", coordinates: [ -74.013972, 40.705781 ] 
			}, 
			$maxDistance: 500 } } })
</code>






