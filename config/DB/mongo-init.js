db.createUser(
    {
        user : "admin",
        pwd : "admin",
        role : [
            {
                role : "readWritte",
                db : "HMB_DB"
            }
        ]
    }
)
