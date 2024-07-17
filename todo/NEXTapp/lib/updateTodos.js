'use server'
import db from "./db";
import todos from "../models/todoModel";
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"


export const UpdateTodo = async (id,FormData) => {
    const {title,desc,deadline} = FormData
    try {
        db.connect()
        const updateFields = {
            title, desc, deadline
        }
        await todos.findByIdAndUpdate(id, updateFields)
    } catch (error) {
        throw new Error("Failed To Update Todos " + error)
    }
    revalidatePath("/")
    redirect("/")
}
