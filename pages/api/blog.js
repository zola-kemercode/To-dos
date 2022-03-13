// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
export default function handler(req, res) {
  // store title and body in json file
  const blog = {
    title: req.body.title,
    body: req.body.body
  }
  // read json file
  const blogs = JSON.parse(fs.readFileSync('blogs.json', 'utf-8'))
  // return json file
  res.statusCode = 200
  res.json(blogs)
  
}
