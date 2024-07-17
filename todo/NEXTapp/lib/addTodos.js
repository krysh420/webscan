'use server'
import db from "./db";
import todos from "../models/todoModel";
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"


const addTodo = async(data) => {
    const {title,deadline,desc} = data
    try {
        await db.connect()
        const todo = new todos({
            title,deadline,desc
        })
        await todo.save()
    } catch (error) {
        throw new Error("add todo failed\n",error)
    }
    revalidatePath("/")
    redirect("/")
}
export default addTodo