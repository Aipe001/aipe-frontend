"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Phone, Video, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";

interface Message {
    id: number;
    sender: "expert" | "user";
    text: string;
}

export default function Consultation() {
    const { bookingId } = useParams();
    const [mode, setMode] = useState<"video" | "audio" | "chat">("chat");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "expert", text: "Hello, I'm Rajesh. Let's discuss your GST details." },
        { id: 2, sender: "user", text: "Hi Rajesh, sure." },
    ]);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, sender: "user", text: messageInput },
            ]);
            setMessageInput("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="py-12 bg-background min-h-screen">
            <div className="page-container">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold italic text-primary">
                        Successful
                    </h1>
                    <div className="flex gap-3">
                        <Button
                            variant={mode === "audio" ? "default" : "outline"}
                            onClick={() => setMode("audio")}
                            className="gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            Audio Call
                        </Button>
                        <Button
                            variant={mode === "video" ? "default" : "outline"}
                            onClick={() => setMode("video")}
                            className="gap-2"
                        >
                            <Video className="w-4 h-4" />
                            Video Call
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Info Card */}
                    <Card className="card-shadow h-fit">
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Booking ID</p>
                                <p className="font-semibold text-foreground">{bookingId || "12345"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Service</p>
                                <p className="font-semibold text-foreground">GST Registration</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Expert</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            RK
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-foreground">Rajesh Kumar</span>
                                </div>
                            </div>
                            <Separator />
                            <Button className="w-full">Bookings</Button>
                        </CardContent>
                    </Card>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <Card className="card-shadow overflow-hidden">
                            <CardContent className="p-0">
                                {mode === "video" ? (
                                    /* Video Call Interface */
                                    <div className="relative">
                                        <div className="bg-foreground aspect-video flex items-center justify-center">
                                            <div className="grid grid-cols-2 gap-1 w-full h-full">
                                                <div className="bg-muted flex items-center justify-center">
                                                    <Avatar className="w-24 h-24">
                                                        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                                                            RK
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="bg-muted/80 flex items-center justify-center">
                                                    <Avatar className="w-24 h-24">
                                                        <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">
                                                            U
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Video Controls */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                                            <Button
                                                variant={isMuted ? "destructive" : "secondary"}
                                                size="icon"
                                                className="rounded-full w-12 h-12"
                                                onClick={() => setIsMuted(!isMuted)}
                                            >
                                                {isMuted ? (
                                                    <MicOff className="w-5 h-5" />
                                                ) : (
                                                    <Mic className="w-5 h-5" />
                                                )}
                                            </Button>
                                            <Button
                                                variant={isVideoOff ? "destructive" : "secondary"}
                                                size="icon"
                                                className="rounded-full w-12 h-12"
                                                onClick={() => setIsVideoOff(!isVideoOff)}
                                            >
                                                {isVideoOff ? (
                                                    <VideoOff className="w-5 h-5" />
                                                ) : (
                                                    <Video className="w-5 h-5" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="rounded-full w-12 h-12"
                                            >
                                                <PhoneOff className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Chat Interface */
                                    <div className="flex flex-col h-[400px]">
                                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                                        }`}
                                                >
                                                    <div
                                                        className={`max-w-[80%] ${message.sender === "user" ? "text-right" : ""
                                                            }`}
                                                    >
                                                        <p className="text-xs font-semibold text-foreground mb-1">
                                                            {message.sender === "expert" ? "Expert" : "User"}
                                                        </p>
                                                        <p className="text-sm text-foreground">{message.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Message Input */}
                                <div className="border-t border-border p-4 flex gap-3">
                                    <Input
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSendMessage}>Send</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
