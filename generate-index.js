import fs from 'fs'
import path from 'path'

const baseDir = path.join(process.cwd(), 'public', 'files')

function generateIndex(dirPath) {
  const items = fs.readdirSync(dirPath)
  const files = []
  const folders = []

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item)
    const isDirectory = fs.statSync(fullPath).isDirectory()

    if (isDirectory) {
      folders.push(item)
      generateIndex(fullPath) // rekursywne generowanie dla podfolderów
    } else if (item !== 'index.json') {
      files.push(item)
    }
  })

  const indexContent = {
    files,
    folders
  }

  fs.writeFileSync(
    path.join(dirPath, 'index.json'),
    JSON.stringify(indexContent, null, 2),
    'utf-8'
  )
  console.log(`✔️  Zapisano index.json dla ${path.relative(baseDir, dirPath) || 'głównego folderu'}`)
}

// Start generowania od głównego folderu
generateIndex(baseDir)