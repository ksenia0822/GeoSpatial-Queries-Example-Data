// GeoSpatial Queries Example

// Finding the Current Neighborhood

db.neighborhoods.findOne({ 
	geometry: { $geoIntersects: 
				{ $geometry: { type: "Point", 
								coordinates: [ -74.013972, 40.705781 ] 
							} 
				} 
	} 
})

db.restaurants.findOne()
// This query will return the following: 
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

// Finding all Restaurants in the neighborhood

var neighborhood = db.neighborhoods.findOne({ 
	geometry: { $geoIntersects: 
				{ $geometry: { type: "Point", 
								coordinates: [ -74.013972, 40.705781 ] 
							} 
				} 
	} 
})



db.restaurants.find({ 
	location: { 
		$geoWithin: { 
			$geometry: neighborhood.geometry 
		} 
	} 
}).count()


// This query will tell you that there are 440 restaurants in Battery Park City. 


// Finding Restaurants within a Distance

// To find restaurants within a specified distance of a point, you can use either $geoWithin with $centerSphere
// to return results in unsorted order, or nearSphere with $maxDistance if you need results sorted by distance.


db.restaurants.find({ 
	location:{ 
		$geoWithin: { 
			$centerSphere: [ [ -74.013972, 40.705781 ], 50 ] } } })



db.restaurants.find({ 
	location: { 
		$near: { 
			$geometry: { 
				type: "Point", coordinates: [ -74.013972, 40.705781 ] 
			}, 
			$maxDistance: 500 } } })



