import fs from 'fs'
import path from 'path'

const baseDir = path.join(process.cwd(), 'public', 'files')

// Pobierz foldery (czyli przedmioty)
const subjects = fs.readdirSync(baseDir).filter((name) => {
  return fs.statSync(path.join(baseDir, name)).isDirectory()
})

// Zapisz listę przedmiotów do files/index.json
const subjectsIndexPath = path.join(baseDir, 'index.json')
fs.writeFileSync(subjectsIndexPath, JSON.stringify(subjects, null, 2), 'utf-8')
console.log(`✔️  Zapisano index.json z przedmiotami`)

subjects.forEach((subject) => {
  const subjectPath = path.join(baseDir, subject)

  // Pobierz pliki w folderze (bez index.json)
  const files = fs.readdirSync(subjectPath).filter((file) => {
    const fullPath = path.join(subjectPath, file)
    return fs.statSync(fullPath).isFile() && file !== 'index.json'
  })

  // Zapisz index.json dla danego przedmiotu
  const outputPath = path.join(subjectPath, 'index.json')
  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2), 'utf-8')
  console.log(`✔️  Zapisano index.json dla ${subject}`)
})
