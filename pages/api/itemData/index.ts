import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const {search} = req.query
      const { Item } = await connect() // connect to database
      
      if (search && search.length > 0) {        
        res.json(await Item.aggregate([
          {
            $search: {
              "text": {
                "path": "title",
                "query": search,
                "fuzzy": {
                  "maxEdits": 2,
                  "maxExpansions": 100,
                }
              }
            }
          },
          {
            $project: {
              "_id": 1,
              "title": 1,
              "img": 1,
              "createdAt": 1,
              score: { $meta: "searchScore" }
            }
          }
        ]).sort({ score : "desc"}).catch(catcher))

      } else {
        res.json(await Item.find({}).sort({ createdAt : "desc"}).catch(catcher))
      }
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Item } = await connect() // connect to database
      const response = await Item.create(req.body).catch(catcher)

      const itemData = await Item.find({}).sort({ createdAt : "desc"}).catch(catcher)

      res.status(200).send({ data: itemData }) 
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler