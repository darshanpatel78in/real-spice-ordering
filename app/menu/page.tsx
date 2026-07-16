import { Suspense } from "react";
import MenuContent from "./MenuContent";

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}