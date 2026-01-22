import Image from "next/image";

export default function BMCPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        padding: "16px",
      }}
    >
      <Image
        src="/Presentasi Besok.png"
        alt="LaundryGo Business Model Canvas"
        width={1400}
        height={1000}
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        }}
        priority
      />
    </main>
  );
}
