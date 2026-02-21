import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import * as motion from "motion/react-client";

export default function CertificationsPage() {
  return (
    <main className="dark min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            전문성을 인증하는 자격증 및 배지
          </p>

          <div className="grid gap-6 max-w-3xl">
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-semibold">
                      AWS Certified Solutions Architect – Associate
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      SAA-C03
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    AWS 클라우드 아키텍처 설계 및 구현 능력을 검증하는 자격증
                  </p>

                  <a
                    href="https://www.credly.com/users/hyeonjun-choi.37d5c75f/badges"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    배지 확인하기
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
