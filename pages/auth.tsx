import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/Authfrom";
import Layout from "@/components/Layout";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-8">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AuthForm isLogin={true} />
              </TabsContent>
              <TabsContent value="register">
                <AuthForm isLogin={false} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
