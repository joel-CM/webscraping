import puppeteer from 'puppeteer'

interface Anime {
  titulo: string
  portada: string
  dia: string
}

interface Result {
  result: Anime[]
}

const api = async (req: any, res: any): Promise<Result> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.goto('https://henaojara.com/ver/category/emision/')
  await page.waitForSelector('#tablepress-1 > tbody')

  const result: Anime[] = await page.evaluate(() => {
    const animes: Anime[] = []
    const selector: string = '#tablepress-1 > tbody > tr'
    const trs: NodeListOf<Element> = document.querySelectorAll(selector)
    const days = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabados',
      'domingo'
    ]

    trs.forEach((tr) => {
      const tds: NodeListOf<HTMLTableCellElement> = tr.querySelectorAll('td')
      tds.forEach((td, index) => {
        const titulo: string | null = td.querySelector('a')?.title ?? null
        const portada: string | null = td.querySelector('img')?.src ?? null
        if (titulo !== null && portada !== null) {
          const anime: Anime = {
            titulo: titulo,
            portada: portada,
            dia: days[index]
          }
          animes.push(anime)
        }
      })
    })
    return animes
  })
  return res.json({ result })
}
// #about-me > div.css-1l5g3f4 > p
export default api
