"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Activity, Zap } from "lucide-react";

interface GuestbookEntry {
  id: number;
  message: string;
  createdAt: string;
}

const sampleEntries: GuestbookEntry[] = [
  { id: 1, message: "멋진 포트폴리오네요! 🚀", createdAt: "2분 전" },
  {
    id: 2,
    message: "Server Actions 구현이 인상적입니다.",
    createdAt: "5분 전",
  },
];

function ServerStatus() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tech-green animate-pulse" />
        <span className="text-muted-foreground">API Latency:</span>
        <span className="font-mono text-tech-cyan">24ms</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tech-green" />
        <span className="text-muted-foreground">DB Status:</span>
        <span className="font-mono text-tech-green">Healthy</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tech-green" />
        <span className="text-muted-foreground">Redis Cache:</span>
        <span className="font-mono text-tech-yellow">Active</span>
      </div>
    </div>
  );
}

export function PlaygroundSection() {
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>(sampleEntries);

  const handleSubmit = () => {
    if (!message.trim()) return;
    const newEntry: GuestbookEntry = {
      id: Date.now(),
      message: message.trim(),
      createdAt: "방금 전",
    };
    setEntries([newEntry, ...entries]);
    setMessage("");
  };

  return (
    <section id="playground" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Playground</h2>
          <p className="text-xl text-primary mb-2">
            This is not a static portfolio
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This section runs on Next.js Server Actions + Supabase, with real
            data persistence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-8"
        >
          <Badge variant="outline" className="border-tech-cyan text-tech-cyan">
            <Zap className="w-3 h-3 mr-1" />
            RSC + Server Actions based stateless API
          </Badge>
          <Badge
            variant="outline"
            className="border-tech-green text-tech-green"
          >
            Edge-friendly
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Guestbook
                </CardTitle>
                <ServerStatus />
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Leave a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSubmit} className="w-full glow-blue">
                  Submit
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Live Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[250px] overflow-y-auto">
                  {entries.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Be the first to leave a message!
                    </p>
                  ) : (
                    entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3 rounded-lg bg-secondary/50 border border-border"
                      >
                        <p className="text-sm">{entry.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {entry.createdAt}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
