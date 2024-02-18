/*
1.Find all the topics and tasks which are thought in the month of October
[
  {
    "$unwind": "$topic"
  },
  {
    "$match": {
      "topic.date": {
        "$gte": "2020-10-01",
        "$lte": "2020-10-31"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "topic": "$topic.topic",
      "task": {
        "$filter": {
          "input": "$task",
          "as": "task",
          "cond": {
            "$eq": ["$$task.date", "$topic.date"]
          }
        }
      }
    }
  }
]



2.Find all the placement drives which appeared between 15 oct-2020 and 31-oct-2020

[
  {
    "$unwind": "$placement_drives"
  },
  {
    "$match": {
      "placement_drives.date": {
        "$gte": "2020-10-15",
        "$lte": "2020-10-31"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "company": "$placement_drives.name",
      "date": "$placement_drives.date",
      "result": "$placement_drives.result"
    }
  }
]




3.Find all the placement drives and students who are appeared for the placement
[
  {
    "$unwind": "$placement_drives"
  },
  {
    "$project": {
      "company_name": "$placement_drives.name",
      "student_name": "$name",
      "_id": 0
    }
  }
]



4.Find the number of problems solved by the user in codekata

[
  {
    "$project": {
      "_id": 0,
      "user": "$name",
      "problems_solved": "$codekata"
    }
  }
]



5.Find all the mentors with who has the mentee's count more than 15

[
  {
    "$match": {
      "users": "mentor",
      "mentee_count": { "$gt": 15 }
    }
  },
  {
    "$project": {
      "_id": 0,
      "mentor_name": "$name",
      "mentee_count": 1
    }
  }
]



6.Find the number of users who are absent and task is not submitted between 15 oct-2020 and 31-oct-2020
[
  {
    "$match": {
      "$and": [
        {
          "attendance": {
            "$elemMatch": {
              "date": {
                "$gte": "2020-10-15",
                "$lte": "2020-10-31"
              },
              "status": "A"
            }
          }
        },
        {
          "task": {
            "$elemMatch": {
              "date": {
                "$gte": "2020-10-15",
                "$lte": "2020-10-31"
              },
              "task": false
            }
          }
        }
      ]
    }
  },
  {
    "$count": "absent_without_task"
  }
]

*/