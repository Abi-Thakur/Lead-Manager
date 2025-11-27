"use server"
import {connectDB} from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";
import {generateToken} from "@/lib/auth"

export async function loginAction(formData: FormData){

        await connectDB();

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if(!email || !password ){
            console.log("all feilds are required")
            return 
        }
        const user = await User.findOne({email});
        if(!user){
            console.log("user not found")
            return 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log("password is incorrect")
            return 
        }

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
        });
        
        (await cookies()).set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        redirect("/dashboard")

}

