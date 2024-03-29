const connection= require( '../utilities/connections' );

let hotdealsData= [
    {
        "destinationId": "HD1001",
        "continent": "Asia",
        "name": "Thailand : The Golden Kingdom",
        "imageUrl": "/assets/Thailand.jpg",
        "details": {
            "about": "Experience the warm welcome of the Land of Smiles.From bustling Bangkok, you’ll travel north to ancient ruined capitals, local villages, and mountaintop temples to investigate all sides of this vibrant country of contrasts. The spice and rice will nourish your body; the scenery and history will nourish your soul.",
            "itinerary": {
                "dayWiseDetails": {
                        "firstDay": "Travel day: Board your overnight flight to Thailand.",
                        "restDaysSightSeeing": [
                                                "Temple of the Golden Buddha", 
                                                "Damnoen Saduak Floating Market", 
                                                "Ayutthaya Ruins", 
                                                "Sukhothai Historical Park", 
                                                "Wat Rong Khun"
                                            ],
                        "lastDay": "Departure: Transfer to the airport for your flight home"
                },
                "packageInclusions": [ 
                    "11 nights in handpicked hotels", 
                    "12 breakfasts", 
                    "4 lunches", 
                    "4 dinners with beer or wine", 
                    "8 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights": [ 
                    "Grand Palace", 
                    "Temple of the Golden Buddha", 
                    "Damnoen Saduak Floating Market", 
                    "Ayutthaya Ruins", 
                    "Sukhothai Historical Park", 
                    "Wat Rong Khun", 
                    "Elephant Nature Park"
                ],
                "tourPace": [ 
                    "On this guided tour, you'll walk for about 1 hour daily across uneven terrain with some hills."
                ]
            }
        },
        "noOfNights": 11.0,
        "flightCharges": 400,
        "chargesPerPerson": 2249.0,
        "discount": 5.0,
        "availability": 15.0
    },

    {
        "destinationId": "HD1002",
        "continent": "Australia",
        "name": "Australia & New Zealand",
        "imageUrl": "/assets/aus3.jpg",
        "details": {
            "about": "Australia and New Zealand—a world away.From Australia's Great Barrier Reef and the rugged Outback to New Zealand's sheep-dotted plains and cliff-lined fjords, the South Pacific features a lineup of dramatic landscapes. In-between outdoor adventures, you’ll discover sophisticated, multicultural cities and an irresistible, carpe diem spirit on this tour.",
            "itinerary": {
                "dayWiseDetails": {
                        "firstDay": "Cross the International Date Line in flight and lose a day.",
                        "restDaysSightSeeing": [
                                                "Melbourne", 
                                                "Uluru", 
                                                "Great Barrier Reef", 
                                                "Sydney Opera House", 
                                                "Glowworm Caves", 
                                                "Bob’s Peak", 
                                                "Milford Sound", 
                                                "Kiwi Wildlife Park"
                                            ],
                        "lastDay": "Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions": [ 
                    "19 nights in handpicked hotels", 
                    "20 breakfasts", 
                    "1 lunch", 
                    "6 dinners with beer or wine", 
                    "13 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach", 
                    "Flights from Melbourne to Alice Springs, Uluru Region to Great Barrier Reef Region, Great Barrier Reef Region to Sydney, Sydney to Fiordland National Park Region, Queenstown to Rotorua"
                ],
                "tourHighlights": [ 
                    "Melbourne", 
                    "Uluru", 
                    "Great Barrier Reef", 
                    "Sydney Opera House", 
                    "Glowworm Caves", 
                    "Bob’s Peak", 
                    "Milford Sound", 
                    "Kiwi Wildlife Park", 
                    "Kiwi home-hosted dinner", 
                    "Auckland’s Sky Tower"
                ],
                "tourPace": [ 
                    "On this guided tour, you’ll walk for about 1 hour daily across mostly flat terrain, including paved roads and gravel paths, with few hills."
                ]
            }
        },
        "noOfNights": 19.0,
        "flightCharges": 400,
        "chargesPerPerson": 6399.0,
        "discount": 5.0,
        "availability": 15.0
    },

    {
        "destinationId": "HD1003",
        "continent": "Europe",
        "name": "Budapest, Vienna & Prague",
        "imageUrl": "/assets/prague.jpg",
        "details": {
            "about": "Spire-studded skylines and fascinating histories are just the beginning.Dotted with hilltop castles, ornate cathedrals, and imperial palaces, Vienna, Budapest, and Prague will captivate you. Spend a few days getting to know each of these dynamic cities­—you’ll discover their vivid World War II history, radical art movements, and unique local cultures.",
            "itinerary": {
                "dayWiseDetails": {
                        "firstDay": "Board your overnight flight to Budapest.",
                        "restDaysSightSeeing": [
                                                "Matthias Church", 
                                                "Danube River", 
                                                "Szentendre", 
                                                "Schönbrunn Palace", 
                                                "Ringstrasse"
                                            ],
                        "lastDay": "Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions": [ 
                    "9 nights in handpicked hotels", 
                    "10 breakfasts", 
                    "3 dinners with beer or wine", 
                    "3 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights": [ 
                    "Hungarian Parliament Building", 
                    "Matthias Church", 
                    "Danube River", 
                    "Szentendre", 
                    "Schönbrunn Palace", 
                    "Ringstrasse", 
                    "Prague Castle, St. Vitus Cathedral"
                ],
                "tourPace": [ 
                    "On this guided tour, you'll walk for about 3 hours daily across mostly flat terrain with some cobblestone streets, hills, and stairs."
                ]
            }
        },
        "noOfNights": 9,
        "flightCharges": 400,
        "chargesPerPerson": 2049.0,
        "discount": 5.0,
        "availability": 15.0
    }

]

exports.hotdealsSetup = () => {
    return connection.getHotdealsCollection().then( ( myCollection ) => {
        return myCollection.deleteMany().then( ( ) => {
            return myCollection.insertMany( hotdealsData ).then( ( data ) => {
                if( data ){
                    return "Insertion Successfull"
                } else{
                    throw new Error( "Insertion Failed" )
                }
            } )
        } )
    } )
}