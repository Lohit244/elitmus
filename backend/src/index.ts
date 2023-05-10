import { register } from "ts-node"
import { app, prisma } from "./server"
import { login, validateToken } from "./auth"
import { adminPanelGetProgress, getProgress, updateProgress } from "./userProgress"
import { topTen } from "./leaderboard"

app.get('/hello', async (req, res) => {
  res.json({ hello: 'world' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/users/register', register)
app.post('/users/login', login)

app.get('/users/progress', validateToken as any, getProgress as any)
app.post('/users/progress', validateToken as any, updateProgress as any)

app.get('/leaderboard', topTen)
app.get('/admin/progress', validateToken as any, adminPanelGetProgress as any)
