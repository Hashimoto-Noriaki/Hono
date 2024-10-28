import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono()

//ダミーデータ
let blogPosts = [
  {
    id: "1",
    title: "Blog1",
    content: "Blog1 Posts",
  },
  {
    id: "2",
    title: "Blog2",
    content: "Blog2 Posts",
  },
  {
    id: "3",
    title: "Blog3",
    content: "Blog2 Posts",
  }
];
app.use("*",prettyJSON());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//API  cはcontext
app.get("/posts",(c)=> c.json({posts: blogPosts}));

export default app
