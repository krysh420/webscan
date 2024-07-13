'use server'
import db from "./db";
import todos from "../models/todoModel";
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"

const deleteTodos = async(id) => {
    try {
        await db.connect()
        await todos.findByIdAndDelete(id)
    } catch (error) {
        throw new Error("add todo failed\n",error)
    }
    revalidatePath("/")
}

export default deleteTodos