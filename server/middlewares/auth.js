import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_KEY = process.env.JWT_KEY

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if(!token)
      return res.status(401).json({ message: 'Не удалось авторизоваться'})

    const decoded = jwt.verify(token, JWT_KEY)
    req.user = decoded

    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Что-то пошло не так'})
  }
}

export default auth