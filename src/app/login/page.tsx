import { LoginComponent } from "@/components/login-component";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full min-h-screen md:flex">
      <div className="hidden md:block w-1/2 h-screen bg-black">
        <div className="flex justify-center items-center h-full w-full">
          <Image className="rounded-full" src="/assets/logo.jpg" alt="logo" width={500} height={500} />
        </div>
      </div>

      <div className="w-full md:w-1/2 h-screen">
        <LoginComponent />
      </div>
    </div>
  );
}
