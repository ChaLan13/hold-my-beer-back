db.getCollection('beer').insertMany([
    {
        "id": "5763cd4d9d2a4f259b53c901",
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
        "id": "5763cd4d51fdb6588742f99e",
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
        "id": "5763cd4dba6362a3f92c954e",
        "name": "Delirium",
        "country": "Ireland",
        "cereal": [ "malt" ],
        "birthYear": "1947",
        "shop": {
            "priceALiter": NumberDecimal(4.50),
            "URL": "http://www.monsite.com"
        }
    },
])
