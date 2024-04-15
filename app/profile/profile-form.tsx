"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { fetchUsers } from '@/lib/data';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { User } from "@/lib/types";
import { authenticate, updateProfile } from "@/lib/actions";
import { auth } from "@/auth";

interface ProfileFormProps {
    data: User[]; 
  }
export default function ProfileForm({ data}: ProfileFormProps) {
    const [userData, setUserData] = useState<User | null>(null);
  
    return (
        <form action={updateProfile}>
            <div className="flex min-h-screen w-full flex-col">
                <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                </header>

                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                   {userData && (
                        <div>
                            <h1>{userData?.FELHASZNALONEV} profil beállításai</h1>
                        </div>
                    )}
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold text-center">Profile Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-3xl items-start gap-6 md:grid-cols-[1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                        >
                        </nav>
                        <div className="grid gap-6">
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>First Name</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input
                                            value={userData?.KERESZTNEV} />
                                    </form>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Last Name</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input
                                            value={userData?.VEZETEKNEV} />
                                    </form>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Username</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input placeholder="Username" value={userData?.FELHASZNALONEV} />
                                    </form>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Email</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input placeholder="Email" />
                                    </form>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input placeholder="Password" value={userData?.JELSZO} />
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex justify-center mt-1">

                        <Button type="submit">Update profile</Button>
                    </div>
                </main>
            </div>
        </form>

    );

}
