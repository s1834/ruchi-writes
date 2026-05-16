"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function ReadRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      router.replace(`/writings/${id}`);
    } else {
      router.replace("/writings");
    }
  }, [id, router]);

  return null;
}

export default function ReadPage() {
  return (
    <Suspense fallback={null}>
      <ReadRedirect />
    </Suspense>
  );
}
