'use server'
import db from "./db";
import todos from "../models/todoModel";

export const getTodos = async() => {
    try {
        db.connect()
        const allTodos = await todos.find({})
        return allTodos
    } catch (error) {
        throw new Error("failed to get todos\n",error)
    }
}

export const getATodo  = async(id) => {
    try {
        db.connect()
        const allTodos = await todos.findById(id)
        const {title,deadline,desc}=allTodos
        return {title,deadline,desc}
    } catch (error) {
        throw new Error("failed to get todos\n",error)
    }
}

 