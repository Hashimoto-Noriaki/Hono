import { Hono } from 'hono';

const posts = new Hono();

// Dummy data
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
    content: "Blog3 Posts",
  }
];

// Get all blog posts
posts.get("/", (c) => c.json({ posts: blogPosts }));

// Get a specific blog post by ID
posts.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((p) => p.id === id);

  if (post) {
    return c.json(post);
  } else {
    return c.json({ message: "Not found" }, 404);
  }
});

// Create a new blog post
posts.post("/", async (c) => {
  const { title, content } = await c.req.json<{ title: string; content: string }>();
  const newPost = { id: String(blogPosts.length + 1), title, content };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});

// Update a blog post by ID
posts.put("/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === id);

  if (index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  const { title, content } = await c.req.json();
  blogPosts[index] = { ...blogPosts[index], title, content };
  return c.json(blogPosts[index]);
});

// Delete a blog post by ID
posts.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === id);

  if (index === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  blogPosts = blogPosts.filter((p) => p.id !== id);
  return c.json({ message: "Post deleted" });
});

export default posts;
