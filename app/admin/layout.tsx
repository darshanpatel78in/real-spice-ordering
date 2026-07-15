import ChatBot from "@/components/ChatBot";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="w-full px-2 sm:px-3 lg:px-4 py-3">
  {children}
  <ChatBot
        api="/api/admin/chat"
        title="Admin Assistant"
      />
</div>
  );
}