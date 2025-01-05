import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { userSignUp } from "@/slice/user/userAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export function SignupForm({
  className,
  ...props
}) {
  const dispatch = useDispatch();
  const { toast } = useToast()
  const loading = useSelector((state) => state.userAuth.loading)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result =  await dispatch(userSignUp({ payload: formData })).unwrap()
      if (result) {
        toast({
          title: "Success",
          description: "Account created successfully!",
          variant: "success"
        });
        
        // Redirect to login page after successful registration
        navigate("/user/login");
      }
     
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: error || "Faild to user register, please try again",
        variant: "destructive"
      })
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to signup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button variant="outline" className="underline underline-offset-4" >Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
