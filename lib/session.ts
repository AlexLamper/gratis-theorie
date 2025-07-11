export function getVoortgang() {
  if (typeof window === "undefined") return null
  const data = sessionStorage.getItem("voortgang_leren")
  return data ? JSON.parse(data) : null
}

export function markeerCategorieGelezen(voertuig: string, categorie: string) {
  const data = getVoortgang() || { voertuig, gelezen: {} }
  data.gelezen[categorie] = true
  sessionStorage.setItem("voortgang_leren", JSON.stringify(data))
}