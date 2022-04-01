// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';
import { Items } from '../index';

type Data = {
  message: string
  data?: Items[]
}


interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        img: string
        title: string
    };
  }

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {    
    if (req.method === "PUT") {

        const newImage = {
            img: req.body.img,
            title: req.body.title,
            id: uuidv4(),
            createdAt: Date.now()
        }

        const response = await fetch(`http://localhost:4000/itemData/`, {
            method: "POST",
            body: JSON.stringify(newImage),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.status !== 201) {
            return res.status(400).send({ message: "Connecting to database failed" });
        }


        const resp = await fetch(`http://localhost:4000/itemData?_sort=createdAt&_order=desc`, {
            headers: { "Content-Type": "application/json" },
        });
        if (resp.status !== 200) {
        return res
            .status(400)
            .send({ message: "Update request to sever failed" });
        }
        const itemData = await resp.json(); 
        res
        .status(200)
        .send({ message: "Successfully added data", data: itemData });
      
    } if (req.method === "DELETE") {
        const { item_id } = req.query;
        
        const response = await fetch(`http://localhost:4000/itemData/${item_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        const resp = await fetch(`http://localhost:4000/itemData?_sort=createdAt&_order=desc`, {
            headers: { "Content-Type": "application/json" },
        });
        if (resp.status !== 200) {
        return res
            .status(400)
            .send({ message: "Update request to sever failed" });
        }
        const itemData = await resp.json(); 
        res
        .status(200)
        .send({ message: "Successfully added data", data: itemData });
    } else {
        res.status(401).send({ message : "Not found"});
    }
}
