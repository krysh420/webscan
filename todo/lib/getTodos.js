'use server'
import db from "./db";
import todos from "../models/todoModel";

const getTodos = async() => {
    try {
        db.connect()
        const allTodos = await todos.find({})
        return allTodos
    } catch (error) {
        throw new Error("failed to get todos\n",error)
    }
}

export default getTodos