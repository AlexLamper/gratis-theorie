// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.s-bol.com",
        port: "",
        pathname: "/**",
      },
      // Voeg extra patronen toe als je bijvoorbeeld afbeeldingen laadt vanaf andere bol-cdn domeinen
      {
        protocol: "https",
        hostname: "s-bol.com",
        port: "",
        pathname: "/**",
      },
    ],
    // OF als je alle externe afbeeldingen wilt toelaten (minder veilig, maar handig tijdens ontwikkeling):
    /*
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "/**" },
    ],
    */
  },
}

export default nextConfig
