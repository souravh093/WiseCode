import { Form } from "@/components/ui/form";
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginForm from "./_components/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full">
          <Image
            src={
              "https://images.unsplash.com/photo-1522860747050-bb0c1af38ae9?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="login image"
            width={1000}
            height={1000}
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="z-10 h-screen relative flex items-center justify-start p-10 bg-blue-500/90">
          <div>
            <h1 className="text-6xl text-white max-w-2xl font-bold">WiseCode Influencer Directory</h1>
            <p className="text-lg text-gray-200 mt-4 max-w-xl">
              Manage and discover influencers across all major platforms. Access
              detailed analytics, engagement metrics, and comprehensive
              profiles.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-lg text-gray-200">
              <li>Browse 2,000+ verified influencers</li>
              <li>Advanced filtering and search</li>
              <li>Role-based access control</li>
            </ul>
          </div>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
