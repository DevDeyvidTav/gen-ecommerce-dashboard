import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from ".";
import { toast } from "sonner";


export async function Login({ email, password }: { email: string, password: string }) {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        toast.success("Login efetuado com sucesso 🎉");
        return { success: true, user };
    } catch (error) {
        if (error instanceof Error && error.message.includes("(auth/invalid-email)")) toast.error("Email inválido");      
        if (error instanceof Error && error.message.includes("(auth/invalid-credential)")) toast.error("Senha inválida");
        return { success: false };
    }
}