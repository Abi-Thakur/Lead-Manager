"use server"
import {z} from 'zod';
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/db";
import User from "@/models/user"

const signUpSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),

});

export async function signupAction(formData: FormData){
    await connectDB();
    

    const data = { 
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),

    };

    const validated = signUpSchema.parse(data);

    const hashed = await bcrypt.hash(validated.password, 10);

    await User.create({
        name: validated.name,
        email: validated.email,
        password: hashed,
    });
 

  

}