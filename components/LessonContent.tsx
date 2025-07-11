import Image from "next/image"

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
  return (
    <div className="space-y-6">
      {inhoud.map((blok, i) => {
        switch (blok.type) {
          case "paragraaf":
            return <p key={i} className="text-gray-700 leading-relaxed">{blok.tekst}</p>

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
                {blok.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )

          default:
            return null
        }
      })}
    </div>
  )
}