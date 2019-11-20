db.getCollection('beer').insertMany([
    {
        "name": "Pilsner",
        "country": "Germany",
        "cereal": [ "oat", "hop" ],
        "birthYear": "1984",
        "shop": {
            "priceALiter": NumberDecimal(3.50),
            "URL": "http://www.monsite.com"
        }
    },
    {
        "name": "Guinness Classic",
        "country": "Ireland",
        "cereal": [ "hop" ],
        "birthYear": "1967",
        "shop": {
            "priceALiter": NumberDecimal(2.50),
            "URL": "http://www.monsite.com"
        }
    },
    {
        "name": "Delirium",
        "country": "Ireland",
        "cereal": [ "malt" ],
        "birthYear": "1947",
        "shop": {
            "priceALiter": NumberDecimal(4.50),
            "URL": "http://www.monsite.com"
        }
    },
    {
        "name": "Bière du Druide",
        "country": "France",
        "cereal": [ "hop", "barley", "corn" ],
        "birthYear": "1900",
        "shop": {
            "priceALiter": NumberDecimal(4.50),
            "URL": "http://www.monsite.com"
        }
    },

    {
        "name": "Road Crew (Motorhead)",
        "country": "England",
        "cereal": ["hop"],
        "birthYear": "1990",
        "shop": {
            "priceALiter": NumberDecimal(4.50),
            "URL": "http://www.monsite.com"
        }
    },

])
