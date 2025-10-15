// app/component/verify-email-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { VerificationModal } from "./verification-modal";

interface VerifyEmailButtonProps {
  email: string;
}

export function VerifyEmailButton({ email }: VerifyEmailButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Có lỗi xảy ra");
        return;
      }

      setShowModal(true);
    } catch (error) {
      alert("Không thể gửi mã xác thực");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleSendCode}
        disabled={loading}
        size="sm"
        variant="outline"
        className="gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            Xác thực ngay
          </>
        )}
      </Button>

      <VerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        email={email}
      />
    </>
  );
}
