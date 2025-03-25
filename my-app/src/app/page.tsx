import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center max-h-screen">
      <main className="pt-15 px-5 flex justify-center items-center">
        <Image
          src="/image/divers/WorkInProgress.png"
          alt={"Work in progress"}
          width={600}
          height={600}
          priority
        />
      </main>
    </div>
  );
}
