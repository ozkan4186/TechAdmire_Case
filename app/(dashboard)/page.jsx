import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { userId } = auth();
  return (
    <div>
      <UserButton />
      {userId ? "Tebrikler girişiniz başarılı" : "Giriş başarısız"}
    </div>
  );
}
