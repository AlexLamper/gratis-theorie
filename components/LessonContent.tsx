import Image from "next/image"
import { HighlightableText } from "./HighlightableText"
import { cleanForSpeech } from "@/lib/utils"

export interface InhoudBlok {
  type: "paragraaf" | "afbeelding" | "lijst"
  tekst?: string
  bron?: string
  bijschrift?: string
  items?: string[]
}

interface Props {
  inhoud: InhoudBlok[]
}

export default function LessonContent({ inhoud }: Props) {
  const spokenText = cleanForSpeech(inhoud
    .map(b => {
      if (b.type === "paragraaf") return b.tekst || "";
      if (b.type === "lijst") return b.items?.join(". ") || "";
      return "";
    })
    .filter(t => t.length > 0)
    .join(" "));

  let lastFoundIndex = 0;

  return (
    <div className="space-y-6">
      {inhoud.map((blok, i) => {
        let rawText = "";
        if (blok.type === "paragraaf") rawText = blok.tekst || "";
        else if (blok.type === "lijst") rawText = blok.items?.join(". ") || "";
        
        const cleanBlockText = cleanForSpeech(rawText);
        let blockOffset = -1;
        
        if (cleanBlockText) {
          blockOffset = spokenText.indexOf(cleanBlockText, lastFoundIndex);
          if (blockOffset !== -1) {
            lastFoundIndex = blockOffset + cleanBlockText.length;
          }
        }

        switch (blok.type) {
          case "paragraaf":
            return (
              <p key={i} className="text-gray-700 leading-relaxed">
                <HighlightableText text={blok.tekst || ""} offset={blockOffset} />
              </p>
            )

          case "afbeelding":
            return (
              <div key={i} className="text-center">
                <Image src={blok.bron || ""} alt={blok.bijschrift || "Afbeelding"} width={600} height={400} className="mx-auto" />
                {blok.bijschrift && <p className="text-sm text-gray-500 mt-2">{blok.bijschrift}</p>}
              </div>
            )

          case "lijst":
            return (
              <ul key={i} className="list-disc list-inside space-y-1 text-gray-700">
                {blok.items?.map((item, j) => {
                   let itemOffset = -1;
                   const cleanItemText = cleanForSpeech(item);
                   if (blockOffset !== -1 && cleanItemText) {
                     itemOffset = spokenText.indexOf(cleanItemText, blockOffset);
                   }
                   
                   return (
                    <li key={j}>
                      <HighlightableText text={item} offset={itemOffset} />
                    </li>
                   )
                })}
              </ul>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
