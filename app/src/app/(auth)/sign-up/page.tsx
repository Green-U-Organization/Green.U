"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Form, 
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import LoadingButton from "@/components/ui/loading-button"

import Link from "next/link"

import {signUpSchema} from "@/lib/zod"

export default function SignUp() {
    return (
        <div className="grow flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
Creat Green.U account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form>
                        <form className="space-y-6">
                            {["name", "email", "password", "confirmPassword"].map((field) => (
                                <FormField
                                key={field}
                                name={field as keyof z.infer<typeof signUpSchema>}
                                render={({ field: fieldProps }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            type={
                                                field.includes("password")
                                                ? "password"
                                                : field === "email"
                                                ? "email"
                                                : "text"                                        
                                            }
                                            placeholder={`Enter your ${field}`}
                                            {...fieldProps}
                                            autoComplete = "off"
                                            />                                    
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                                />
                            ) )}
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>
    )
} 