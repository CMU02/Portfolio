"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Activity, Database, Zap } from "lucide-react";

// 서버 상태 표시 컴포넌트
function ServerStatus() {
  const t = useTranslations("Playground.status");

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tech-green animate-pulse" />
        <span className="text-muted-foreground">{t("apiLatency")}:</span>
        <span className="font-mono text-tech-cyan">24ms</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tech-green" />
        <span className="text-muted-foreground">{t("dbStatus")}:</span>
        <span className="font-mono text-tech-green">{t("healthy")}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tech-green" />
        <span className="text-muted-foreground">{t("cacheStatus")}:</span>
        <span className="font-mono text-tech-yellow">{t("active")}</span>
      </div>
    </div>
  );
}

// 방명록 아이템 타입
interface GuestbookEntry {
  id: number;
  message: string;
  createdAt: string;
}

// 샘플 방명록 데이터
const sampleEntries: GuestbookEntry[] = [
  { id: 1, message: "멋진 포트폴리오네요! 🚀", createdAt: "2분 전" },
  {
    id: 2,
    message: "Server Actions 구현이 인상적입니다.",
    createdAt: "5분 전",
  },
];

export function PlaygroundSection() {
  const t = useTranslations("Playground");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>(sampleEntries);

  const handleSubmit = () => {
    if (!message.trim()) return;
    // 실제로는 Server Action 호출
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-xl text-primary mb-2">{t("subtitle")}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* 기술 배지 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-8"
        >
          <Badge variant="outline" className="border-tech-cyan text-tech-cyan">
            <Zap className="w-3 h-3 mr-1" />
            {t("badges.rsc")}
          </Badge>
          <Badge
            variant="outline"
            className="border-tech-green text-tech-green"
          >
            {t("badges.edge")}
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 방명록 입력 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {t("guestbook.title")}
                </CardTitle>
                <ServerStatus />
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={t("guestbook.placeholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSubmit} className="w-full glow-blue">
                  {t("guestbook.submit")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* 방명록 목록 */}
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
                      {t("guestbook.empty")}
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
