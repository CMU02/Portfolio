"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Camera, Mail } from "lucide-react";
// import { Bell } from "lucide-react"; // 알림 기능 추가 시 사용

export default function SubHubPrivacyPage() {
  return (
    <main className="dark min-h-screen">
      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* 뒤로가기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects/subhub">
                <ArrowLeft className="w-4 h-4 mr-2" />
                프로젝트로 돌아가기
              </Link>
            </Button>
          </motion.div>

          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-tech-cyan" />
              <h1 className="text-4xl md:text-5xl font-bold">
                개인정보처리방침
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">SubHub 앱</p>
            <p className="text-sm text-muted-foreground mt-2">
              시행일: 2024년 12월 10일 | 최종 수정일: 2024년 12월 10일
            </p>
          </motion.div>

          {/* 개인정보처리방침 내용 */}
          <div className="space-y-6">
            {/* 소개 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">
                    SubHub(이하 &quot;앱&quot;)는 사용자의 개인정보를
                    중요시하며, 「개인정보 보호법」을 준수하고 있습니다. 본 앱은
                    사용자의 개인정보를 수집하지 않으며, 모든 데이터는 사용자의
                    기기에만 저장됩니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* 개인정보 수집 안함 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    1. 개인정보 수집 안내
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    본 앱은 사용자의 개인정보를 수집하지 않습니다. 사용자가
                    입력한 구독 정보는 기기 내부에만 저장되며, 외부 서버로
                    전송되지 않습니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* 카메라 권한 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="border-tech-purple/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Camera className="w-5 h-5 text-tech-purple" />
                    2. 카메라 권한 사용 안내
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    앱은 다음과 같은 목적으로 카메라
                    권한(android.permission.CAMERA)을 사용합니다:
                  </p>
                  <div className="p-4 rounded-lg bg-tech-purple/10 border border-tech-purple/20">
                    <h4 className="font-semibold mb-2">카메라 사용 목적</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex gap-2">
                        <span className="text-tech-purple">✓</span>
                        <span>구독 서비스 로고 촬영 및 등록</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">
                      개인정보 보호 약속
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>
                          카메라로 촬영된 이미지는 기기 내에서만 저장됩니다
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>
                          촬영된 이미지는 외부 서버로 전송되지 않습니다
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>
                          사용자가 명시적으로 허용한 경우에만 카메라에
                          접근합니다
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 알림 권한 - 주석 처리 */}
            {/* 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    3. 알림 권한 사용 안내
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    앱은 구독 갱신일 알림을 제공하기 위해 푸시 알림 권한을 사용합니다:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>구독 갱신일 D-3, D-1 알림</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>월간 구독 비용 리포트 알림</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            */}

            {/* 사용자 권리 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">3. 사용자의 권리</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    사용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-tech-cyan">•</span>
                      <span>앱 삭제를 통한 모든 데이터 삭제</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-tech-cyan">•</span>
                      <span>카메라 권한 철회 (기기 설정에서 가능)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* 연락처 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="border-tech-cyan/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Mail className="w-5 h-5 text-tech-cyan" />
                    4. 문의
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    개인정보 처리에 관한 문의사항이 있으시면 아래로 연락해
                    주세요:
                  </p>
                  <div className="p-4 rounded-lg bg-tech-cyan/10 border border-tech-cyan/20">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>개발자:</strong> CMU02
                      </li>
                      <li>
                        <strong>이메일:</strong> cmu02.dev@gmail.com
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 변경 사항 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    5. 개인정보처리방침의 변경
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수
                    있습니다. 변경 시 앱 내 공지를 통해 안내드립니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
