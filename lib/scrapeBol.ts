import * as cheerio from "cheerio"
const { load } = cheerio

export async function scrapeBolProduct(productUrl: string) {
  try {
    const res = await fetch(productUrl)
    if (!res.ok) throw new Error(`Fetch status ${res.status}`)
    const html = await res.text()
    const $ = load(html)
    const title = $('meta[property="og:title"]').attr("content") || ""
    const imageUrl = $('meta[property="og:image"]').attr("content") || ""
    const description = $('meta[property="og:description"]').attr("content") || ""
    return { title, imageUrl, description }
  } catch (e) {
    console.error("Error scraping", productUrl, e)
    return { title: "", imageUrl: "", description: "" }
  }
}
