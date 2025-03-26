import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { logger } from "hono/logger"
import { serveStatic } from "@hono/node-server/serve-static"
import { renderFile } from "ejs"
import { drizzle } from "drizzle-orm/libsql"
import { todosTable } from "./src/schema.js"
import { eq } from "drizzle-orm"

const db = drizzle({ connection: "file:db.sqlite" })

const app = new Hono()

app.use(logger())
app.use(serveStatic({ root: "public" }))

app.get("/", async (c) => {
  const todos = await db.select().from(todosTable).all()

  const rendered = await renderFile("views/index.html", {
    title: "Úkolníček",
    todos,
  })

  return c.html(rendered)
})

app.post("/todos", async (c) => {
  const form = await c.req.formData()

  // todos.push({
  //   id: todos.length + 1,
  //   title: form.get("title"),
  //   done: false,
  // })

  await db.insert(todosTable).values({
    title: form.get("title"),
    done: false,
  })

  return c.redirect("/")
})

app.get("/todos/:id/toggle", async (c) => {
  const id = Number(c.req.param("id"))

  // const todo = todos.find((todo) => todo.id === id)

  const todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get()
  if (!todo) return c.notFound()
  await db
    .update(todosTable)
    .set({ done: !todo.done })
    .where(eq(todosTable.id, id))

  return c.redirect(c.req.header("Referer"))
})

app.get("/todos/:id/remove", async (c) => {
  const id = Number(c.req.param("id"))
  const index = todos.findIndex((todo) => todo.id === id)

  if (index === -1) return c.notFound()
  todos.splice(index, 1)

  return c.redirect("/")
})

app.get("/todo/:id", async (c) => {
  const id = Number(c.req.param("id"))
  await getTodoById(id)

  if (!todo) return c.notFound()

  const rendered = await renderFile("views/detail.html", {
    todo,
  })
  return c.html(rendered)
})

app.post("/todo/:id/rename", async (c) => {
  const id = Number(c.req.param("id"))
  const form = await c.req.formData()
  const newTitle = form.get("title")

  const todo = todos.find((t) => t.id === id)

  if (!todo) return c.notFound()

  todo.title = newTitle

  return c.redirect(`/todo/${id}`)
})

serve(app, (info) => {
  console.log(
    "App started on http://localhost:" + info.port
  )
})

const getTodoById = async (id) => {
  const todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get()

  return todo
}
